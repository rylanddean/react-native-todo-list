/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  View
} from 'react-native';

export default class EditModal extends Component{

  constructor(props){
    super(props);
    this.state = {
      text: this.props.text,
      editToDo: {},
    }
  }

  // On textInput change update the text state
  updateText(text){
    this.setState({text:text});
  };

  submitEditToDo(){
    // Check if title value is empty
    if((this.state.editToDo === '')||(this.state.editToDo === undefined)){
      alert('Text is required');
    }else{
      // Check if state text is empty
      if(this.state.text === ''){
        this.state.text = this.props.text;
      }
      // Populate the edit to-do state with the textInput data
      this.setState({editToDo:{
        id: this.props.id,
        text: this.state.text
      }}, function(){
        // Assign the edit to-do to the editToDo property for use in the App Component
        this.props.editToDo(this.state.editToDo);
        this.state.text = '';
      });
    }
  };

  // Pass onClose property to app component to update the visibleModal state
  closeModal(visible){
    this.props.onClose(visible);
  };

  render() {
    return (
      <Modal style={styles.editModal} animationType={"slide"}
      transparent={false}
      visible={this.props.visible}
      >
        <TouchableOpacity
          onPress={this.closeModal.bind(this, false)}>
          <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
          <View style={styles.editForm}>
            <TextInput 
              style={styles.editInput}
              onChangeText={this.updateText.bind(this)}
              value={this.props.text}
              placeholder="Edit To-Do Item"
            ></TextInput>
          </View>
          <TouchableOpacity onPress={this.submitEditToDo.bind(this)} style={styles.submitEditButton}>
            <Text style={styles.submitEditButtonText}>Submit Change</Text>
          </TouchableOpacity>
      </Modal>
    );
  }
}

// Active To-Do Stylesheet
const styles = StyleSheet.create({
  editModal: {
    flex: 1,
  },
  closeButton: {
    textAlign: 'right',
    paddingTop: 40,
    paddingRight: 20,
  },
  editForm: {
    flex: 9,
  },
  editInput: {
    padding: 20,
  },
  submitEditButton: {
    flex: 1,
    backgroundColor: "#13CDAA",
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
  },
  submitEditButtonText: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "#FFF",
    fontSize: 16,
  }
})