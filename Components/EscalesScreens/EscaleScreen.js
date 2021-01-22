//import liraries
import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../Store/actions/actionsTypes'
import * as actionsFunction  from '../../Store/actions/actions'
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, StatusBar, Image, SafeAreaView} from 'react-native';
import data from '../../database/airportBase'
import { AntDesign } from '@expo/vector-icons';

// create a component
class EscaleScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            numEscale:1,
            escale: {
                numero:"",
                id:"",
                lieu:"",
                dateTime:"",
            },
            escales: {}
        }
    }
    toggleBack() {
        this.props._toggleStopOverNumero(numStopOver-1) 
        this.props.navigation.goBack()
    }
  
   
    
   
    componentDidMount() {
        if (this.props.info_escales.nb_stopOver>=1) {
            
            this.setState({escales:this.props.info_escales.stopover_data})
     
        }
       
        
   }
   renderItems({item}) {
    return (
        <View style={{width:"80%", alignSelf:"center", borderBottomWidth:5}} onPress= {() => this.props.navigation.navigate('ChatScreen', {person: item.user})}>
            <View style={{flexDirection:"column",alignItems:"center",flex:1}}>
               <View style={{padding:15, borderRadius:15, backgroundColor:"purple"}}>
                   <Text style={{fontSize: 20, color:"#fff"}}>{"Escale"}{item.numero}</Text>
                </View> 

                <View style={styles.nb_stopover_content}>
                            <TextInput 
                            style={[styles.input,{}]} 
                            placeholder="Le lieu d'escale"
                            autoCapitalize="none"
                            onChangeText={lieu => this.setState({escales:{...this.state.escale, lieu}})}                                 
                            value={this.state.escale.lieu}
                            placeholderTextColor="#846D84"

                            ></TextInput>
              
                </View>
                <View style={styles.nb_stopover_content}>
                            <TextInput 
                            style={[styles.input,{}]} 
                            placeholder="Début de l'escale"
                            autoCapitalize="none"
                            onChangeText={debut_escale => this.setState({escale:{...this.state.escale, debut_escale}})}                                 
                            value={this.state.escale.debut_escale}
                            placeholderTextColor="#846D84"

                            ></TextInput>
                        </View>
                        <View style={styles.nb_stopover_content}>
                            <TextInput 
                            style={[styles.input,{}]} 
                            placeholder="Fin de l'escale"
                            autoCapitalize="none"
                            placeholderTextColor="#846D84"
                            onChangeText={fin_escale => this.setState({escale:{...this.state.escale, fin_escale}})}                                 
                            value={this.state.escale.fin_escale}
                            ></TextInput>
                                   
                        </View>
               
                
            </View>
        </View>
    )
}
  
    render() {
        console.log("props", this.props)
        console.log("state", this.state)

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle='light-content0' backgroundColor="purple"/>
                <View style={{height:60, backgroundColor:"purple", justifyContent:"center", alignItems:"flex-start"}}>
                    <TouchableOpacity style={{justifyContent:"center", alignItems:"center", marginLeft:15}} onPress={()=>this.props.navigation.goBack()}>
                        <AntDesign name={"arrowleft"} size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                    <View style={{flex:7/10, justifyContent:"center",}}>
                    <View style={{ flexDirection:"row",
                        height:70,
                        width:"90%", 
                        backgroundColor:"#D6DBDC",
                        alignSelf:"center", 
                        borderRadius:15,
                        alignItems:"center",
                        justifyContent:"center"
                        }}>
                           <Text style={[styles.input,{alignSelf:"center", fontSize:30}]}>{"Escale 01"}</Text>
                    </View>
              
                    <View style={styles.nb_stopover_content}>
                            <TextInput 
                            style={[styles.input,{}]} 
                            placeholder="Le lieu d'escale"
                            autoCapitalize="none"
                            onChangeText={lieu => this.setState({escales:{...this.state.escale, lieu}})}                                 
                            value={this.state.escale.lieu}
                            placeholderTextColor="#846D84"

                            ></TextInput>
              
                </View>
                <View style={styles.nb_stopover_content}>
                            <TextInput 
                            style={[styles.input,{}]} 
                            placeholder="Début de l'escale"
                            autoCapitalize="none"
                            onChangeText={debut_escale => this.setState({escale:{...this.state.escale, debut_escale}})}                                 
                            value={this.state.escale.debut_escale}
                            placeholderTextColor="#846D84"

                            ></TextInput>
                        </View>
                        <View style={styles.nb_stopover_content}>
                            <TextInput 
                            style={[styles.input,{}]} 
                            placeholder="Fin de l'escale"
                            autoCapitalize="none"
                            placeholderTextColor="#846D84"
                            onChangeText={fin_escale => this.setState({escale:{...this.state.escale, fin_escale}})}                                 
                            value={this.state.escale.fin_escale}
                            ></TextInput>
                                   
                        </View>
                    </View>
                  
                    <View style={styles.logo_container}>
                        <Text style={{fontWeight:"bold", fontSize:35, marginLeft:17, 
                        marginVertical:30, color:"purple", alignSelf:"center"}}>ShareYourTrip</Text>
                    </View>  
                    <View style={styles.down_button}>
                            <TouchableOpacity style={styles.button_next} onPress={()=>{this.props.navigation.navigate("EscaleScreen")}}>
                                <AntDesign name="arrowright" size={55} color="white" />
                            </TouchableOpacity>
                        </View>
                </View> 

               
                            
            </SafeAreaView>
        );
    }
}


const mapStateToProps = (state) => {
    return {info_escales: state.rootReducer.SearchStopOverRed,
        state: state}
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        _toggleAddStopOver: escale => dispatch(actionsFunction._toggleAddStopOver(escale)),
        _toggleStopOverNumero: numero => dispatch(actionsFunction._toggleStopOverNumero(numero)),
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(EscaleScreen)

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text_container: {
        flex:3/10,
        justifyContent:"flex-end",
        alignItems:"center",
       },
 
    logo_container: {
        flex:1.5/10,
        justifyContent:"center",
        alignItems:"center",
    },
  
    input: {
        borderRadius:15,
        height:50,
        fontSize:20,
        alignSelf:"center",
        color: "#846D84",
        marginLeft:10,
        fontWeight:"bold"
    },
  
    button_next: {

        backgroundColor:"purple",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:70,
        marginRight:25

    },
    button_back: {
        height:60,
        width:60,
        backgroundColor:"#846D84",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:60


    },
    down_button: {
        alignItems:"flex-end",
        justifyContent:"center",
        flex:1.5/10,
    },
    nb_stopover_content :{
        flexDirection:"row",
        height:70,
        width:"90%", 
        backgroundColor:"#D6DBDC",
        alignSelf:"center", 
        borderRadius:15,
        marginTop:15,
        alignItems:"center",
        },
        info_stopover: 
        {
        height:60,
        width:"90%", 
        backgroundColor:"#fff",
        alignSelf:"center", 
        borderRadius:15,
        marginTop:20,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 2, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 20, // Android,
        alignItems:"center",

        },
        stopover_info_content: {
            flex:6/10,
            justifyContent:"center",
        }
    
    
});

//make this component available to the app
