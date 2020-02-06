import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Block, Text} from "galio-framework";
import firebase from "firebase";

import Header from "../components/Header";
import Colors from "../constants/Themes";

let THEMESTYLE = "dark";

export default class SettingsNotifs extends React.Component {

	render() {
		return (
			<Block flex={1} style={{alignSelf: 'center', width: '100%', backgroundColor: theme.background}}>
				<Header title="" textStyle={{color: theme.info}}/>
				<Block
					style={{marginHorizontal: 40, paddingTop: 30, paddingBottom: 50}}
				>
					<Text h3 style={[{color: theme.info, marginBottom: 30}]}>
						Edit notification preferences
					</Text>
				</Block>
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
