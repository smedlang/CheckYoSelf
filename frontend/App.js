import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from "./Components/login";
import RegisterScreen from "./Components/register"
import SurveyScreen from "./Components/initialSurvey"
import HomeScreen from "./Components/home"
import GridScreen from "./Components/grid"

import { StackNavigator } from 'react-navigation';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      name: "",
      email: "",
      phone: ""
    }
  }



  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}


export default StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  Survey: {
    screen: SurveyScreen
  },
  Home: {
    screen: HomeScreen
  },
  Grid: {
    screen: GridScreen
  }
}, {initialRouteName: 'Register'});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
