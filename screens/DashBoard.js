import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {NavigationContainer} from "@react-navigation/native"

import DrawerScreen from "../navigation/Drawer";


export default class DashBoard extends React.Component {
 render(){
  return (
  <NavigationContainer>
    <DrawerScreen/>
  </NavigationContainer>
  );
  }
}