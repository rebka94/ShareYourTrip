//import liraries
import React, { Component, } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PixelRatio, Image, Alert, SafeAreaView, Modal, StatusBar, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fire from "../Fire/Fire"
import * as functions from "../helpers/getUserFromAsync"
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
// create a component
class ProfileScreen extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          user: {

          },
          infoUser: {
            nbFriends:""
          },
          modalVisible: false
        }

    }
    
    
     componentDidMount= ()=> {
         if (this.props.user!=undefined) {
            this.setState({user: this.props.user})
         } else {
            this.getData()
         } 
    }
    getData = async() => {
        let data = await functions.getProfile()
        this.setState({user:data})
    }
    handleLogOut() {
        Fire.shared.signOut()
        this.setState({user:{}, modalVisible:false})
    }
    _showAlert() {// Affichage d'un message d'alerte avant la mise à zéro du score (et donc de la state)
    Alert.alert(
        'Deconnexion',
        'Êtes-vous sûr(e) de vouloir se deconnecter ?.',
        [
          {text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Oui !', onPress: () => this.handleLogOut()},
        ],
        { cancelable: false }
    )
}
strUcFirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}
   
    render() {  
        console.log("la state du profle\n", this.state) 
        return (
       
                <SafeAreaView style={styles.container}>
                    <StatusBar barStyle="dark-content" backgroundColor="purple"/>
                <View style={[styles.up_Screen, {}]}>
                      {//this.props.user!=undefined&&
                        <TouchableOpacity style={{right:15, top:5, position:"absolute"}} onPress={()=>this.props.navigation.navigate("Settings")}>
                        <Ionicons 
                            name= "ios-settings"
                            size={50}
                            color={"#4F566D"}
                        />
                    </TouchableOpacity>
                }
                {
                    //this.props.user==undefined&&
                    <TouchableOpacity style={{left:5, top:0, position:"absolute"}} onPress={()=>this.props.navigation.goBack()}>
                        <MaterialIcons name="keyboard-arrow-down" size={50} color="grey" />
                    </TouchableOpacity>
                }
                    <View style={{justifyContent:"center", alignItems:"center", marginTop:30}}>
                        <View style={styles.avatar_container}>
                            <Image style={styles.avatar} source={this.state.user.avatar? {uri: this.state.user.avatar}: require('../assets/tempAvatar.png')}/>
                        </View>
                        <View style={{flexDirection:"row", marginBottom:10}}>
                            <Text style={styles.name}>{this.state.user.firstName+" "}</Text> 
                            <Text style={styles.name}>{this.state.user.name+", "}</Text>
                            <Text style={styles.name}>{this.state.user.age}</Text>
                        </View>
                        <View style={{flexDirection:"row",}}>
                            <TouchableOpacity style={[styles.button, { backgroundColor:"purple",}]}>
                                <AntDesign name="adduser" size={25} color="#fff" style={{marginRight:5}} />
                                <Text style={{fontSize:18, fontWeight:"bold", color:"#fff"}}>{"Ajouter"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, {paddingHorizontal:10, marginLeft:5}]}>
                                <AntDesign name="message1" size={25} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, {paddingHorizontal:10, marginLeft:5}]}>
                                <Entypo name="dots-three-vertical" size={25} color="#fff" />   
                            </TouchableOpacity>
                        </View>
                        <View style={styles.data_stat}>
                        <View style={styles.item}>
                            <Text style={styles.statAmount}>10</Text>
                            <Text style={styles.statTitle}>SYT</Text> 
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.statAmount}>20</Text>
                            <Text style={styles.statTitle}>Posts</Text> 
                        </View>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate("Friends")} style={styles.item}>
                            <Text style={styles.statAmount}>{this.state.infoUser.nbFriends}</Text>
                            <Text style={styles.statTitle}>Amis</Text> 
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
                   
                    <TouchableOpacity style={{alignItems:"center", paddingVertical:10, paddingHorizontal:30, backgroundColor:"red", justifyContent:"center", alignSelf:"center", borderRadius:20, position:"absolute", bottom:50}} onPress={()=>this._showAlert()}>
                        <Text style={{fontSize:25, fontWeight:"bold", color:"white"}}>Déconnexion</Text>
                    </TouchableOpacity>
            </SafeAreaView>
        );

    }

};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    button: {
        paddingHorizontal:30,
        paddingVertical:10,
        flexDirection:"row",
        justifyContent:"center", alignItems:"center",
        borderRadius:10,
        backgroundColor:"#CDB7C6"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position:"absolute",
        backgroundColor:"#E5E7E9"
      },
  
    text_item: {
        fontSize:15,
        fontWeight:"bold"
    },
    contain_item: {
        width:350, 
        borderRadius:15, 
        backgroundColor:"#fff",
    },
  
    items: {
        height:50,
        borderBottomWidth:1,
        borderColor:"#E5E7E9",
        flexDirection:"row",
        alignItems:"center",
        
    },
    avatar_container: {
        shadowColor:"#151734",
        shadowRadius:15,
        shadowOpacity:0.3,

    },
    avatar: {
        height:136,
        width:136,
        borderRadius:500 / PixelRatio.get(),
    
    },
    name: {
        marginTop:32,
        fontSize:27,
        fontWeight:"bold"
    },
    data_stat: {
        flexDirection:"row",
        justifyContent:"space-between",
        margin:32
    },
    item: {
        alignItems:"center",
        flex:1,
    },
    statTitle: {
        color:"#C3C5CD",
        fontWeight:"600",
        fontSize:14,
        marginTop: 4
    },
    statAmount: {
        color:"#4F566D",
        fontWeight:"600",
        fontSize:20,

    }
});

//make this component available to the app
export default ProfileScreen;
