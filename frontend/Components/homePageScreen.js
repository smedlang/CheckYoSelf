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

export default class Homepage extends React.Component{
  constructor(){
    super();
    this.state={
      name: '',
      username: ''
    }
  }
  toNew(){
    this.props.navigation.navigate("Home", {userInfo: this.state});
  }
  toOld(){
    this.props.navigation.navigate("Old", {userInfo: this.state});
  }
  toLog(){
    this.props.navigation.navigate("Stats", {userInfo: this.state});
  }

  componentDidMount() {
    let userInfo = this.props.navigate.getParam('userInfo');
    let queryUrl = url + '/' + userInfo.userid ;
    return fetch(queryUrl)
    .then(response=> response.json())
    .then(json => {
      this.setState({
        name: json.name,
        username: json.username,
        userid: userInfo.userid
      });
    })
  }

  render(){
    return(
      <View>
        <LinearGradient style={{height:"100%"}} colors={["#7fd64d", "#4dd6ba"]} >
          <View style={{alignItems:"center", justifyContent:"center"}}>
            <Text style={{fontFamily:"Cochin", color:"white", fontSize:40}}>You Good?</Text>
          </View>
          <View style={{alignItems:"center", justifyContent:"center"}}>
            <View>
              <TouchableOpacity style={{alignItems:"center", justifyContent:"center"}} onPress={() => this.toNew()}>
              <Text style={{fontFamily:"Cochin", color:"white", fontSize:30}}>
              New Log
              </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={{alignItems:"center", justifyContent:"center"}} onPress={() => this.toOld()}>
              <Text style={{fontFamily:"Cochin", color:"white", fontSize:30}}>
              Old Log
              </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={{alignItems:"center", justifyContent:"center"}} onPress={() => this.toLogs()}>
              <Text style={{fontFamily:"Cochin", color:"white", fontSize:30}}>
              Statistics
              </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    )
  }
}
