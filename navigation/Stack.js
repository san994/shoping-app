import React from 'react';

import {createStackNavigator} from "@react-navigation/stack"

import Feed from "../screens/Feed"
import ProductDetail from '../screens/ProductDetail';

const Stack = createStackNavigator()

export default class StackNavigation extends React.Component {
 render(){
  return (
    <Stack.Navigator>
        <Stack.Screen name="Feed" component={Feed}/>
        <Stack.Screen name="ProductDetail" component={ProductDetail}/>
    </Stack.Navigator>
  );
  }
}