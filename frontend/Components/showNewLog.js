import React from 'react';
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
      userInfo: this.props.navigation.getParam("userInfo"),
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
    let queryUrl = url + '/' //+ route to be implemented
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
    .then
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
      <View><TouchableOpacity onPress={()=this.noActivity()}><Text>Yes</Text></TouchableOpacity></View>
      </LinearGradient>
      </View
    )
  }
}
