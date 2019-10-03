import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Block, Text} from "galio-framework";
import firebase from "firebase";

import Colors from "../constants/Themes";

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

const theme = THEMESTYLE === "dark" ? Colors.dark : Colors.light;

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
