import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';

export default class react_native_todo_list extends Component{
  render(){
    return(
      <View>
        <Text>This is a test!</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('react_native_todo_list', () => react_native_todo_list);