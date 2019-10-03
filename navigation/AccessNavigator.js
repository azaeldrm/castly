import React from "react";
import {Platform} from "react-native";
import {createStackNavigator} from "react-navigation";
import { fadeIn } from 'react-navigation-transitions';

import SignUpScreen from "../screens/SignUpScreen";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import LoadingScreen from "../screens/LoadingScreen";

const config = Platform.select({
	web: {headerMode: "screen"},
	default: {}
});

const AccessSwitch = createStackNavigator(
	{
		SignUp: SignUpScreen,
		Splash: SplashScreen,
		Login: LoginScreen,
		Loading: {
			screen: LoadingScreen,
			navigationOptions: {
				headerTransparent: true,
			}
		}
	},
	{
		initialRouteName: "Loading",
		transitionConfig: () => fadeIn(1000),
	}
);

export default AccessSwitch;
