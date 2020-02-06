import React from "react";
import {Platform, View} from "react-native";
import {createStackNavigator, createBottomTabNavigator} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import PredictionScreen from "../screens/PredictionScreen";
import DetailsScreen from "../screens/DetailsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SettingsPrediction from "../screens/SettingsPrediction";
import SettingsPersonal from "../screens/SettingsPersonal";
import SettingsNotifs from "../screens/SettingsNotifs";

import Colors from "../constants/Themes";

let THEMESTYLE = "dark";

const theme = THEMESTYLE === "dark" ? Colors.dark : Colors.light;

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
		},
		SettingsPrediction: {
			screen: SettingsPrediction,
			navigationOptions: {
				headerTransparent: true,
				tabBarVisible: false
			}
		},
		SettingsPersonal: {
			screen: SettingsPersonal,
			navigationOptions: {
				headerTransparent: true,
				tabBarVisible: false
			}
		},
		SettingsNotifs: {
			screen: SettingsNotifs,
			navigationOptions: {
				headerTransparent: true,
				tabBarVisible: false
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
