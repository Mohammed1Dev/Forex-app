import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  StyleSheet,
  Image
} from 'react-native';
import Expo, { Constants } from 'expo';
import * as Facebook from 'expo-facebook';
import firebase from 'firebase'

const id = "";

export default class App extends Component {
  state = {
    responseJSON: null,
  };
  callGraph = async token => {
    /// Look at the fields... I don't have an `about` on my profile but everything else should get returned.
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
    );
    const responseJSON = JSON.stringify(await response.json());
    this.setState({ responseJSON });
  };

  login = async () => {

    await Facebook.initializeAsync({id});
    const {type, token} = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email', 'user_friends'] });

    if (type === 'success') {
      this.callGraph(token);

      this.firebaseLogin(token);
    }else {
      alert(type)
    }
  };

  // Sign in with credential from the Facebook user.
  firebaseLogin = token => {
    firebase.auth().signInWithCredential(token).catch((error) => {
        // Handle Errors here.
        console.warn("Add Error for login", error)
      });
  };

  renderButton = () => (
    <TouchableOpacity onPress={() => this.login()}>
      <View
        style={{
          width: '25%',
          alignSelf: 'center',
          borderRadius: 4,
          margin: 10,
          backgroundColor: '#3B5998',
        }}>
        <Image
          source={{uri: 'https://img.icons8.com/dotty/80/000000/facebook-new.png' }}
          style={{ width: 40, height: 40 , alignSelf: 'center'}}
        />
      </View>
    </TouchableOpacity>
  );
  renderValue = value => (
    <Text key={value} style={styles.paragraph}>{value}</Text>
  );
  render() {
    return (
      <ScrollView>
      
        <View style={styles.container}>
        <Text style={styles.paragraph}>Your Welcome To :</Text>
        <Image
          source={{uri: 'https://simplonline-v3-prod.s3.eu-west-3.amazonaws.com/media/image/jpg/1677ecdd-0b2a-4e0a-b2d5-51bc60548a34.jpg' }}
          style={styles.backgroundImage}
        />
            {this.state.responseJSON &&
              this.renderValue('User data : ' + this.state.responseJSON)}
            <Text style={styles.paragraph}>Log In with :</Text>
            {this.renderButton()}
        </View>
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 600,
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  backgroundImage: { 
    width: '80%', 
    height: 150 , 
    alignSelf: 'center',
    borderRadius: 10
  }
});
