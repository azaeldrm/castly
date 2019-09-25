import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PredictionScreen from '../screens/PredictionScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DetailsScreen from '../screens/DetailsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerTransparent: true,
      }
    }
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const PredictionStack = createStackNavigator(
  {
    Prediction: {
      screen: PredictionScreen,
      navigationOptions: {
        headerTransparent: true,
      }
    },
    Details: {
      screen: DetailsScreen,
      navigationOptions: {
        headerTransparent: true,
        tabBarVisible: false,
      }
    }
  },
  config
);

PredictionStack.navigationOptions = {
  tabBarLabel: 'Prediction',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

PredictionStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        headerTransparent: true,
      }
    }
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    PredictionStack,
    SettingsStack,
  },
  {
    initialRouteName: 'HomeStack',
  }
);

tabNavigator.navigationOptions = {};


tabNavigator.path = '';

export default tabNavigator;
