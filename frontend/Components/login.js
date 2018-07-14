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
import { StackNavigator } from 'react-navigation';
import { LinearGradient } from 'expo';

export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username: "",
      password: "",
      userid: ''
    }
  }
  login(){
    let queryUrl = url + '/login';
    return fetch(queryUrl, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then(response => response.json())
    .then(json => {
      if (json.userid){
        this.setState({
          userid: json.userid
        });
        this.props.navigation.navigate('HomePage', {userInfo: this.state});
      }
    })

    Alert.alert(
  "Login",
  "Login button pressed!" + this.state.username,
  [{ text: "yay" }] // Button
);
  }
  //good
  register(){
    this.props.navigation.navigate('Register');
  }
  render() {
    return (
      <View >
         <LinearGradient style={{height: "100%"}} colors={["#80d64d", "#f5f558"]} > {/*caea54 */}
        <Text style={styles.textBig}>You Good?</Text>
        <View style={{alignItems:"center", justifyContent:"center"}}>
        <TextInput
          style={{
            margin: 15,
            width: 300,
            height: 40,
            borderColor: "#97ad8a",
            borderWidth: 2
          }}
          placeholder=" Username"
          onChangeText={text => this.setState({ username: text })}
        />
        <TextInput
          style={{
            margin: 15,
            width: 300,
            height: 40,
            borderColor: "white",
            borderWidth: 2
          }}
          placeholder=" Password"
          onChangeText={text => this.setState({ password: text })}
        />
      </View>
        <View style={{alignItems: "center", justifyContent:"center"}}>
        <TouchableOpacity
          onPress={() => {
            this.login();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonLabel}>Tap to Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.register();
          }}
        >
          <Text style={styles.buttonLabel}>Tap to Register</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop:100,
    flex: 1,
    backgroundColor: '#d6f2c6',
    alignItems: 'center',
  },
  textBig: {
    color:"white",
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Cochin'
  },
  button: {
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: 'white',
    width: 200
  },
  buttonLabel: {
    fontFamily:"Cochin",
    color:"white",
    textAlign: 'center',
    fontSize: 25
  },


});
