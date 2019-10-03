import React from "react";
import {View, Text, ActivityIndicator, StyleSheet} from "react-native";
import firebase from "firebase";

let THEMESTYLE = "dark";

export default class Loading extends React.Component {
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			this.props.navigation.navigate(user ? "Main" : "Splash");
		});
	}

	render() {
		return (
			<View style={[styles.container,{alignSelf: 'center', justifyContent: 'center', width: '100%', backgroundColor: theme.background}]}>
				<ActivityIndicator size={70} color={theme.optimalColor} />
			</View>
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
	},
	light: {
		subtitle: "rgb(150, 150, 150)",
		info: "rgb(0, 0, 0)",
		component: "rgb(223, 223, 223)",
		optimalColor: "rgb(95, 156, 58)",
		nonOptimalColor: "rgb(200, 200, 200)",
		background: "rgb(255, 255, 255)"
	}
};

const theme = THEMESTYLE === "dark" ? colors.dark : colors.light;

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
