import React from 'react';
import url from './url';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  RefreshControl,
  AsyncStorage
} from "react-native"
import { LinearGradient } from "expo";

export default class SuggestionsScreen extends React.Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSouce({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state={
      renderList: []
      physicalActivityBool: false,
      watchFunnyBool: false,
      gratitudeListBool: false,
      apologySelfBool: false,
      apologyElseBool: false,
      checkMagBool: false,
      callBool: false,
      musicBool: false,
      showerBool: false,
      angryLetterBool: false,
      breathingBool: false,
      drinkBool: false,
      groundingBool: false,
      eatBool: false
    }
  }

  componentDidMount(){
<<<<<<< HEAD
    let suggestions = this.props.navigation.getParam('suggestions');
=======

    let suggestions = this.props.navigate.getParam('suggestions');
    //
    // fetch('')
    // .then((res)=> res.json())
    // .then((res2)=> this.setState({renderList:ds.cloneWithRows(res2)}))

>>>>>>> ed5a868156ae9ac3c2a1299ebf886849a455af1b
    this.setState({
      renderList: suggestions
    });
  }

  render(){
    return(
      <View>
        <LinearGradient style={{height:"100%"}} colors={["#7fd64d", "#4dd6ba"]} >
          <ListView dataSource={this.state.renderList}
            renderRow={item => (
              <TouchableOpacity onPress={() => this.callExercise(item.name)}>
                  <Text>
                    {item.name}
                  </Text>
                  <Text>
                    {item.description}
                  </Text>
              </TouchableOpacity>
            )}
          />
        </LinearGradient>
      </View>
    )
  }
}
