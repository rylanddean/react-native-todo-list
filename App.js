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
import EditModal from './app/components/editModal';

export default class App extends Component{

  constructor(props){
    super(props);

    // define global filter variable
    global.currentFilter = 'all';

    // Bind filter function to this component
    this.filterToDos = this.filterToDos.bind(this);
    this.updateCounters = this.updateCounters.bind(this);
    this.syncToDoArrays = this.syncToDoArrays.bind(this);

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
      completedCount: 0,
      allCount: 0,
      editText: '',
      editID: '',
      visibleModal: false,
    }
  }

  // Fetch todo list object from jsonplaceholder via AJAX call
  /*
  getTodos(){
    fetch('https://my-json-server.typicode.com/rylanddean/todo-json')
      .then(res => res.json())
      .then(
        (result) => {
          
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      )
  }
  */

  // Update active to-do count
  updateCounters(){
    this.setState({activeCount:(this.state.todos.filter(todo => todo.state === 'active').length)});
    this.setState({completedCount:(this.state.todos.filter(todo => todo.state === 'completed').length)});
    this.setState({allCount:(this.state.todos).length});
  }

  // Run active count on load
  componentWillMount(){
    //this.getTodos();
    this.updateCounters();
    this.syncToDoArrays();
  }

  //Sync todos and displayedToDos arrays
  syncToDoArrays(){
    this.setState({displayedToDos:this.state.todos});
  }

  // Get todos and append the new todo from the textInput element
  handleAddToDo(todo){
    let todos = this.state.todos;
    todos.push(todo);
    this.setState({todos:todos});
    this.updateCounters();
  }

  // On filter button press, filter to-dos on the state
  filterToDos(state) {
    currentFilter = state;
    let todos = this.state.todos;
    if (state == 'all'){
      this.syncToDoArrays();
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
    this.updateCounters();
  }

  // Get todos and update the selected todo's state to completed then update the array
  handleCompleteToDo(id){
    let todos = this.state.todos;
    let index = todos.findIndex(x => x.id === id);
    todos[index].state = 'completed';
    this.filterToDos(currentFilter);
    this.updateCounters();
  }

  // Get todos and update the selected todo's state to active then update the array
  handleRestoreToDo(id){
    let todos = this.state.todos;
    let index = todos.findIndex(x => x.id === id);
    todos[index].state = 'active';
    this.filterToDos(currentFilter);
    this.updateCounters();
  }

  // Get todo text and populate the edit textinput
  handleEditToDo(id){
    let todos = this.state.todos;
    let index = todos.findIndex(x => x.id === id);
    this.setState({editText:todos[index].text});
    this.setState({editID:todos[index].id});
    this.setState({visibleModal:true});
  }

  // Update visible state on modal close
  handleModalClose(visible){
    this.setState({visibleModal:visible});

  }

  // Update todo with new text from edit textinput
  handleUpdateToDoText(updatedtodo){
    let todos = this.state.todos;
    let index = todos.findIndex(x => x.id === updatedtodo.id);
    this.state.todos[index].text = updatedtodo.text;
    this.setState({visibleModal:false});
    this.syncToDoArrays();
  }

  render() {
    return (
      <View style={styles.container}>

        /* Header - Start */
        <View style={styles.header}>
          <Text style={styles.headerText}>To-Do List</Text>
        </View>
        /* Header - End */

        /* Filter - Start */
        <View style={styles.filters}>
          <Button style={styles.filterText} title={`All(${this.state.allCount})`} onPress={this.filterToDos.bind(this,"all")}></Button>
          <Button style={styles.filterText} title={`Active(${this.state.activeCount})`} onPress={this.filterToDos.bind(this,"active")}></Button>
          <Button style={styles.filterText} title={`Completed(${this.state.completedCount})`} onPress={this.filterToDos.bind(this,"completed")}></Button>
        </View>
        /* Filter - End */
        
        /* ToDo List Component - Start */
        <List todos={this.state.displayedToDos} filter={currentFilter} onDelete={this.handleDeleteToDo.bind(this)} onComplete={this.handleCompleteToDo.bind(this)} onRestore={this.handleRestoreToDo.bind(this)} onEdit={this.handleEditToDo.bind(this)} />
        /* ToDo List Component - End */

        /* Add Item Component - Start */
        <AddTodo addToDo={this.handleAddToDo.bind(this)}/>
        /* Footer - End */

        /* Edit Modal Component - Start */
        <EditModal onClose={this.handleModalClose.bind(this)} editToDo={this.handleUpdateToDoText.bind(this)} text={this.state.editText} id={this.state.editID} visible={this.state.visibleModal} />
        /* Edit Modal Component - End */
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
    paddingLeft: 10,
    paddingBottom: 10,
    alignItems: "flex-start",
    width: "100%",
  },
  filterText: {
    textAlign: "left",
  },
  counterText: {
    fontSize: 30,
    paddingRight: 20,
  }
})

AppRegistry.registerComponent('App', () => App);