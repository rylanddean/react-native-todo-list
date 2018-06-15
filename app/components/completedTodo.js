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

export default class CompletedToDo extends Component{

  constructor(props){
    super(props);
  }

  deleteToDo(id){
    this.props.onDelete(id);
  }

  completeToDo(id){
    this.props.onComplete(id);
  }

  restoreToDo(id){
    this.props.onRestore(id);
  }

  render() {
    return (
      <View style={styles.completedtodo} key={this.props.key}>
        <Text style={styles.completedtodoText}>{this.props.todo.text}</Text>
        <TouchableOpacity disabled={true} onPress={this.props.editMethod} style={styles.actionButton}>
          <Text style={[styles.editButtonText,styles.buttonText]}>E</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.deleteToDo.bind(this, this.props.todo.id)} style={styles.actionButton}>
          <Text style={[styles.deleteButtonText,styles.buttonText]}>D</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.restoreToDo.bind(this, this.props.todo.id)} style={styles.actionButton}>
          <Text style={[styles.restoreButtonText,styles.buttonText]}>R</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// Completed To-Do Stylesheet
const styles = StyleSheet.create({
  completedtodo: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 3,
  },
  completedtodoText: {
    flex: 8,
    fontWeight: "600",
    textDecorationLine: "line-through",
    color: "#999",
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
    opacity: 0,
  },
  deleteButtonText: {
    backgroundColor: "#F358A6",
    marginLeft: 3,
  },
  restoreButtonText: {
    backgroundColor: "#13CDAA",
    marginLeft: 6,
    opacity: 0.75,
  }
})