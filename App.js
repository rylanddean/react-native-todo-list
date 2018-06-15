/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Button,
  Text,
  Modal
} from 'react-native';
import uuid from 'uuid';
import List from './app/components/list';
import AddTodo from './app/components/addTodo';

export default class App extends Component{

  constructor(props){
    super(props);

    // define global filter variable
    global.currentFilter = 'all';

    // Bind filter function to this component
    this.filterToDos = this.filterToDos.bind(this);
    this.updateActiveCount = this.updateActiveCount.bind(this);

    this.state = {
      todos: [
        {
          id: uuid.v4(),
          text: 'Testing',
          state: 'active'
        },
        {
          id: uuid.v4(),
          text: 'Working',
          state: 'active'
        },
        {
          id: uuid.v4(),
          text: 'Hello',
          state: 'active'
        }
      ],
      displayedToDos: [
        
      ],
      activeCount: 0,
    }
  }

  // Update active to-do count
  updateActiveCount(){
    this.setState({activeCount:(this.state.todos.filter(todo => todo.state === 'active').length)});
  }

  // Run active count on load
  componentWillMount(){
    let todos = this.state.todos;
    this.updateActiveCount();
    this.setState({displayedToDos:todos});
}

  // Get todos and append the new todo from the textInput element
  handleAddToDo(todo){
    let todos = this.state.todos;
    todos.push(todo);
    this.setState({todos:todos});
    this.updateActiveCount();
  }

  // On filter button press, filter to-dos on the state
  filterToDos(state) {
    currentFilter = state;
    let todos = this.state.todos;
    if (state == 'all'){
      this.setState({displayedToDos:todos});
    }else{
      this.setState({displayedToDos:todos.filter(todo => todo.state === state)});
    }
  }

  // Get todos and remove the selected todo from the array then update the array
  handleDeleteToDo(id){
    let todos = this.state.todos;
    let index = todos.findIndex(x => x.id === id);
    todos.splice(index, 1);
    this.setState({todos:todos});
    this.filterToDos(currentFilter);
    this.updateActiveCount();
  }

  // Get todos and update the selected todo's state to completed then update the array
  handleCompleteToDo(id){
    let todos = this.state.todos;
    let index = todos.findIndex(x => x.id === id);
    todos[index].state = 'completed';
    this.filterToDos(currentFilter);
    this.updateActiveCount();
  }

  // Get todos and update the selected todo's state to active then update the array
  handleRestoreToDo(id){
    let todos = this.state.todos;
    let index = todos.findIndex(x => x.id === id);
    todos[index].state = 'active';
    this.filterToDos(currentFilter);
    this.updateActiveCount();
  }

  render() {
    return (
      <View style={styles.container}>

        /* Header - Start */
        <View style={styles.header}>
          <Text style={styles.headerText}>To-Do List</Text>
          <Text style={styles.counterText}>{this.state.activeCount}</Text>
        </View>
        /* Header - End */

        /* Filter - Start */
        <View style={styles.filters}>
            <Button style={styles.filterText} title="All" onPress={this.filterToDos.bind(this,"all")}></Button>
            <Button style={styles.filterText} title="Active" onPress={this.filterToDos.bind(this,"active")}></Button>
            <Button style={styles.filterText} title="Completed" onPress={this.filterToDos.bind(this,"completed")}></Button>
          </View>
        /* Filter - End */
        
        /* ToDo List Component - Start */
        <List todos={this.state.displayedToDos} filter={currentFilter} onDelete={this.handleDeleteToDo.bind(this)} onComplete={this.handleCompleteToDo.bind(this)} onRestore={this.handleRestoreToDo.bind(this)} />
        /* ToDo List Component - End */

        /* Add Item Component - Start */
        <AddTodo addToDo={this.handleAddToDo.bind(this)}/>
        /* Footer - End */

        /* Edit Modal - Start */

        /* Edit Modal - End */
      </View>
    );
  }
}

// List Stylesheet
const styles = StyleSheet.create({
  // Styling for main container View
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  header: {
    flex:1,
    flexDirection: "row",
    paddingBottom: 5,
    paddingTop: 80,
    paddingLeft: 20,
  },
  headerText: {
    flex: 1,
    fontSize: 30,
    fontWeight: "800",
    color: "#000",
  },
  filters: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    paddingLeft: 20,
    alignItems: "flex-start",
  },
  counterText: {
    fontSize: 30,
    paddingRight: 20,
  }
})

AppRegistry.registerComponent('App', () => App);