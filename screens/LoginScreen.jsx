import React, { Component, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Button
} from 'react-native';
import Expo, { Constants } from 'expo';
import * as Facebook from 'expo-facebook';
import firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bgScreen from "../asset/bgScreen.png";
import { color } from 'react-native-reanimated';
import axios from "axios";


const id = "252870589782343";



const LoginScreen = ({ navigation,route }) => {

  // const userData = {}

  const callGraph = async token => {
    /// Look at the fields... I don't have an `about` on my profile but everything else should get returned.
    const respons = await fetch(
      `https://graph.facebook.com/me?access_token=${token}&fields=name,email,picture`
    );
    const responseJSON = await respons.json();
    // storeData(responseJSON);

    const userData = {
      name: responseJSON.name.toString(),
      email: responseJSON.email.toString(),
      photo_url: responseJSON.picture.data.url.toString()
    }

    console.log(userData)

    axios.post("https://forex-2020.herokuapp.com/api/user/signUp", userData).then((data) => {
          console.log("data inserted  " + data)
           AsyncStorage.setItem('connectedUser', userData.email)
        })
        .catch((e) => {
          console.log("data not inserted  " + e)
        })
        // try {
        //   await AsyncStorage.setItem('connectedUser', data.email)
        // } catch (e) {
        //   // saving error
        // }
  };



  const login = async () => {

    await Facebook.initializeAsync({id});
    const {type, token} = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email', 'user_friends'] });

    if (type === 'success') {
      callGraph(token);

    }else {
      alert(type)
    }
  };

  var storedEmail = null;
 const getData = async () => {
  try {
    storedEmail = await AsyncStorage.getItem('connectedUser')
    // const value = JSON.stringify(jsonValue);
    console.log(storedEmail);
    return storedEmail;

  } catch(e) {
    // error reading value
    console.log('ERROR!!! : '+ e);
  }
}

const signOut = async () => {
  try {
    await AsyncStorage.removeItem('connectedUser')
  } catch(e) {
    // remove error
    console.log('AsycErroe !!! '+ e);
  }

  console.log('Done.')
}


  // const checkUser = async () => {

    
  //     axios.get(`http://forex-2020.herokuapp.com/api/user/info/${userData.email}`).then((userEmail) => {
  //       if(userEmail) return true
  //       return false
        
  //     })
  //     .catch((e) => {
  //       console.log("ERROR :"+ e)
  //     })

  // }

  getData()

    return (
        
          <ScrollView>
              
              <View style={styles.container}>
              <ImageBackground
                  source={bgScreen}
                  style={{width: '100%'}}
              >
                    <Text style={styles.paragraph}>Your Welcome To :</Text>
                    <Image
                        source={{uri: 'https://simplonline-v3-prod.s3.eu-west-3.amazonaws.com/media/image/jpg/1677ecdd-0b2a-4e0a-b2d5-51bc60548a34.jpg' }}
                        style={styles.backgroundImage}
                    />
                        {/* {response &&
                            renderValue('User data : ' + response)} */}
                 
                </ImageBackground>
                
                {getData() != null &&
                  
                  <>
                    <TouchableOpacity onPress={async ()=> navigation.navigate('Home')}>
                        <View
                          style={{
                          width: '25%',
                          alignSelf: 'center',
                          borderRadius: 4,
                          margin: 20,
                          backgroundColor: '#ba8b02'
                          }}>
                            <Text style={styles.textGo}>Go</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <Text style={styles.textGo}>{getData())}</Text> */}
                    <TouchableOpacity onPress={signOut}>
                        <View
                              style={{
                              width: '25%',
                              alignSelf: 'center',
                              borderRadius: 4,
                              margin: 20,
                              backgroundColor: '#ba8b02'
                              }}>
                                <Text style={styles.textGo}>Sign Out</Text>
                            </View>
                    
                    </TouchableOpacity>
                  </>
                  }
                  {getData() == null &&
                    <>
                    <Text style={styles.paragraph}>Log In with :</Text>
                    <TouchableOpacity onPress={login}>
                        
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
                    
                </>

                         }
              </View>
              
              </ScrollView>
       

    );
  
}

const styles = StyleSheet.create({
  container: {
    minHeight: 400,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    margin: 14,
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
  },
  textGo: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    padding: 10
  }
});

export default LoginScreen