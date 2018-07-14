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
import { StackNavigator } from 'react-navigation';
import { LinearGradient } from 'expo';

export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);
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

    this.props.navigation.navigate('Register');
  }
  render() {
    return (
      <View >
         <LinearGradient style={{height: "100%"}} colors={["#80d64d", "#f5f558"]} > {/*caea54 */}
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
        <View style={{alignItems: "center", borderWidth: 2}}>
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
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Cochin'
  },
  button: {
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: 'white',
    width: 200
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 20
  },


});
