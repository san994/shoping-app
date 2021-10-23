import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Login from "./screens/Login2"
import Loading from "./screens/Loading"
import DashBoard from './screens/DashBoard';

import { createSwitchNavigator,createAppContainer } from 'react-navigation';

var SwitchNavigator = createSwitchNavigator({
  Loading:Loading,
  Login:Login,
  DashBoard:DashBoard
})

const AppContainer = createAppContainer(SwitchNavigator)

export default function App() {
  return (
    <AppContainer/>
  );
}

