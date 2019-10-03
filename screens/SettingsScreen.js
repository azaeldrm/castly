import React from "react";
import {StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import {Block, Text, Card, Icon} from "galio-framework";
import firebase from "firebase";

let SCREEN_WIDTH = Dimensions.get("window").width;
let SCREEN_HEIGHT = Dimensions.get("window").height;
let THEMESTYLE = "dark";

export default class Loading extends React.Component {

	render() {
		return (
			<Block flex={1} style={{backgroundColor: theme.background}}>
				<Block style={{height: 24}} />
				<TouchableOpacity
				style={{marginVertical: 30}}
					onPress={() =>
						firebase
							.auth()
							.signOut()
							.then(function() {
								console.log("Log out successfully.");
							})
							.catch(function(error) {
								console.log(`LOG OUT ERROR: ${error}`)
							})
					}
				>
					<Text h4 style={[{color: theme.info, textAlign: 'center'}, vars.infoText]}>
						LOG OUT
					</Text>
				</TouchableOpacity>
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
		justifyContent: "center",
		alignItems: "center"
	}
});
