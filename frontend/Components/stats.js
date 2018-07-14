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
        emotions: [],
        reasons: [],
        most_used: "",
        most_freq: "",
        total_logs: 0,
        emo_color: ""
      }
    }


    componentDidMount(){
      fetch(URL + '/:userid/stats')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          emotions: topEmotions,
          reasons: topReasons,
          most_used: mostUsedSuggestion,
          most_freq: mostProductiveActivity,
          total_logs: totalLogs
        })
      })
      var score = 0;
      var happyArr = ["happy", "excited", "calm", "confident", "content", "grateful", "motivated", "proud", "peaceful", "secure"]
      topEmotions.forEach(emotion => {
        if (happyArr.includes(emotion)){
          score++
        } else {
          score--
        }
      })
      score > 0 ? this.setState({emo_color: "#FFA057"}) : this.setState({emo_color: "#4682B4"})
    }

    render() {
      return(
        <View style={{flex:1}}>
        <LinearGradient style={{height:"100%"}} colors={["#7fd64d", "#4dd6ba"]} >

        <View style={{flex:1, backgroundColor: this.state.emo_color, }}>
        <Text style={{color: white, fontSize: large}}>Your Top 5 emotions:</Text>
        <View style={{justifyContent: "space-evenly"}}>
        <Text style={{color: white, fontSize: medium}}>{this.state.emotions[0]}</Text>
        <Text style={{color: white, fontSize: medium}}>{this.state.emotions[1]}</Text>
        <Text style={{color: white, fontSize: medium}}>{this.state.emotions[2]}</Text>
        <Text style={{color: white, fontSize: medium}}>{this.state.emotions[3]}</Text>
        <Text style={{color: white, fontSize: medium}}>{this.state.emotions[4]}</Text>
        </View>
        </View>

        <View style={{flex:1}}>
        <Text style={{color: "#658BF3", fontSize: large}}>We think these aspects of your life affect your emotions the most:</Text>
        <View style={{justifyContent: "space-evenly"}}>
        <Text style={{color: white, fontSize: medium}}>{this.state.reasons[0]}</Text>
        <Text style={{color: white, fontSize: medium}}>{this.state.reasons[1]}</Text>
        <Text style={{color: white, fontSize: medium}}>{this.state.reasons[2]}</Text>
        </View>
        </View>

        <View style={{flex:1, justifyContent: "space-evenly"}}>
        <Text style={{color: white, fontSize: medium}}>{this.state.most_used} helped you the most!</Text>
        <Text style={{color: white, fontSize: medium}}>You did {this.state.most_freq} most often!</Text>
        </View>

        <View style={{flex:1, justifyContent: 'center'}}>
        <Text style={{color: white, fontSize: medium}}>You have logged {this.state.total_logs} times!</Text>
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
