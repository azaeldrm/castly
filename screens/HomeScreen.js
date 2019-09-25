import React from "react";
import {ScrollView, StyleSheet, View, Dimensions, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Block, Text, Card, Icon} from "galio-framework";
import firebase from "firebase";

import Header from "../components/Header";

let SCREEN_WIDTH = Dimensions.get("window").width;
let SCREEN_HEIGHT = Dimensions.get("window").height;
let THEMESTYLE = "dark";

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errorMessage: null
		};
	}

	render() {
		return (
			<Block flex style={{backgroundColor: theme.background, paddingTop: 50}}>
				{/*Introduction block*/}
				{/*<Header title='Dashboard'/>*/}
				<Block flex={0.2} style={{marginHorizontal: 40}}>
					<Text h3 style={{color: theme.info}}>
						Welcome Azael!
					</Text>
					<Text style={[{color: theme.info}, vars.subtitleText]}>
						These are the stats for your location:
					</Text>
					<TouchableOpacity onPress={() => firebase.auth().signOut()
					  .then(function() {
					    console.log('Log out successfully, bitch.')
					  })
					  .catch(function(error) {
					    // An error happened
					  })}>
							<Text h4 style={[{color: theme.info}, vars.infoText]}>Hello nigga log out</Text>
						</TouchableOpacity>
				</Block>

				{/*Main block*/}
				<ScrollView style={{flex: 1}}>
					<Block style={{marginHorizontal: 40}}>
						<Text
							style={[{textAlign: "left", marginBottom: 2}, vars.subtitleText]}
						>
							Weather conditions
						</Text>
						<Text
							style={[{textAlign: "left", marginBottom: 30}, vars.infoText]}
						>
							Lorem ipsum dolor sit amet, duo ad molestie posidonium, his id
							vide ancillae, option quaeque sea no. Lorem suscipit deterruisset
							cum ex, eos utroque definitiones ad. Tibique phaedrum ex his, ut
							pro omnis omnium. Laoreet eligendi sed eu, ius cu soluta
							laboramus. No ignota labores dissentiunt per, mea error paulo
							definitiones in, alii vulputate in mea.
						</Text>
						<Text
							style={[{textAlign: "left", marginBottom: 2}, vars.subtitleText]}
						>
							Overall condition
						</Text>
						<Text
							style={[{textAlign: "left", marginBottom: 30}, vars.infoText]}
						>
							Usu nulla ornatus necessitatibus an, an sit nonumes noluisse
							deseruisse, ad dicam dicunt per. Et mea porro blandit. An senserit
							assentior efficiendi sed, sea te hinc dicam offendit. Dolores
							maiestatis argumentum ea sea, ius prima noster cu, ex eum vocibus
							sapientem. At dicam semper usu.
						</Text>
					</Block>
				</ScrollView>
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
	}
});
