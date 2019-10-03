import React from "react";
import {
	ScrollView,
	StyleSheet,
	View,
	Keyboard,
	Dimensions,
	TouchableOpacity
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Block, Text, Card, Icon} from "galio-framework";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {
	VictoryChart,
	VictoryGroup,
	VictoryLine,
	VictoryScatter,
	VictoryTooltip,
	VictoryVoronoiContainer,
	VictoryBar,
	Bar,
	VictoryAxis
} from "victory-native";
import {Video} from "expo-av";

import Header from "../components/Header";
import Videos from "../constants/Videos";

let SCREEN_WIDTH = Dimensions.get("window").width;
let SCREEN_HEIGHT = Dimensions.get("window").height;
let THEMESTYLE = "dark";

export default class PredictionScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			isPredicted: false,
			timestamp: null,
			days: "1",
			predictionObject: {},
			location: ""
		};
	}

	predictPress = location => {
		let timestamp = Math.floor(Date.now() / 1000);
		console.log("Search started!");
		return fetch(
			`https://us-central1-castly-ffd3b.cloudfunctions.net/functions/predict/?timestamp=${timestamp}&location=${location}&days=${
				this.state.days
			}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(response => response.json())
			.then(responseJson => {
				// console.log(responseJson.forecast[0].optimalPair);
				this.setState({
					predictionObject: responseJson,
					isPredicted: true,
					icon: responseJson.forecast[0].icon,
				});
				console.log(responseJson.forecast[0].icon)
			})
			.catch(error => {
				console.log(error);
			})
			.finally(() => {
				console.log("Search done!");
			});
	};

	onPressSearch = location => {
		this.locationRef._handleChangeText("");
		this.predictPress(location);
		this.setState({location: ""});
	};

	render() {
		var isPredicted = this.state.isPredicted;
		var sentence = "";

		if (isPredicted) {
			for (time in this.state.predictionObject.forecast[0].optimalTime) {
				if (sentence.length !== 0) {
					sentence += ", ";
				}
				if (
					this.state.predictionObject.forecast[0].optimalTime[time].to === null
				) {
					sentence += `${
						this.state.predictionObject.forecast[0].optimalTime[time].from
					}`;
				} else {
					sentence += `${
						this.state.predictionObject.forecast[0].optimalTime[time].from
					} to ${this.state.predictionObject.forecast[0].optimalTime[time].to}`;
				}
			}
		}

		return (
			<Block flex style={{backgroundColor: theme.background}}>
				{/*Video background*/}
				{this.state.isPredicted && (
					<Block style={styles.backgroundVideo}>
						<Video
							source={Videos.weather[this.state.predictionObject.forecast[0].icon]}
							rate={1.25}
							isMuted={true}
							resizeMode="cover"
							shouldPlay
							isLooping
							style={styles.backgroundVideo}
						/>
						<Block
							style={[
								styles.backgroundVideo,
								{backgroundColor: "rgba(0, 0, 0, 0.5)"}
							]}
						/>
					</Block>
				)}

				{/*Header */}
				{/*<Header title="Predict" textStyle={{color: theme.info}} />*/}
				<Block style={{height: 24, marginBottom: 20}}>
				</Block>

				{/*Search block*/}
				<Block flex={1} style={{marginHorizontal: 30}}>
					<GooglePlacesAutocomplete
						ref={instance => {
							this.locationRef = instance;
						}}
						minLength={vars.minLength}
						autoFocus={true}
						returnKeyType={"search"}
						fetchDetails={true}
						query={{
							key: "AIzaSyBxaPCRGd1PH5Bp_vY5msWWS3aWgFcC0Qo",
							language: "en",
							types: "geocode"
						}}
						styles={{
							description: {
								color: theme.subtitle
							},
							textInputContainer: {
								backgroundColor: theme.component,
								borderRadius: 0,
								borderColor: theme.component,
								borderTopWidth: 0,
								borderBottomWidth: 0,
								borderTopLeftRadius: 8,
								borderTopRightRadius: 8,
								borderBottomLeftRadius: this.state.borderSearchBottom,
								borderBottomRightRadius: this.state.borderSearchBottom,
								marginTop: 10
							},
							textInput: {
								marginHorizontal: 5,
								color: theme.subtitle,
								backgroundColor: theme.component,
								fontSize: 16
							},
							predefinedPlacesDescription: {
								color: theme.optimalColor
							},
							listView: {
								position: "absolute",
								marginTop: 54,
								zIndex: 999,
								height: 176,
								backgroundColor: this.state.listViewColor,
								borderBottomLeftRadius: this.state.borderListBottom,
								borderBottomRightRadius: this.state.borderListBottom
							},
							poweredContainer: {
								backgroundColor: "transparent"
							}
						}}
						textInputProps={{
							onChangeText: text => {
								console.log(text);
								const listViewColor =
									text.length >= vars.minLength
										? theme.component
										: "rgba(0, 0, 0, 0)";
								const borderSearchBottom =
									text.length >= vars.minLength ? 0 : 8;
								const borderListBottom = text.length >= vars.minLength ? 8 : 0;
								this.setState({
									listViewColor: listViewColor,
									borderSearchBottom: borderSearchBottom,
									borderListBottom: borderListBottom
								});
							}
						}}
						currentLocation={true}
						currentLocationLabel="Current location"
						nearbyPlacesAPI="GoogleReverseGeocoding"
						placeholder="Enter location..."
						onPress={(data, details = null) => {
							this.onPressSearch(details.formatted_address);
						}}
						onSubmitEditing={() =>
							this.state.location.length >= 6 &&
							this.onPressSearch(this.state.location)
						}
					/>
				</Block>

				{/*Prediction block*/}
				<Block
					backgroundColor={"rgba(0, 0, 0, 0)"}
					flex={4}
					center
					style={{width: "100%", paddingTop: 10}}
				>
					{this.state.isPredicted ? (
						<Block
							style={{width: "100%", backgroundColor: "rgba(0, 255, 0, 0)"}}
						>
							<Block style={{marginHorizontal: 30, height: 50}}>
								<Text p style={{textAlign: "center", color: theme.info}}>
									{this.state.predictionObject.forecast[0].summary}
								</Text>
							</Block>

							<Block style={{marginBottom: 4}}>
								<Text
									style={[
										{textAlign: "center", marginBottom: 2},
										vars.subtitleText
									]}
								>
									Optimal calculated time
								</Text>

								<Text h4 style={[{textAlign: "center", color: theme.info}]}>
									{sentence}
								</Text>
							</Block>
							<Block center style={{backgroundColor: "rgba(201, 131, 195, 0)"}}>
								<VictoryGroup
									width={vars.labelWidth} // Find a way to remediate height padding
									height={200}
									containerComponent={
										<VictoryVoronoiContainer voronoiDimension="x" />
									}
									animate={{duration: 750, easing: "bounce"}}
								>
									<VictoryBar
										cornerRadius={2}
										data={this.state.predictionObject.forecast[0].optimalPair}
										x="time"
										y={() => -0.1}
										y0={() => -0.05}
										dataComponent={
											<Bar
												style={{
													fill: ({datum}) => {
														const color =
															datum.relevance === 1
																? theme.optimalColor
																: theme.nonOptimalColor;
														return color;
													},
													width: 5
												}}
											/>
										}
									/>
									<VictoryBar
										cornerRadius={2}
										data={this.state.predictionObject.forecast[0].optimalPair}
										labels={({datum}) =>
											`${datum.hour} is ${
												datum.relevance === 1 ? "" : "not "
											}an optimal time.`
										}
										x="time"
										y="value"
										y0={() => -0.05}
										labelComponent={
											<VictoryTooltip
												constrainToVisibleArea
												center={{x: vars.labelWidth / 2, y: 170}}
												style={{fill: theme.subtitle}}
												flyoutStyle={{
													strokeWidth: 0,
													fill: "rgba(0, 0, 0, 0)"
												}}
											/>
										}
										dataComponent={
											<Bar
												style={{
													fill: ({datum}) => {
														const color =
															datum.relevance === 1
																? theme.optimalColor
																: theme.nonOptimalColor;
														return color;
													},
													width: 5
												}}
											/>
										}
									/>
								</VictoryGroup>
							</Block>

							<Block
								style={{
									backgroundColor: "rgba(138, 214, 148, 0)",
									marginHorizontal: 30
								}}
							>
								<Text
									style={[
										{textAlign: "left", marginBottom: 2},
										vars.subtitleText
									]}
								>
									Location
								</Text>
								<TouchableOpacity onPress={() => this.props.navigation.navigate("Details", this.state.predictionObject)}>
									<Text
										style={[{textAlign: "left", marginBottom: 10}, vars.infoText]}
									>
										{this.state.predictionObject.location}
									</Text>
								</TouchableOpacity>

								<Block row space={"between"}>
									<Block column>
										<Text
											style={[
												{textAlign: "left", marginBottom: 2},
												vars.subtitleText
											]}
										>
											Sunrise time
										</Text>
										<Text
											style={[
												{textAlign: "left", marginBottom: 10},
												vars.infoText
											]}
										>
											{
												this.state.predictionObject.forecast[0].sunrise
													.formatted
											}
										</Text>
									</Block>
									<Block column>
										<Text
											style={[
												{textAlign: "left", marginBottom: 2},
												vars.subtitleText
											]}
										>
											Sunset time
										</Text>
										<Text
											style={[
												{textAlign: "left", marginBottom: 10},
												vars.infoText
											]}
										>
											{this.state.predictionObject.forecast[0].sunset.formatted}
										</Text>
									</Block>
								</Block>
							</Block>
						</Block>
					) : (
						<Text p style={{color: "rgb(176, 176, 176)"}} />
					)}
				</Block>
			</Block>
		);
	}
}

const colors = {
	dark: {
		subtitle: "rgb(185, 185, 185)",
		info: "rgb(255, 255, 255)",
		component: "rgb(38, 38, 38)",
		optimalColor: "rgb(136, 193, 101)",
		nonOptimalColor: "rgb(130, 130, 130)",
		background: "rgb(26, 26, 26)"
	}
};

const theme = THEMESTYLE === "dark" ? colors.dark : colors.light;

const vars = {
	labelWidth: Dimensions.get("window").width - 20,
	labelHeight: Dimensions.get("window").height / 3,
	minLength: 3,
	appTitle: "Castly",
	appColor: {
		background: {
			weather: "rgba(255, 218, 29, 0.62)",
			normal: "rgb(240, 240, 240)",
			dark: "rgb(26, 26, 26)",
			card: "rgb(245, 245, 245)"
		},
		font: {
			normal: "rgb(26, 26, 26)",
			dark: "rgb(235, 235, 235)",
			card: "rgb(26, 26, 26)"
		}
	},
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
	},
	searchBar: {
		height: 50,
		borderColor: vars.appColor.background.card,
		borderRadius: 8,
		backgroundColor: vars.appColor.background.card,
		alignSelf: "stretch",
		elevation: 3,
		flexDirection: "row"
	},
	backgroundVideo: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		height: SCREEN_HEIGHT,
		width: SCREEN_WIDTH
	}
});
