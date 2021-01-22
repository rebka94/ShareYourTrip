//import liraries
import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../SYT/Store/actions/userActionsTypes'
import * as actionsFunction  from '../../SYT/Store/actions/userActions'
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import * as firebase from "firebase"
import Fire from '../Fire/Fire';
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as fuctions from "../helpers/getUserFromAsync"




// create a component
class LoadingScreen extends Component{
    constructor(props) {
        super(props)
        this.state= {
            profile: {}
        }
        this.unsubscribe= null
    }

     async componentDidMount() {
        firebase.auth().onAuthStateChanged(user =>{
          this.props.navigation.navigate(user?"TAB":"Welcome")
          this.getProfile()
            
    })
       
    };
    getProfile= async() => {
        try {
            const profil = await AsyncStorage.getItem("profile");
            if (profil==null) {
                let profile= {}
                const user = Fire.shared.uid
                const userRef=  Fire.shared.fireStore.collection("users").doc(user)
                //pour recupere profile
                this.unsubscribe= userRef.onSnapshot( doc => {
                this.setState({profile:doc.data() })
                this.saveProfile(this.state.profile) 
                console.log("Async est null") 
            })} else {
                console.log("Profile récupéré depuis le async ", JSON.parse(profil))
            }
        } catch (error) {
            alert(error)
        
        }

    }
    saveProfile = async(profile) => {
        try {
            await AsyncStorage.setItem("profile", JSON.stringify(profile));
          } catch (error) {
            alert(error)
          }

    }
    componentWillUnmount() {
        this.unsubscribe
    }
    
    render() {
        console.log(this.props)
        return (
            <View style={styles.container}>
                <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                    <Image source={require('../assets/logoSYT.png')} style={styles.image}></Image>
                    <Text style={{marginLeft:10, fontSize:25, fontWeight:"bold", color:'purple'}}>Share Your Trip</Text>
                </View>

                <ActivityIndicator size="large" color="purple"></ActivityIndicator>
            </View>
        );
    };

}

  

export default (LoadingScreen)

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa',
    },
    image: {
        height:100,
        width:100,
        alignSelf:"flex-start",
        borderRadius:1000,
        opacity:0.9,
        borderWidth:5, 
        borderColor:"pink", 
    },
});

//make this component available to the app
