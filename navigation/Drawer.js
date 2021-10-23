import React from 'react';

import BottomTab from "./BottomTab"
import Profile from "../screens/Profile"

import {createDrawerNavigator} from "@react-navigation/drawer"

const Drawer =  createDrawerNavigator()

export default class DrawerScreen extends React.Component {
 render(){
  return (
    <Drawer.Navigator>
        <Drawer.Screen name="home" component={BottomTab}/>
        <Drawer.Screen name="profile" component={Profile}/>
    </Drawer.Navigator>
  );
  }
}