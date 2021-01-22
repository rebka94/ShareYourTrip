import React, {Component} from 'react';
import { Provider } from 'react-redux'
import Store from './Store/configStore'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import AppStackNavigator from './navigation/navigation'
import {Ionicons} from '@expo/vector-icons'
import {EscaleForm} from "./Components/EscalesScreens/EscaleForm"
import SearchTrip from "./Components/SYT/SearchTrip"

import { YellowBox } from "react-native";
import _ from "lodash";
YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
if (message.indexOf("Setting a timer") <= -1) {
_console.warn(message);
}
};



export default class App extends React.Component{
  

  render() {
      return (
        <Provider store={Store}>
           <NavigationContainer >
             <AppStackNavigator/>
           </NavigationContainer>
        </Provider>
         

       
      );

  }

};

// define your styles
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2c3e50',
  },
});





        


