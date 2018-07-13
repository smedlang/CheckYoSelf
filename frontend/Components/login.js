import React from 'react';
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

export default class LoginScreen extends React.Component {
  constructor(){
    super();
    this.state={
      username: "",
      password: ""
    }
  }
  login(){
    Alert.alert(
  "Login",
  "Login button pressed!" + this.state.username,
  [{ text: "yay" }] // Button
);
  }
  register(){
    Alert.alert(
  "Register",
  "Register button pressed!",
  [{ text: "yay" }] // Button
);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textBig}>You Good?</Text>
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
            borderColor: "#97ad8a",
            borderWidth: 2
          }}
          placeholder=" Password"
          onChangeText={text => this.setState({ password: text })}
        />
        <TouchableOpacity
          onPress={() => {
            this.login();
          }}
          style={[styles.button, styles.buttonGreen]}
        >
          <Text style={styles.buttonLabel}>Tap to Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonBlue]}
          onPress={() => {
            this.register();
          }}
        >
          <Text style={styles.buttonLabel}>Tap to Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 400,
    backgroundColor: '#d6f2c6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: 'white'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 20
  },


});
