import React from 'react';
import url from './url';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  RefreshControl,
  AsyncStorage
} from "react-native"
import { LinearGradient } from "expo";

export default class Journal extends React.Component{
  constructor(props){
    super(props);

    this.state= {
      journalBody: '',
      userid: '',
      value: '',
      emotions: [],
      selected: []
    }

  }
  componentDidMount(){
    let userInfo = this.props.navigate.getParam('userInfo');
    this.setState({
      userid: userInfo.userid,
      value: userInfo.value,
      selected: userInfo.selected,
      emotions: userInfo.emotions
    });
  }

  skipSection(){
    Alert.alert(
      "Great Job!",
      "Your daily emotions have been logged " ,
      [{ text: "Done" }] // Button
    );
    this.props.navigation.navigate('Suggestions', {userInfo: this.state});

  }

  postJournal(){
    const queryUrl = url + '/' + this.state.userid + '/newJournal'
    return fetch(queryUrl, {
      method: 'POST',
      body: JSON.stringify({
        userid: '',
        journalBody: this.state.journalBody
      })
    }).then(response=> response.json())
    .then(json => {
      if (json.status === 200){
        Alert.alert(
          "Great Job!",
          "Your daily journal has been logged " ,
          [{ text: "Done" }] // Button
        );
        this.props.navigation.navigate('ShowNewLog', {userInfo: this.state});
      }
    })
  }

  render(){
    return (
      <View>
        <LinearGradient style={{height:"100%"}} colors={["#7fd64d", "#4dd6ba"]} >
          <View>
            <Text style={{fontFamily:"Cochin"}}>Daily Journal</Text>
          </View>
          <View style={{alignItems: "center"}}>
            <TextInput
              placeholder="Write your journal here"
              onChange={(journal)=> this.setState({
                journalBody: journal
              })
            }/>
          </View>
          <View style={{alignItems: "center", flexDirection: "row", justifyContent: "space-between"}}>
            <TouchableOpacity>
              <Button
                onPress={()=> this.skipSection()}
                title="Skip"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Button
                onPress={()=> this.postJournal()}
                title="Post"
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        </View>
      );
    }




  }

  const styles = StyleSheet.create({
    container: {
      //paddingTop:100,
      flex: 1,
      backgroundColor: '#d6f2c6',
      //alignItems: 'center',
      //justifyContent: 'center'
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
      paddingTop: 5,
      paddingBottom: 5,
      marginTop: 5,
      borderRadius: 15,
      borderWidth: 1,
      backgroundColor: 'white',
      width: 120,
      height: 35
    },
    buttonLabel: {
      textAlign: 'center',
      fontSize: 12
    },
    nav: {
      height: "25%", width: 200,
      //justifyContent: 'left',
      paddingLeft: 15,
      //alignSelf: "flex-start"
    }
  });
