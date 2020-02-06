import React, {useEffect, useRef} from "react";
import {
	ScrollView,
	StyleSheet,
	View,
	TouchableOpacity,
	Animated,
	RefreshControl,
	ActivityIndicator,
	ToastAndroid
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Block, Text, Card, Icon} from "galio-framework";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import {MaterialCommunityIcons} from "@expo/vector-icons";
// import moment from "moment-timezone";
import Header from "../components/Header";
import Colors from "../constants/Themes";
import firebase from "firebase";

let THEMESTYLE = "dark";

const usePulse = () => {
	const scale = useRef(new Animated.Value(1)).current;

	const pulse = () => {
		Animated.sequence([
			Animated.timing(scale,  {toValue: 1.2, duration: 500}),
			Animated.timing(scale,  {toValue: 0.95, duration: 1000})
		]).start(() => pulse())
	}

	useEffect(() => {
		setTimeout(() => pulse(), 200)
	}, [])

	return scale
}

const Square = () => {
	const scale = usePulse();
	return (
	  <Box scale={scale} />
  );
}

const Box = ({scale = 1, size = 40 }) => (
  <Animated.View
    style={[
      {
        width: size,
        height: size,
        transform: [{ scale }],
      },
    ]}
  >
		<MaterialCommunityIcons
			size={size}
			name={"map-marker-outline"}
			color={theme.subtitle}
			style={{alignSelf: "center", marginBottom: 4}}
		/>
	</Animated.View>
);

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 1,
			isLoading: true,
			isRefreshing: false,
			isLocationOn: false,
			fadeValue: new Animated.Value(0),
			predictionObject: null
		};
	}

	user = firebase.auth().currentUser;

	icons = {
		"partly-cloudy-day": "weather-partlycloudy",
		"partly-cloudy-night": "weather-partlycloudy",
		"clear-day": "weather-sunny",
		"clear-night": "weather-night",
		"rain": "weather-rainy",
		"snow": "weather-snowy",
		"wind": "weather-windy",
		"fog": "weather-fog",
		"cloudy": "weather-cloudy",
		"hail": "weather-hail",
		"thunderstorm": "weather-lighting",
		"tornado": "weather-hurricane"
	};

	_fadeInAnimation = () => {
		Animated.timing(this.state.fadeValue, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true
		}).start();
	};

	instantFetch = async (timestamp, latitude, longitude) => {
		return fetch(
			`https://us-central1-castly-ffd3b.cloudfunctions.net/functions/instant/?timestamp=${timestamp}&lat=${latitude}&lon=${longitude}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(response => response.json())
			.catch(error => {
				throw new Error("Fetch not possible.");
			})
			.then(responseJson => {
				this.setState({
					predictionObject: responseJson
				});
				return responseJson;
			})
			.catch(error => {
				console.log(error);
			});
	};

	_getLocationAsync = async () => {
		let {status} = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== "granted") {
			this.setState({
				errorMessage: "Permission to access location was denied"
			});
			ToastAndroid.showWithGravityAndOffset(
				"Permission to access location denied",
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
				0,
				200
			);
		}
		let location = await Location.getCurrentPositionAsync({
			enableHighAccuracy: true
		});
		return location;
	};

	_handleLocationError = () => {
		ToastAndroid.showWithGravityAndOffset(
			"Please enable Location services",
			ToastAndroid.SHORT,
			ToastAndroid.BOTTOM,
			0,
			200
		);
		throw new Error("Location services off. Please enable.");
	};

	_fetchAndDisplay = () => {
		this.setState({isLoading: true});
		this._getLocationAsync()
			.catch(error => {
				this.setState({isLoading: false});
				this._handleLocationError();
			})
			.then(location => {
				console.log("Acquiring location!");
				let response = this.instantFetch(
					Math.floor(location.timestamp / 1000),
					location.coords.latitude,
					location.coords.longitude
				);
				return response;
			})
			.then(response => {
				console.log("Location fetched!");
				this.setState({
					isRefreshing: false,
					isLoading: false,
					fadeValue: new Animated.Value(0)
				});
				this._fadeInAnimation();
				console.log("Data displayed!");
				console.log(this.predictionObject);
			})
			.catch(error => {
				console.log(error);
			});
	};

	componentDidMount() {
		this._fetchAndDisplay();
	}

	render() {

		return (
			<Block flex style={{backgroundColor: theme.background}}>
				{/*Introduction block*/}
				<Block style={{height: 24}} />
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={this.state.isRefreshing}
							onRefresh={this._fetchAndDisplay}
							progressBackgroundColor={theme.component}
							colors={[theme.info]}
							tintColor={[theme.info]}
						/>
					}
					style={{flex: 1}}
				>
					<Block
						style={{marginHorizontal: 40, paddingTop: 30, paddingBottom: 50}}
					>
						<Text h3 style={{color: theme.info}}>
							Welcome {this.user.displayName}!
						</Text>
						<Text style={[{color: theme.info}, vars.subtitleText]}>
							These are the stats for your location:
						</Text>
					</Block>

					{/*Main block*/}
					{this.state.predictionObject ? (
						<Animated.View
							style={{marginHorizontal: 40, opacity: this.state.fadeValue}}
						>
							<MaterialCommunityIcons
								size={60}
								name={this.icons[this.state.predictionObject.forecast[0].icon]}
								color={theme.subtitle}
								style={{alignSelf: "center", marginBottom: 4}}
							/>
							<Text
								style={[
									{textAlign: "center", marginBottom: 60},
									vars.subtitleText
								]}
							>
								{`${this.state.predictionObject.city}, ${
									this.state.predictionObject.country
								}`}
							</Text>
							<Text
								style={[
									{textAlign: "left", marginBottom: 2},
									vars.subtitleText
								]}
							>
								Weather conditions
							</Text>
							<Text
								style={[{textAlign: "left", marginBottom: 30}, vars.infoText]}
							>
								{`Currently ${this.state.predictionObject.forecast[0].summary.toLowerCase()}.`}
							</Text>
							<Text
								style={[
									{textAlign: "left", marginBottom: 2},
									vars.subtitleText
								]}
							>
								Temperature
							</Text>
							<Text
								style={[{textAlign: "left", marginBottom: 30}, vars.infoText]}
							>
								{`${Math.floor(
									this.state.predictionObject.forecast[0].temp
								)} F`}
							</Text>
							<Text
								style={[
									{textAlign: "left", marginBottom: 2},
									vars.subtitleText
								]}
							>
								Overall condition
							</Text>
							<Text
								style={[{textAlign: "left", marginBottom: 30}, vars.infoText]}
							>
								Usu nulla ornatus necessitatibus an, an sit nonumes noluisse
								deseruisse, ad dicam dicunt per. Et mea porro blandit. An
								senserit assentior efficiendi sed, sea te hinc dicam offendit.
								Dolores maiestatis argumentum ea sea, ius prima noster cu, ex
								eum vocibus sapientem. At dicam semper usu.
							</Text>
						</Animated.View>
					) : this.state.isLoading ? (
						<Block flex center style={{marginTop: 100}}>
							<ActivityIndicator size={70} color={theme.optimalColor} />
						</Block>
					) : (
						<Block flex center style={{marginTop: 100, marginHorizontal: 40}}>
							<Square />
							<Text style={[{textAlign: "center", marginTop: 40}, vars.subtitleText]}>
								Scroll down to enable Location Services and see relevant information.
							</Text>

						</Block>
					)}
				</ScrollView>
			</Block>
		);
	}
}

const theme = THEMESTYLE === "dark" ? Colors.dark : Colors.light;

const vars = {
	fontSize: {
		mini: 8,
		small: 10,
		medium: 16,
		large: 20,
		xlarge: 24
	},
	subtitleText: {
		fontSize: 12,
		color: theme.subtitle
	},
	infoText: {
		fontSize: 18,
		color: theme.info
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: "#fff"
	},
	imageBackground: {
		flex: 1,
		resizeMode: "cover",
		width: "100%",
		height: "100%"
	}
});
