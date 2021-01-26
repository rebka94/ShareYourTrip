//import liraries
import {Voyage} from "../../classes/Voyage"
import {Escale} from "../../classes/Escale"

import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../Store/actions/actionsTypes'
import * as actionsFunction  from '../../Store/actions/actions'
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, StatusBar, Image, SafeAreaView, ScrollView} from 'react-native';
import data from '../../database/airportBase'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import EscaleForm from "./EscaleForm";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Fire from "../../Fire/Fire";
// create a component
class EscaleNumbereScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            nbEscales:0
        }
    }
   
   
    
   
    componentDidMount() {
        const refFriends = Fire.shared.database.ref("users/"+Fire.shared.uid).child("dynamicInfo").child("friends").on("value", (snapshot) => {
            console.log("allo",snapshot.val())
        })
        this.setState({nbEscales:this.props.nb_stopOver})
     
   }
  
    render() {
        console.log("ici screen nb escale ")
        console.log(this.props)
        return (
            <SafeAreaView style={[styles.container]}>
                <StatusBar barStyle='light-content0' backgroundColor="purple"/>
                <View style={{height:60, backgroundColor:"purple", justifyContent:"center", alignItems:"flex-start"}}>
                    <TouchableOpacity style={{justifyContent:"center", alignItems:"center", marginLeft:15}} onPress={()=>{this.props.navigation.goBack()}}>
                        <AntDesign name={"arrowleft"} size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{flex:9/10}}>
                <ScrollView style={{backgroundColor:"#fff"}}>
                    <View style={[styles.text_container]}>
                        <Text style={{fontWeight:"bold", fontSize:32, color:"#846D84", marginLeft:15, alignSelf:"flex-start"}}>
                            {"Voulez-vous ajouter"}
                        </Text>
                        <Text style={{fontWeight:"bold", fontSize:32, color:"#846D84", marginLeft:15, alignSelf:"flex-start"}}>
                            {"des escales ?"}
                        </Text>
                    </View>
                    <View style={[styles.compteur_container,]}>
                        <TouchableOpacity style={styles.button_compteur} onPress={()=>{this.incrementer()}}>
                            <AntDesign name="pluscircle" size={100} color="purple" />
                        </TouchableOpacity>
                        <View style={{height:50,width:50, justifyContent:"center", alignItems:"center"}}>
                            <Text style={{fontSize:25, fontWeight:"bold", color:"#846D84"}}>{this.state.nbEscales}</Text>
                        </View>
                        {this.state.nbEscales==0 &&
                        ( <View style={[styles.button_compteur,{opacity:0.5}]}>
                            <AntDesign name="minuscircle" size={100} color="#846D84" />
                            </View>)}
                        {this.showButton()}
                    </View>

                </ScrollView>

                </View>
                <View style={{flex:1/10, backgroundColor:"#fff"}}>
                    <TouchableOpacity style={styles.button_next} onPress={()=>this.handleNext()}>
                        {this.dispayButton()}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
    showButton() {
        if (this.state.nbEscales>0) {
            return (
                <TouchableOpacity style={styles.button_compteur} onPress={()=>{this.decrementer()}}>
                            <AntDesign name="minuscircle" size={100} color="#846D84" />
                </TouchableOpacity>
            )
        } 
    }
    incrementer() {
        this.setState({nbEscales:this.state.nbEscales+1})

    }
    decrementer() {
        this.setState({nbEscales:this.state.nbEscales-1})
    }
      
    handleNext() {
        if (this.state.nbEscales>=1) {

            
           // this.props._toggleStopOverNumbre(this.state.nbEscales)
           // this.props.navigation.navigate("EscaleScreen")

        }else  {
            let departure = this.props.state.SearchLocationRed.departure
            let arrival = this.props.state.SearchLocationRed.arrival
            let departureDateTime = this.props.state.DateTimeReducer.departureDateTime
            let arrivalDateTime = this.props.state.DateTimeReducer.arrivalDateTime
            let voyage = new Voyage(departure, arrival, departureDateTime, arrivalDateTime, this.state.nbEscales);
            //var voyage = new Voyage(departure, arrival, departureDateTime, arrivalDateTime, this.state.nbEscales)
            this.props._toggleAddSyt(voyage)
            this.props.navigation.navigate("TAB")
        }
        
    }
    dispayButton() {
        if (this.state.nbEscales>0) {
            return <Text style={styles.text_button}>{"Suivant"}</Text>
        } else {
            return <FontAwesome name="search" size={40} color="#fff" />
        }
    }
  
}


const mapStateToProps = (state) => {
    return {nb_stopOver: state.SearchStopOverRed.nb_stopOver,
            state: state}
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        _toggleStopOverNumbre: nb => dispatch(actionsFunction._toggleStopOverNumbre(nb)),
        _toggleAddStopOver: escale => dispatch(actionsFunction._toggleAddStopOver(escale)),
        _toggleAddSyt: s => dispatch(actionsFunction._toggleAddSyt(s)),
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(EscaleNumbereScreen)

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'purple',
    },
    text_container: {
        justifyContent:"flex-end",
        alignItems:"center",
        marginTop:45
       },
       text_button: {
            fontSize:25,
            fontWeight:"bold",
            color:"#fff"
       },
    compteur_container: {
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        marginTop:50

    }, 
    logo_container: {
        justifyContent:"flex-start",
        alignItems:"center"
    },
    button_compteur: {
        height:100,
        width:100, 
        borderRadius:100, 
        justifyContent:"center", 
        alignItems:"center",

    },
    button_next: {
        height:"100%",
        width:"40%",
        alignSelf:"flex-end",
        backgroundColor:"purple",
        justifyContent:"center",
        alignItems:"center",
        borderTopLeftRadius:70,

    },
    
    
});

//make this component available to the app
