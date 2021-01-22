//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// create a component
class Syt extends React.Component{
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.circle}></View>
               <View style={styles.header}>
                   <Text style={{fontSize:30, fontWeight:"bold", position:"absolute", left:-170}}>Ajout d'un SYT</Text>
               </View>
               <View style={styles.down_container}>
                   <Text style={styles.text}>{"Partager votre voyage avec d'autres\nvoyageurs comme vous. "}</Text>
                   <Text style={styles.text}>{"Le principe de cette fonctionnalité c'est de pourvoir partager\nPar exemple: les escales avec d'autres personne ayant\nles mêmes horaires que les votres\npar consequence finit les escales en solo "}</Text>
                   <Text style={{fontSize:20, fontWeight:"bold", marginTop:40, alignSelf:"center"}}>{"Voulez-vous continuer la procédure"}</Text> 
                   <Text style={{fontSize:20, fontWeight:"bold", alignSelf:"center"}}>{"d'ajouts ?"}</Text> 

                   <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Syt2")}>
                        <Text style={{fontSize:20, fontWeight:"bold", alignSelf:"center"}}>Suivant</Text>
                </TouchableOpacity>
               </View>
               
            </View>
        );

    }

};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#10BFC5"
    },
    circle: {
        position:'absolute',
        width:500,
        height:500,
        backgroundColor:"white",
        borderRadius:500 /2,
        left:-100,
        top:-20

    },
    text: {
        marginTop:60,
        fontSize:20,
        marginHorizontal:10,
        alignSelf:'flex-start'
    },
    header: {
        flex:2,
        justifyContent:"center",
    },
    down_container: {
        flex:8,
    },
    button: {
        justifyContent:"center",
        alignItems:"center",
        height:40,
        width:200, 
        backgroundColor:"yellow",
        borderRadius:20,
        alignSelf:"center",
        marginTop:100
        
        
    }
});

//make this component available to the app
export default Syt;
