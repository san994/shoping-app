import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class Home extends React.Component {
    constructor(){
        super()
        this.state={
            order:""
        }
    }
 render(){
  return (
    <View>
      <Text>Home</Text>
      <View>
           <TextInput
             onChangeText={text=>this.setState({order:text})}
             placeholder={"write order in the format: Product Name-quantity"}
             multiline={true}
             numberOfLines={20}
           />
      </View>
      <View>
          <TouchableOpacity
           onPress={console.log("order placed")}
          >
          <Text>Place Order</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
  }
}