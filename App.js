import {AppLoading} from "expo";
import {Asset} from "expo-asset";
import * as Font from "expo-font";
import React, {useState} from "react";
import {Platform, StatusBar, StyleSheet, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {GalioProvider} from "galio-framework";
import * as firebase from "firebase";

import AppNavigator from "./navigation/AppNavigator";

const firebaseConfig = {
	apiKey: "AIzaSyCocePNf0fG09UDXgK2NS1D_tNxg4kqQZ8",
	authDomain: "castly-ffd3b.firebaseapp.com",
	databaseURL: "https://castly-ffd3b.firebaseio.com",
	projectId: "castly-ffd3b",
	storageBucket: "castly-ffd3b.appspot.com",
	messagingSenderId: "96562421015",
	appId: "1:96562421015:web:fc863688f42e86b5"
};
firebase.initializeApp(firebaseConfig);

export default function App(props) {
	const [isLoadingComplete, setLoadingComplete] = useState(false);

	if (!isLoadingComplete && !props.skipLoadingScreen) {
		return (
			<AppLoading
				startAsync={loadResourcesAsync}
				onError={handleLoadingError}
				onFinish={() => handleFinishLoading(setLoadingComplete)}
			/>
		);
	} else {
		return (
			<GalioProvider>
				<View style={styles.container}>
					{Platform.OS === "ios" && <StatusBar barStyle="default" />}
					<AppNavigator />
				</View>
			</GalioProvider>
		);
	}
}

async function loadResourcesAsync() {
	await Promise.all([
		Asset.loadAsync([
			require("./assets/images/robot-dev.png"),
			require("./assets/images/robot-prod.png"),
			require("./assets/images/backgrounds/cloudy1.jpg"),
			require("./assets/videos/rain1.mp4"),
			require("./assets/videos/clouds2.mp4"),
			require("./assets/videos/clouds3.mp4")
		]),
		Font.loadAsync({
			// This is the font that we are using for our tab bar
			...Ionicons.font,
			// We include SpaceMono because we use it in HomeScreen.js. Feel free to
			// remove this if you are not using it in your app
			"space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
		})
	]);
}

function handleLoadingError(error) {
	// In this case, you might want to report the error to your error reporting
	// service, for example Sentry
	console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
	setLoadingComplete(true);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
