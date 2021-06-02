import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Button
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  Home  from "./screens/HomeScreen";
import LoginScreen  from "./screens/LoginScreen";
import WebChart from "./screens/WebChart";

const Stack = createStackNavigator();




const Tab = createBottomTabNavigator();


function App() {
  return (
    // <NavigationContainer>
    //     {getData && 
    //       <Tab.Navigator>
    //       <Tab.Screen name="Home" component={Home} />
    //       <Tab.Screen name="ChartView" component={WebChart} />
    //     </Tab.Navigator>
    //   }
    // </NavigationContainer>


        <NavigationContainer>
          
          <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen 
                name="LoginScreen"
                component={LoginScreen}
                options={{
                  title: 'Authetification',
                  headerStyle: {
                    backgroundColor: '#ba8b02',
                  },
                  
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }} 

            />
            <Stack.Screen 
                name="Home" 
                component={Home}
                options={{
                  title: 'My home',
                  headerStyle: {
                    backgroundColor: '#ba8b02',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }} 
            />
            <Stack.Screen 
                name="ChartView"
                component={WebChart}
            />
          </Stack.Navigator>
        </NavigationContainer>
   
            
 
  );
}

export default App;


