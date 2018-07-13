import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from "./Components/login";
import RegisterScreen from "./Components/register"
import SurveyScreen from "./Components/initialSurvey"

import { StackNavigator } from 'react-navigation';

class App extends React.Component {
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
  }
}, {initialRouteName: 'Login'});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
