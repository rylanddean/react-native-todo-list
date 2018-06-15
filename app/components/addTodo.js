/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';
import uuid from 'uuid';

export default class AddTodo extends Component{

  constructor(){
    super();
    // Onload create the new to-do object
    this.state = {
      newToDo:{}
    }
  }

  submitToDo(){
    // Check if title value is empty
    if((this.state.text === '')||(this.state.text === undefined)){
      alert('Text is required');
    }else{
      // Populate the new to-do object with the textInput data
      this.setState({newToDo:{
        id: uuid.v4(),
        text: this.state.text,
        state: 'active'
      }}, function(){
        // Assign the new to-do to the addToDo property for use in the list Component
        this.props.addToDo(this.state.newToDo);
        this.state.text = '';
      });
    }
  }

  render() {
    return (
      <View style={styles.footer}>
        <TextInput 
          style={styles.textInput}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder="Add To-Do Item"
        ></TextInput>
        <TouchableOpacity onPress={this.submitToDo.bind(this)} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add To-Do</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// addToDo Stylesheet
const styles = StyleSheet.create({
  footer: {
    flex: 3,
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  textInput: {
    flex: 1,
    width: "100%",
    paddingLeft: 20,
    textAlign: "left",
  },
  addButton: {
    flex: 1,
    backgroundColor: "#13CDAA",
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
  },
  addButtonText: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "#FFF",
    fontSize: 16,
  }
})