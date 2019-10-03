import React from "react";
import {Platform, View} from "react-native";
import {createStackNavigator, createBottomTabNavigator} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import PredictionScreen from "../screens/PredictionScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DetailsScreen from "../screens/DetailsScreen";


let THEMESTYLE = "dark";

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

const config = Platform.select({
	web: {headerMode: "screen"},
	default: {}
});

const HomeStack = createStackNavigator(
	{
		Home: {
			screen: HomeScreen,
			navigationOptions: {
				headerTransparent: true
			}
		}
	},
	config
);

HomeStack.navigationOptions = {
	tabBarLabel: <View />,
	tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name={"map-marker-radius"} />
};

HomeStack.path = "";

const PredictionStack = createStackNavigator(
	{
		Prediction: {
			screen: PredictionScreen,
			navigationOptions: {
				headerTransparent: true
			}
		},
		Details: {
			screen: DetailsScreen,
			navigationOptions: {
				headerTransparent: true,
				tabBarVisible: false
			}
		}
	},
	config
);

PredictionStack.navigationOptions = {
	tabBarLabel: <View />,
	tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name={"flask"} />
};

PredictionStack.path = "";

const SettingsStack = createStackNavigator(
	{
		Settings: {
			screen: SettingsScreen,
			navigationOptions: {
				headerTransparent: true
			}
		}
	},
	config
);

SettingsStack.navigationOptions = {
	tabBarLabel: <View />,
	tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name={"settings-outline"} />
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator(
	{
		HomeStack,
		PredictionStack,
		SettingsStack
	},
  {
    initialRouteName: 'HomeStack',
    defaultNavigationOptions: {
      tabBarOptions: {
        style: {
          backgroundColor: theme.component,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 5,

        },
      },
    },
  }
);

tabNavigator.path = "";


export default tabNavigator;
