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

export default class ShowNewlog extends React.Component{
  constructor(){
    super();
    this.state={
      userid: '',
      value: '',
      emotions: [],
      selected: [],
      journalBody: '',
      wantSuggestion: false
    }
  }
  yesActivity(){
    this.setState({wantSuggestion: true})
    postLog({this.state})
    this.props.navigation.navigate("Suggestions");
  }
  noActivity(){
    this.setState({wantSuggestion: false})
    postLog({this.state})
    this.props.navigation.navigate("HomePage");
  }
  postLog(logInfo){
    let queryUrl = url + '/' + this.state.userid + '/newLog' //+ route to be implemented
    return fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userid: logInfo.userInfo.userid,
        color: logInfo.userInfo.color,
        emotions: logInfo.userInfo.emotions,
        reasons: logInfo.userInfo.reasons,
        wantSuggestion: logInfo.wantSuggestion,
        journalBody: logInfo.userInfo.journalBody
      })
    })
    .then(response=> response.json())
    .then(json=> {
      if (json.suggestions){
        this.props.navigation.navigate('Suggestions', {suggestions: json.suggestions});
      }else{
        this.props.navigation.navigate('HomePage');
      }
    })
  }

  componentDidMount(){
    let userInfo = this.props.navigate.getParam('userInfo');
    this.setState({
      userid: userInfo.userid,
      value: userInfo.value,
      emotions: userInfo.emotions,
      selected: userInfo.selected,
      journalBody: userInfo.journalBody,
    });

  }
  render(){
    return(
      <View>
      <LinearGradient style={{height:"100%"}} colors={["#7fd64d", "#4dd6ba"]} >
      <View><Text>Your Log Today</Text></View>
      <View>
      <Text>{this.state.userInfo.value}</Text>
      <Text>{this.state.userInfo.emotions}</Text>
      <Text>{this.state.userInfo.reasons}</Text>
      <Text>{this.state.userInfo.journal}</Text>
      </View>
      <View><Text>Would you like to see activities?</Text></View>
      <View><TouchableOpacity onPress={()=this.yesActivity()}><Text>Yes</Text></TouchableOpacity></View>
      <View><TouchableOpacity onPress={()=this.noActivity()}><Text>No</Text></TouchableOpacity></View>
      </LinearGradient>
      </View
    )
  }
}
