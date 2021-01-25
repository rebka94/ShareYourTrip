
import React from "react";
import { View, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Text, Platform, Image} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const CustomHeaderChatScreen = props => {
  return (
    <SafeAreaView
      style={{
        display:"flex",
        flexDirection:"row",
        justifyContent: "center",
        alignItems:"center",
        backgroundColor:"purple"
      }}
    >                      
    <StatusBar barStyle="light-content" backgroundColor="purple"/>
       <View style={{ flexDirection:"row",
        justifyContent: "center",
        alignItems:"center", }}>
            <TouchableOpacity onPress={()=>props.goBack()}>
                <MaterialIcons name="keyboard-arrow-left" size={40} color="#fff" />
            </TouchableOpacity>
             <TouchableOpacity onPress={()=>props.navigation.navigate("Profile")}>
            <View style={[{ marginRight:15}]}>
                <Image source={{uri: props.params.person.avatar}}style={{height:40,alignSelf:"center", width:40, borderColor:"white", borderRadius:50/2,}}/>
            </View>
        </TouchableOpacity>
        <View style={{}}>
        <TouchableOpacity style={{alignSelf:"center",}} onPress={()=>props.navigation.navigate("ChatRoom", {cc: "cc"})}>
            <Text style={{fontSize:25, fontWeight:"bold", color:"#fff"}}>{props.params.person.name}{" "+props.params.person.firstName}</Text>
        </TouchableOpacity>

        </View>
        </View> 
       
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    button: {
        borderWidth:2, 
        borderRadius:100, 
        justifyContent:"center", 
        alignItems:"center",
        marginVertical:10

    },
});



export default CustomHeaderChatScreen;