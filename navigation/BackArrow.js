//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
// create a component
const BackArrow =props=> {
   
        return (    
                    <TouchableOpacity onPress={()=>props.goBack()}>
                            <MaterialIcons name="keyboard-arrow-left" size={40} color="#fff" />
                    </TouchableOpacity>
            
        );
    
}


//make this component available to the app
export default BackArrow;
