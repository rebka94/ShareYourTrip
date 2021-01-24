
import React from "react";
import { View, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Text, Platform} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
const CustomHeaderTab = props => {
  return (
    <SafeAreaView
      style={{
        display:"flex",
        flexDirection:"row",
        justifyContent: 'space-between',
        backgroundColor:"purple"
      }}
    >                      
    <StatusBar barStyle="light-content" backgroundColor="purple"/>

        <TouchableOpacity onPress={()=>props.navigation.navigate("Profile")}>
            <View style={[styles.button, {marginLeft:15,}]}>
                <Ionicons name="ios-person" size={30} color="#fff" />    
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>props.navigation.navigate("ChatRoom")}>
            <View style={[styles.button, {marginRight:15, flexDirection:"row"}]}>
                <Feather name="message-circle" size={30} color="#fff" />
                <View style={{height:20, width:20, 
                  backgroundColor:"green", borderRadius:20, 
                  position:"absolute", right:-5, top:-5, justifyContent:"center", alignItems:"center"}}>
                    <Text style={{color:"#fff"}}>{"3"}</Text>
                </View>
            </View>
        </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    button: {
        borderWidth:2, 
        borderRadius:100, 
        height:40,width:40, 
        justifyContent:"center", 
        alignItems:"center",
        marginVertical:5

    },
});



export default CustomHeaderTab;