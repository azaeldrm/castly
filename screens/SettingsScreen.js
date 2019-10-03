import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Block, Text} from "galio-framework";
import firebase from "firebase";

let THEMESTYLE = "dark";

export default class Loading extends React.Component {

	render() {
		return (
			<Block flex={1} style={{alignSelf: 'center', justifyContent: 'center', width: '100%', backgroundColor: theme.background}}>
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
