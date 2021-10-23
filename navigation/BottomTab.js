import React from 'react';
import Home from "../screens/Home"
import Feed from "../screens/Feed"

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator()

export default class BottomTab extends React.Component {
 render(){
  return (
    <Tab.Navigator>
        <Tab.Screen name="home" component={Home}/>
        <Tab.Screen name="feed" component={Feed}/>
    </Tab.Navigator>
  );
  }
}