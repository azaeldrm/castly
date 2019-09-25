import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { fromLeft } from 'react-navigation-transitions';

import MainTabNavigator from './MainTabNavigator';
import AccessNavigator from './AccessNavigator';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Access: AccessNavigator
  },
  {
    initialRouteName: 'Main',
    transitionConfig: () => fromLeft(500),
  })
);
