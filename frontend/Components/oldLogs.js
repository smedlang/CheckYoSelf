import React from 'react';
import url from './url';
import { StyleSheet, Text, View, Animated, TextInput, Button, ListView, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { StackNavigator } from 'react-navigation';
import _ from "underscore";

export default class OldLogs extends React.Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }


  componentDidMount(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    fetch("/:userid/dailyLogs")
    .then((resp) -> resp.json())
    .then((json) => {
      var ordered = _.sortBy(json, "creationTime")
      this.setState({
        dataSource: ds.cloneWithRows(ordered)
      })
    })
    .catch(err => console.log(err))
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={{margin: 20}}>
        </View>
        <Animatable.Text style={{fontSize: 20, margin: 20, color: "#F718A4"}}
          animation="fadeIn"
          >Your past logs</Animatable.Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(log) => (
            <View>
              <Text>{log.creationTime}</Text>
              <Text>Body: {log.journalBody}</Text>
              <Text>Emotion: {log.newDetailedEmotions.name ? log.newDetailedEmotions.name : log.oldDetailedEmotions.name}</Text>
            </View>
          )
          }
        />
      </View>
    );
  }
}
