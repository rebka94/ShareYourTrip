//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as func from "../../helpers/functionsHelp"
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// create a component
class EscaleForm extends React.Component {
    constructor() {
       super()
       this.state = {
            nbCorrespondance:2,
            index:1,
            correspondances: [],
            lieuCorrespondance:"",
            debutCorrespondance:"", 
            finCorrespondance:""
           
       }
        
    }

    renderItem(index) {
        return (
            <View style={{justifyContent:"center", width:"85%", alignItems:"center", alignSelf:"center"}}>
                <Text style={styles.escale_text}>{"Escale "}{this.state.index+1}</Text>
                <View style={ styles.input_contain}>
                    <View style={styles.icon_container}>
                        <MaterialIcons name="place" size={30} color="purple" />
                    </View>
                    <View style={styles.text_input_container}>
                        <TextInput
                            placeholder="Lieu de l'escale"
                            style={{ paddingHorizontal: 10, fontSize: 17, color: "#ccccef" }}
                            /* value={this.state.correspondances[index].lieu}*/
                        />
                    </View>
                </View>
                <View style={ styles.input_contain}>
                    <View style={styles.icon_container}>
                        <Ionicons name="ios-time" size={30} color="purple"/>
                    </View>
                    <View style={styles.text_input_container}>
                        <TextInput
                            placeholder="Début de l'escale"
                            style={{ paddingHorizontal: 10, fontSize: 17, color: "#ccccef" }}
                            /* value={this.state.correspondances[index].lieu}*/
                        />
                    </View>
                </View>
                <View style={ styles.input_contain}>
                    <View style={styles.icon_container}>
                        <Ionicons name="ios-time" size={30} color="purple"/>
                    </View>
                    <View style={styles.text_input_container}>
                        <TextInput
                            placeholder="Fin de l'escale"
                            style={{ paddingHorizontal: 10, fontSize: 17, color: "#ccccef" }}
                            /* value={this.state.correspondances[index].lieu}*/
                        />
                    </View>
                </View>
                <View style={{flexDirection:"row", width:"100%"}}>
                    <View style={[styles.button_container]}>
                        {this.state.index!=0 && <TouchableOpacity style={[styles.button, {backgroundColor:"#ccccef",}]}>
                            <Text style={styles.text_button}>{"Précedent"}</Text>
                        </TouchableOpacity>}
                    </View>
                    <View style={styles.button_container}>
                        {this.state.index!=this.state.nbCorrespondance&& <TouchableOpacity style={[styles.button, {backgroundColor:"purple",}]}>
                            <Text style={styles.text_button}>{"Suivant"}</Text>
                        </TouchableOpacity>}
                    </View>
                </View>
               
            </View>
        )
    }
    render() {
        return (
                this.renderItem(this.state.index)
            
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    input_contain: {
              flexDirection: "row",
              backgroundColor: "#F2F3F4",
              borderRadius: 15,
              alignItems: "center",
              marginBottom: 20,
              width:"90%"

    },
    escale_text: {
        fontWeight:"bold",
        fontSize:30,
        marginVertical:10,
        alignSelf:"center",
        color:"#846D84",
    },
    text_input_container: {
        flex:8/10,
         paddingVertical: 20
    },
    icon_container: {
        flex:2/10,
        justifyContent:"center",
        alignItems:"center"
    },
    button_container: {
        flex:1/2,
        justifyContent:"center",
        alignItems:"center",
        
    },
    button: {
        justifyContent:"center",
        alignItems:"center",
        borderRadius:17,
        width:100,
        paddingVertical:13
    },
    text_button: {
        fontSize:15,
        fontWeight:"bold",
        marginHorizontal:10,
        color:'#fff'
    }

    

});

//make this component available to the app
export default EscaleForm;
