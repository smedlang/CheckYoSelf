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
  import Swiper from 'react-native-swiper'

  export default class EmotionsScreen extends React.Component{
    constructor(){
      super();
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
        negativesSet: false
      }
    }

    setParents() {
      if (this.state.positivesSet && this.state.negativesSet) {
        let finalArr = this.state.positiveArr.concat(this.state.negativeArr)
        //fetch post based
      }
      else { //user clicked all done without finishing both
        console.log('cannot post emotions sliders because positives or negatives have not been sent')
      }
    }

    setParentState(obj, isPositive) {
      let arr = Object.keys(obj).map((emotion) => ({'name': emotion, 'intensity': obj[emotion] }))
      if (isPositive) this.setState({positiveArr: arr, positivesSet: true}, () => {console.log(this.state)})
      else this.setState({negativeArr: arr, negativesSet: true})
      console.log('set parent state')

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
        <View style={{height: 80, borderWidth: 1, borderColor: 'grey'}}>
          {this.props.positive ? <Text>Positive</Text> : <Text>Negative</Text>}
        </View>
        <TouchableOpacity style={{}} onPress={() => this.props.setParent(this.state.emotionsObjs, this.props.positive)}>
          <Text style={{fontSize: 16, textAlign: 'center'}}>I'm Done</Text>
        </TouchableOpacity>
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
      height: 80,
      width: "100%",
      backgroundColor: 'blue',
      alignItems: 'center'
    },
    Title: {
      textAlign: 'center',
      fontSize: 20
    }

  })
