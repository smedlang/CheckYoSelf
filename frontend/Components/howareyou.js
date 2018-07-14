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
  import { Slider } from 'react-native-elements';
  //import CircularSlider from "react-native-circular-slider"
  //"react-native" link "react-native-svg"

  export default class HomeScreen extends React.Component {
    constructor() {
      super();
      this.state = {
        value: 4,
        userid: ''
      }
    }



    logout() {
      //fetch logout
      this.props.navigation.navigate('Login');
    }

    componentDidMount(){
      let userInfo = this.props.navigate.getParam('userInfo');
      this.setState({
        userid: userInfo.userid
      });
    }

    continue() {
      //make sure circle slider sets color as number in state
      //pass that number when redirecting to grid
      this.props.navigation.navigate('Emotions', {userInfo: this.state}) //, {color: this.state.color});
    }

    render() {
      return(
        <View >
          <LinearGradient style={{height:"100%"}} colors={["#7fd64d", "#4dd6ba"]} >


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

            {/* <View style={{justifyContent: 'center', height:"50%"}}> */}
              <View style={styles.contentBox}>
                <Text style={styles.contentText}>How are you?</Text>
              </View>

              <View style={{alignItems:"center"}}>
                <Text style={styles.contentText}>{this.state.value}</Text>
              </View>


              <View style={styles.slider}>
                <Slider
                  style={{width: "80%"}}
                  value={this.state.value}
                  onValueChange={(val) => this.setState({value: val })}
                  //orientation={"vertical"}
                  step={1}
                  minimumValue={1}
                  maximumValue={7}
                  thumbTintColor={"#49677f"}
                  minimumTrackTintColor={"white"}
                  maximumTrackTintColor={"white"}
                  animateTransitions={true} />
                </View>

                <View styles={styles.nextView}>

                  <TouchableOpacity onPress={this.continue.bind(this)} style={styles.nextButton}>
                    <Text style={{fontSize: 16, color: "white", fontFamily:"Cochin", fontWeight:"500"}}>Next</Text>
                  </TouchableOpacity>

                </View>

            </LinearGradient>
          </View>
        )
      }
    }

    const styles = StyleSheet.create({
      container: {
        width: "100%"
      },
      slider:{
        height:"20%",
        alignItems: "center",
        justifyContent: "center",
      },
      contentBox:{
        alignItems: 'center',
        justifyContent: 'center',
        height: "16%"
      },
      contentText:{
        color: "white",
        fontSize: 40,
        fontFamily:"Cochin"
      },
      nextView: {
        flex:1,
        height: "20%",
        textAlign: "center",
        borderWidth: 3,
        borderColor: "red"
      },
      nextButton: {
        borderColor: 'white',
        width: 120,
        height: 35,
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        fontSize: 12,
      },
      nav: {
        height: "34%",
      }
    });
