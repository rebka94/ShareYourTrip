//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image, Modal, SafeAreaView, StatusBar} from 'react-native';
import Fire from "../Fire/Fire"
import { DrawerActions } from '@react-navigation/native';
import UserPermissions from "../helpers/UserPermissions"
import * as ImagePicker from "expo-image-picker"
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment"
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Test} from "../classes/Test"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as func from "../helpers/functionsHelp"
const posts = [
    {
        id: "1",
        departure:"Paris",
        arrival: "alger",
        departureDateTime: new Date(),
        arrivalDateTime: new Date(),
        nbEscales:"3",
        listeEscales:"",
        nbSyt:"0"
    },
    {
        id: "2",
        departure:"toulouse",
        arrival: "JFK",
        departureDateTime: new Date(),
        arrivalDateTime: new Date(),
        nbEscales:"2",
        listeEscales:"",
        nbSyt:"2"
    },
    {
        id: "3",
        departure:"Lille",
        arrival: "Bejaia",
        departureDateTime: new Date(),
        arrivalDateTime: new Date(),
        nbEscales:"1",
        listeEscales:"",
        nbSyt:"4"
    },

]
/**
 * classe pour la liste des voyages archivé 
 */

// create a component
class TripList extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            voyages:[]
        }
        this.unubscribe= null

    }
    componentDidMount() {
        const {navigation} = this.props
        this._unsubscribe = navigation.addListener('focus', () => {
            this.getData()
        })
    }
    getData = async() => {
        try {
            const value = await AsyncStorage.getItem('voyages');
            if (value!==null) {
                //we have data   
                let parsed=JSON.parse(value)
                console.log("cklklk",parsed)  
                this.setState({voyages:parsed})

                
            }
          } catch (error) {
            alert(error)
          }
    }
   
 
    


 
    navigate(props) {
        if (this.state.userSearch[0].userName===Fire.shared.userName){
            this.props.navigation.navigate("Profile")
            this.setState({modalVisible:false})
        } else {
            this.props.navigation.navigate("PublicProfile", {props})
            this.setState({modalVisible:false})
        }
      
    }

                   
   
    redderVoyages = (item)=>{
        return (
            <TouchableOpacity style={styles.feedItem} onPress={()=> {}}>
                <View style={{flex:1, flexDirection:"column"}}>
                <View style={{flex:1/10}}>
                    <View style={styles.badge}>
                        <Text style={{fontSize:13, fontWeight:"bold", color:"white"}}>{item.nbSyt}</Text>

                    </View>
                </View>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", flex:9/10}}>
                        <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                            <View style={{flex:4/10, alignItems:"center", justifyContent:"center"}}>
                                <View style={{flex:1/2, justifyContent:"center", alignItems:"center"}}>
                                    <MaterialCommunityIcons name="airport" size={50} color="purple" />
                                </View>
                                <View style={{flex:1/2, justifyContent:"center", alignItems:"center"}}>
                                    <Text style={styles.text}>{item.departure.code}</Text>
                                    <Text style={[styles.text,{color:"black", fontWeight:"bold", fontSize:13}]}>
                                      {func.getDateFormat(new Date(item.departureDateTime))}</Text>
                                      <Text style={[styles.text,{color:"black", fontWeight:"bold", fontSize:13}]}>
                                      {func.getTimeFormat(new Date(item.departureDateTime))}</Text>
                                </View>
                            </View>
                            <View style={{flex:2/10, justifyContent:"center", alignItems:"center"}}>
                                <Entypo name="arrow-long-right" size={40} color="purple" />
                            </View>
                            <View style={{flex:4/10, alignItems:"center", justifyContent:"center"}}>
                                <View style={{flex:1/2, justifyContent:"center", alignItems:"center", }}>
                                    <MaterialCommunityIcons name="airport" size={50} color="black" />
                                </View>
                                <View style={{flex:1/2, justifyContent:"center", alignItems:"center"}}>
                                    <Text style={styles.text}>{item.arrival.code}</Text>
                                    <Text style={[styles.text,{color:"black", fontWeight:"bold", fontSize:13}]}>
                                      {func.getDateFormat(new Date(item.departureDateTime))}</Text>
                                      <Text style={[styles.text,{color:"black", fontWeight:"bold", fontSize:13}]}>
                                      {func.getTimeFormat(new Date(item.departureDateTime))}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                    </View> 
                    </View>
                    {item.nbEscales>0 &&  <View>
                        <Text style={styles.text}>{"escales: "}{item.nbEscales}</Text>
                    </View>} 
                    <View>
                        <Text style={styles.text}>{"compatibilités de voyages:  "}{item.nbSyt}</Text>
                    </View>
                   
                </View>
            </TouchableOpacity>
        )
    }
   
    display() {
        
    }
    toggle() {
        let o = "j"
        var e = new Test (o);
        console.log(e.name)
        
    }
    componentWillUnmount() {
      this._unsubscribe();
    }
  

    render() {
        console.log("la state du home",this.state)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="purple"/>
                <View style={{flex:1, backgroundColor:"#F5E7FF"}}>
                    <View style={styles.header}>
                        <Text style={{fontWeight:"bold", fontSize:25, marginVertical:25, color:"#846D84", marginLeft:15}}>
                        {"Voyages Archivés"}
                        </Text>
                    </View>
                    <FlatList 
                        style={styles.feed}
                        data= {this.state.voyages}
                        renderItem={({item}) => this.redderVoyages(item) }
                        keyExtractor= {item => item.id}
                    />     
                </View>        
                <TouchableOpacity style={[styles.SYT_add]} onPress={()=> this.toggle()}>
                    <Image style ={{width:35, height:35}}source={require("../assets/searchh.png")}/>
                </TouchableOpacity>
            </SafeAreaView>
        );
    };

}


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"purple"
    },
    badge: {
        height:30, 
        width:30, 
        backgroundColor:"#A925FF",
        borderRadius:30, 
        alignSelf:"flex-end", 
        justifyContent:"center", 
        alignItems: 'center',
    },
    text: {
        marginHorizontal:5,
        color:"grey",
        fontSize:15, 
        fontWeight:"bold"
    },
    post: {
        marginTop: 15,
        fontSize:15,
        color:"#838899"

    },
    textinput: {
        height:50,
        width:300,
        backgroundColor:"#EFECF4",
        borderRadius:20,
        alignSelf:"center",

    },
  
    header: {
        height:"28%", 
        backgroundColor:"purple",
        justifyContent:"center",
        alignItems:"flex-start",
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        paddingHorizontal:20
    }, 
    feed: {
        marginHorizontal:16,

    },

    headertitle: {
        fontSize: 50,
        fontWeight: "bold",
        fontStyle:"italic"
    },
    SYT_add: {
        width:60,
        height:60,
        position:"absolute", 
        borderRadius:150,
        justifyContent:"center",
        alignItems:"center",
        bottom:25,
        right:15,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 2, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        elevation: 10, // Android
        
    },
    feedItem: {
        backgroundColor:"#fff",
        borderRadius:10,
        padding:9, 
        flexDirection:"row",
        marginVertical:8,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.30,
shadowRadius: 4.65,

elevation: 8,
    },
    avatar: {
        width: 36,
        height:36,
        borderRadius:18,
        marginRight: 16
    },
    name : {
        fontWeight:"600",
        fontSize:16,
        color: "#454D65"
    },
    timestamp: {
        fontSize:11,
        color: "#C4C6CE",
        marginTop: 4

    }

   
   
});

//make this component available to the app
export default TripList;

