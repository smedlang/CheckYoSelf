import React from 'react';

class Journal extends React.Component{
  constructor(props){
    super(props);

    this.state= {
      journalBody: ''
    }

  }

  skipSection(){
    this.props.navigation.navigate('');
  }

  postJournal(){
    const queryUrl = '/:userid/newJournal'
    return fetch(queryUrl, {
      method: 'POST',
      body: JSON.stringify({
        userid: '',
        journalBody: this.state.journalBody
      })
    }).then(response=> response.json())
    .then(json => {
      if (json.status === 200){
        this.props.navigation.navigate('');
      }
    })
  }

  render(){
    return (
      <TextInput
        placeholder="Write your journal here"
        onChange={(journal)=> this.setState({
          journalBody: journal
        })}/> </TextInput>
      <Button
        onPress={()=> this.skipSection()}
        title="Skip"
      />
      <Button
        onPress={()=> this.postJournal()}
        title="Post"
      />
    );
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
