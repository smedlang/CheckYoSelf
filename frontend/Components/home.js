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
  import { LinearGradient } from 'expo';
// import CircularSlider from "react-circular-slider-bar"

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      color: -1
    }
  }




  logout() {
    //fetch logout
    this.props.navigation.navigate('Login');
  }

  continue() {
    //make sure circle slider sets color as number in state
    //pass that number when redirecting to grid
    this.props.navigation.navigate('Grid') //, {color: this.state.color});
  }

  render() {
    return(
      <View style={styles.container}>
        <LinearGradient colors={["#7fd64d", "#4dd6ba"]} >
        <View style={styles.nav}>
            //nav bar start
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Friends')}>
              <Text style={styles.buttonLabel}>View Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Stats')}>
              <Text style={styles.buttonLabel}>Insights</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Survey')}>
              <Text style={styles.buttonLabel}>Update activities</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.logout.bind(this)}>
              <Text style={styles.buttonLabel}>Logout</Text>
            </TouchableOpacity>

            //nav bar end
          </View>

        <View style={{justifyContent: 'center', height:"75%"}}>
          <Text style={{fontSize:40,}}>How are you?</Text>
        <TouchableOpacity onPress={this.continue.bind(this)}>
          <Text>Next</Text>
        </TouchableOpacity>
        </View>

      </LinearGradient>

      </View>
    )
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
