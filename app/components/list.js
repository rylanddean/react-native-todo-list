/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import ActiveToDo from './activeTodo';
import CompletedToDo from './completedTodo';

export default class List extends Component{

  constructor(){
    super();
  }

  editToDo(id){

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
    let toDoItems;
    if(this.props.todos){
      toDoItems = this.props.todos.map(todo => {
        console.log(todo.state);
        if(todo.state == 'completed'){
          console.log('Winning');
          return (
            <CompletedToDo state={todo.state} onDelete={this.deleteToDo.bind(this)} onRestore={this.restoreToDo.bind(this)} key={todo.id} todo={todo} />
          );
        }else{
          return (
            <ActiveToDo state={todo.state} onDelete={this.deleteToDo.bind(this)} onComplete={this.completeToDo.bind(this)} key={todo.id} todo={todo} />
          );
        }
      });
    }

    console.log(toDoItems);

    return (
      <View style={styles.listContainer} contentContainerStyle="flex-start">
        {toDoItems}
      </View>
    );
  }
}

// List Stylesheet
const styles = StyleSheet.create({
  listContainer: {
    flex: 9,
    width: "100%",
    flexDirection: 'column',
  },
})