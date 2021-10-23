import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar } from 'react-native';

import {RFValue} from "react-native-responsive-fontsize"

import ProductDetail from "./ProductDetail"

let products = require("../temp.json");

export default class Feed extends React.Component {
 
keyExtractor=({item,index})=>{
  index.toString()
}

renderItem({item:product}){
  return
  <ProductDetails product={product} navigation={this.props.navigation}/>
}
 render(){
  return (
  <View>
    <SafeAreaView style={styles.droidSafeArea}/>
    <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/car.jpg")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={ styles.appTitleText}>
              Pihu Shopping App
              </Text>
            </View>
            <View>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={products}
                renderItem={this.renderItem}
              />
            </View>
  </View>
  </View>
  )
  }
}

const styles=StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },


})