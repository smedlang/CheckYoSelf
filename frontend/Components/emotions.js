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
  import { LinearGradient } from 'expo';
  import { StackNavigator } from 'react-navigation';
  import { Slider } from 'react-native-elements';
  import Swiper from 'react-native-swiper'

  export default class EmotionsScreen extends React.Component{

    static navigationOptions = ({ navigation }) => ({
      headerRight:
        <Button
          title="Submit"
          onPress={ () => {navigation.state.params.onRightPress()} }
        />
    })

    constructor(props){
      super(props);
      this.state = {
        positiveEmotions: ['happy', 'excited', 'hopeful', 'calm', 'confident',
        'content', 'grateful', 'motivated', 'proud', 'peaceful', 'secure'],
        negativeEmotions: ['depressed', 'hopeless', 'sad', 'empty', 'gloomy',
        'anxious', 'afraid', 'worried', 'nervous', 'panicked',
        'angry', 'irritated', 'frustrated', 'annoyed',
        'guilty', 'remorseful', 'self-conscious',
        'shameful', 'embarrassed'],
        positiveArr: [],
        negativeArr: [],
        positivesSet: false,
        negativesSet: false,
        userid: '',
        value: ''

      }
    }

    componentDidMount() {
      let userInfo = this.props.navigation.getParam('userInfo');
      console.log('userInfo', userInfo);

      userInfo && this.setState({
        userid: userInfo.userid,
        value: userInfo.value
      });

      this.props.navigation.setParams({
        onRightPress: this.setParents.bind(this)
      })

    }

    setParents() {
      console.log("setParents")
      if (this.state.positivesSet && this.state.negativesSet) {
        let finalArr = this.state.positiveArr.concat(this.state.negativeArr);
        console.log('setparents', finalArr);
        let userInfo = {
          userid: this.state.userid,
          emotions: finalArr,
          value: this.state.value
        }
        this.props.navigation.navigate('Grid', {userInfo: userInfo}); //, {color: this.state.color});
      }
      else { //user clicked all done without finishing both
        console.log('cannot post emotions sliders because positives or negatives have not been sent')
      }
    }

    setParentState(obj, isPositive) {
      // console.log('set parent state')
      let arr = Object.keys(obj).map((emotion) => ({'name': emotion, 'intensity': obj[emotion] }))
      if (isPositive) this.setState({positiveArr: arr, positivesSet: true})
      else this.setState({negativeArr: arr, negativesSet: true})
    }

    render() {
      return (
        // <View>
        <Swiper showsButtons={true} loop={false}>
          <SubScreen emotions={this.state.positiveEmotions} setParent={this.setParentState.bind(this)} positive={true} />
          <SubScreen emotions={this.state.negativeEmotions} setParent={this.setParentState.bind(this)} positive={false}/>
        </Swiper>
        /* <TouchableOpacity onPress={() => this.setParents}>
          <Text>Done</Text>
        </TouchableOpacity>
      </View> */
      )
    }

  }

class SubScreen extends React.Component{

  constructor(props) {
    super(props);
    let newObj = new Object();
    this.props.emotions.forEach((str) => {
      console.log(str)
      newObj[str] = 0;
    })
    console.log(newObj)
    this.state = {
      emotionsObjs: newObj
    }
  }

  updateVal(val, name) {
    let updated = this.state.emotionsObjs
    updated[name] = val;
    console.log('updated ', name, val)
    this.setState({
      emotionsObjs: updated
    })
  }


  render(){
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return(
      <View>
        <LinearGradient style={{height:"100%"}} colors={["#1049cc", "#00B0B0"]}>
        <View style={{height: 80}}>
          {this.props.positive ?
            <View style={{alignItems:"center", justifyContent:"center", paddingTop:15}}>
            <Text style={{color:"white", fontFamily: "Cochin", fontSize: 40}}>Positive</Text>
            </View>
            :
            <View style={{alignItems:"center", justifyContent:"center", paddingTop:15}}>
            <Text style={{color:"white", fontFamily: "Cochin", fontSize: 40}}>Negative</Text>
            </View>
          }
        </View>

        <ListView
          dataSource={ds.cloneWithRows(Object.keys(this.state.emotionsObjs))}
          renderRow={rowData => {
            let n = rowData;
            return (
            <View style={styles.sliderBox}>
              <Text>{n}: {this.state.emotionsObjs[n]}</Text>
              <Slider
                style={{width: "80%"}}
                value={0}
                onSlidingComplete={(val) => {this.updateVal(val, n)}}
                //orientation={"vertical"}
                step={1}
                minimumValue={0}
                maximumValue={10}
                thumbTintColor={"#49677f"}
                minimumTrackTintColor={"grey"}
                maximumTrackTintColor={"grey"}
                animateTransitions={true} />
            </View>
          )}
        }

        />
        <TouchableOpacity style={{height:"13%", alignItems:"center", justifyContent:"center"}} onPress={() => this.props.setParent(this.state.emotionsObjs, this.props.positive)}>
          <Text style={{fontSize: 20, textAlign: 'center', color:"white", fontFamily:"Cochin"}}>I'm Done</Text>
        </TouchableOpacity>
      </LinearGradient>
      </View>
    )
  }
}

// class NegativeScreen extends React.Component{
//   constructor(props) {
//     super(props);
//   }
//
//   render(){
//     return(
//
//     )
//   }
// }



  const styles = StyleSheet.create({
    sliderBox: {
      paddingTop: 15,
      height: 80,
      width: "100%",
      alignItems: 'center'
    },
    Title: {
      textAlign: 'center',
      fontSize: 20
    }

  })
