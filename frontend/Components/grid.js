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
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo';

  export default class GridScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      headerRight:
        <Button
          title="Next"
          onPress={ () => {this.props.navigation.navigate('Journal', {userInfo: this.state})} }
        />
    })

    constructor(){
      super();
      this.state = {
        selected: [],
        userid: '',
        value: '',
        emotions: []
      }
    }

    select = (caption) => {
      console.log(caption)
      let arr = this.state.selected.slice()
      console.log('before', arr)
      arr.push(caption)
      console.log('after', arr)

      this.setState({selected: arr}, () => console.log(this.state.selected));

    }

    componentDidMount(){
      let userInfo = this.props.navigate.getParam('userInfo');
      this.setState({
        userid: userInfo.userid,
        value: userInfo.value,
        emotions: userInfo.emotions
      });
    }


    render(){
      return(
        <View style={styles.grid}>
          <LinearGradient colors={["#7fd64d", "#4dd6ba"]} >
            <View style={{justifyContent:"center",}}>
          <Text style={styles.titleText}>What affected you today?</Text>
        </View>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <FullIcon iconName="md-bookmarks" caption="Education" select={this.select.bind(this)}/>
            <FullIcon iconName="ios-briefcase" caption="Work" select={this.select}/>
            <FullIcon iconName="ios-home" caption="Family" select={this.select}/>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <FullIcon iconName="md-heart" caption="Relationship" select={this.select}/>
            <FullIcon iconName="ios-restaurant" caption="Food" select={this.select}/>
            <FullIcon iconName="md-car" caption="Travel" select={this.select}/>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <FullIcon iconName="ios-contacts" caption="Friends" select={this.select}/>
            <FullIcon iconName="md-bicycle" caption="Exercise" select={this.select}/>
            <FullIcon iconName="ios-partly-sunny" caption="Weather" select={this.select}/>
          </View>

          <View style={{justifyContent: "center", alignItems: 'center',}}>
            <TouchableOpacity style={styles.nextButton}>

              <Text style={styles.nextText}>
                Next
              </Text>

            </TouchableOpacity>
            </View>
        </LinearGradient>
        </View>
      )
    }


  }

  export class FullIcon extends React.Component {
    constructor(props){
      super(props);
    }



    render(){
      return(
        <TouchableOpacity onPress={() => this.props.select(this.props.caption)} style={styles.iconStyle}>
          <Icon color='white' type='ionicon' name={this.props.iconName} size="50" />
          <Text style={{fontSize: 15, color: 'white'}}>{this.props.caption}</Text>
        </TouchableOpacity>

      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#d6f2c6',
      alignItems: 'center',
    },
    iconStyle: {
      justifyContent: "center",
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'white',
      height: 150,
      width: "33.33%"
    },
    nextButton: {
      //flex: 1,
      textAlign: 'center',
      alignItems: "center",
      justifyContent: 'center',
      // paddingBottom: 10,
      // borderWidth: 2,
      // borderColor: "grey",
      //borderRadius: 5,
      margin: 10,
      height: 150,
      width: "100%",

    },
    titleText:{
      margin: 30,
      textAlign:"center",
      justifyContent: 'center',
      fontSize: 30,
      color:"white",
      fontFamily:"Cochin"
    },
      nextText:{
        fontSize: 20,
        fontFamily: 'Cochin',
        textAlign:"center",
        justifyContent: 'center',
        fontSize: 25,
        color:"white",
        fontFamily:"Cochin"
      }
    // grid: {
    //   backgroundColor: linear-gradient(to bottom right, );
    // }
  })
