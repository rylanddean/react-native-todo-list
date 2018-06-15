/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';

export default class ActiveToDo extends Component{

  constructor(props){
    super(props);
  }

  deleteToDo(id){
    this.props.onDelete(id);
  }

  completeToDo(id){
    this.props.onComplete(id);
  }

  render() {
    return (
      <View style={styles.activetodo} key={this.props.key}>
        <Text style={styles.activetodoText}>{this.props.todo.text}</Text>
        <TouchableOpacity onPress={this.props.editMethod} style={styles.actionButton}>
          <Text style={[styles.editButtonText,styles.buttonText]}>E</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.deleteToDo.bind(this, this.props.todo.id)} style={styles.actionButton}>
          <Text style={[styles.deleteButtonText,styles.buttonText]}>D</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.completeToDo.bind(this, this.props.todo.id)} style={styles.actionButton}>
          <Text style={[styles.completeButtonText,styles.buttonText]}>C</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// Active To-Do Stylesheet
const styles = StyleSheet.create({
  activetodo: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 3,
  },
  activetodoText: {
    flex: 8,
    fontWeight: "600",
  },
  actionButton: {
    flex: 1,
  },
  buttonText: {
    height: 30,
    width: 30,
    textAlign: "center",
    borderRadius: 15,
    paddingTop: 6,
    color: "#FFF",
    overflow: "hidden",
    fontWeight: "800",
  },
  editButtonText: {
    backgroundColor: "#F7854F",
  },
  deleteButtonText: {
    backgroundColor: "#F358A6",
    marginLeft: 3,
  },
  completeButtonText: {
    backgroundColor: "#13CDAA",
    marginLeft: 6,
  }
})