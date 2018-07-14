import React from 'react';
import url from './url';
import {  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  RefreshControl,
  AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo';
import Swipeout from 'react-native-swipeout'

export default class SurveyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestionName: '',
      suggestionDescription: '',

      userInfo: this.props.navigation.getParam('userInfo'),  //this.props = this.props.navigation.getParam
      suggestionsArr: [
        {
          name: "",
          description: "",
          tags: []
        }
      ],
      openAdd: false
    }
  }

  // componentDidMount() {
  //   fetch('') //get default suggestions array
  //   .then((res) => res.json())
  //   .then((res2) => this.setState({suggestionsArr: res2}))
  // }

  removeSuggestion(suggest) {
    //update state, splice out this suggestion
  }

  registerFinal() {
    this.props.navigation.navigate('HomePage', {userInfo: this.state});
    //fetch post a new user
    //with userInfo from state, and suggestions arr
  }

  addSuggestion() {
    let queryUrl = url + '/' + this.props.navigation.getParam('userid') + '/addSuggestion';
    return fetch(queryUrl, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        title: this.state.username,
        description: this.state.password
      })
    }).then(response => response.json())
    .then(json => {
      if (json.status === 200){
        //we good
      }
    })
  }

  cancelSuggestion(){
    this.setState({
      openAdd: false
    })
  }
  showAddSuggestion() {
    console.log("addSuggestion works!")
    this.setState({
      openAdd: true
    })
  }

  render() {
    data = new ListView.DataSource({rowHasChanged: (r1, r2) => (r1 !== r2)})

    console.log(this.state.userInfo)

    return (
      <View >
        <LinearGradient style={{height:"100%"}} colors={["#7fd64d", "#4dd6ba"]} >
        {/* <Text>{this.state.userInfo}</Text> */}
        {/* <ListView
          renderRow={(suggest) => (
            <TouchableOpacity
              style={styles.suggestBox}
              //add an onSwipe to removeSuggestion
              >
              <View><Text>{suggest.name}</Text></View>
          </TouchableOpacity>)}
          dataSource={data.cloneWithRows(this.state.suggestionsArr)}
        /> */}
        <View style={{paddingBottom: 20, alignItems: 'center',
        justifyContent: 'center'}}>
        <TouchableOpacity onPress={this.showAddSuggestion.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>Add a suggestion</Text>
        </TouchableOpacity>
        {
          this.state.openAdd ?
          <View style={styles.suggestBox}>
            <TextInput placeholder="     Title" style={styles.textInp}>

            </TextInput>
            <TextInput placeholder="     Description" style={styles.textInp}>

            </TextInput>
            //tags for emotions
            <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
            <TouchableOpacity onPress={this.addSuggestion} style={styles.addButton}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.cancelSuggestion.bind(this)} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          </View>
        : null}

        <TouchableOpacity onPress={this.registerFinal} style={styles.button}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  suggestBox: {
    justifyContent: 'center',
    backgroundColor: '#f7ffa0',
    alignItems: 'center',
    borderRadius: 10
  },
  textInp: {
    margin: 15,
    width: 300,
    height: 40,
    borderColor: "#97ad8a",
    borderWidth: 2,
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: 'white',
    width: 200,
    height: 40,
    borderWidth: 2,
    borderColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 10,
    //marginBottom: 10
  },
  buttonText : {
    fontSize: 20,
    fontFamily: 'Cochin',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButton: {
    fontSize: 20,
    fontFamily: 'Cochin',
    textAlign: 'center',
    alignItems: "center",
    justifyContent: 'center',
    // paddingBottom: 10,
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 5,
    margin: 10,
    height: 40,
    width: 100
  },
  cancelButton: {
    fontSize: 20,
    fontFamily: 'Cochin',
    textAlign: 'center',
    alignItems: "center",
    justifyContent: 'center',
    // paddingBottom: 10,
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 5,
    margin: 10,
    height: 40,
    width: 100,
    alignSelf: "flex-end"
  }
})
