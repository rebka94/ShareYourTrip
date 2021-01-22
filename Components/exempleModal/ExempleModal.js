//import liraries
import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../Store/actions/actionsTypes'
import * as actionsFunction  from '../../Store/actions/actions'
import { View, Modal, TouchableHighlight, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, StatusBar, Image, SafeAreaView, Keyboard, KeyboardAvoidingView} from 'react-native';
import data from '../../database/airportBase'
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Value } from 'react-native-reanimated';

// create a component
class CorrespondanceCustom extends React.Component {
    constructor(props){
        super(props)
        this.type=this.props.type
        this.state= {
            fullDataAirport:[],
            text:""
        }
    }
  
    /**
     * fonction qui valide les données et les envoies à redux 
     */
   
    toggleItem=(item)=> {
        if (this.type=="departure" ) {
            this.props._toggleLocationDeparture(item)
        }
        if (this.type=="arrival" ) {
            this.props._toggleLocationArrival(item)
        }
        this.props._toggleSetLocationModal(false)
    }
    handleSearch(text) {
        this.setState({text:text})
        const formattedQuery = this.state.text.toLowerCase();
        this.setState({ 
            fullDataAirport: data.filter(i => i.name.toLowerCase().includes(this.state.text.toLowerCase())),
        })
        if (text.length==0) {
            this.setState({fullDataAirport:[]})
        }
    }
    handleDeleteText() {
        this.setState({text:"", fullDataAirport:[]})
    }
    _renderItem({item}) {
        return (
            <TouchableOpacity style={styles.feedItem} onPress={()=>this.toggleItem(item)}>
                <View style={{width:"100%", flexDirection:"row",}}>
                    <View style ={styles.item_logo_container}>
                        <MaterialIcons name="local-airport" size={35} color="purple" />
                    </View>
                    <View style={{ justifyContent:"center", alignItems:"flex-start", flex:8/10}}>
                       
                        <Text style={styles.item_text}>
                            {"Aéroport de "}{item.name}
                        </Text>
                        <Text style={styles.item_text}>
                            {"("}{item.code}{")"}
                        </Text>
                        <Text style={{fontSize:14, fontWeight:"900", color:"grey"}}>
                            {item.city}{", "}{item.country}
                        </Text>
                    </View>
                    <View style ={[styles.item_logo_container, {alignItems:"center", flex:1/10}]}>
                        <MaterialIcons name="keyboard-arrow-right" size={30} color="purple" />
                    </View> 
                </View>
            </TouchableOpacity>
        )
    }
    
    
    
    render() {
        console.log("custom",this.state)
        return (
            <Modal
            animationType="slide"
            transparent={true}
            visible={this.props.correspondanceModalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
              <SafeAreaView style={styles.centeredView}>
                <View style={{flex:1, width:"100%", 
                    backgroundColor:"#fff", borderTopRightRadius:50,
                    borderTopLeftRadius:50
                }}>
            
                    <View style={{flex:1}}>
                
                     
                    

                        <TouchableHighlight
                        underlayColor={'transparent'}
                        style={{position:"absolute", top:15, left:15, }}
                        onPress={() => {
                        this.props._toggleSetLocationModal(false)
                        }}
                        >
                            <Entypo name="cross" size={40} color="purple" />
                        </TouchableHighlight>          
                    </View>
                </View>
            </SafeAreaView>
          </Modal>
            
        );
    }
}
const mapStateToProps = (state) => {
    return {
        correspondanceModalVisible: state.ModalVisibleReducer.correspondanceModalVisible,

    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        _toggleSetCorrespondanceModal: visible => dispatch(actionsFunction._toggleSetCorrespondanceModal(visible)),


    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(CorrespondanceCustom)
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    item_logo_container: {
        flex:2/10,
        justifyContent:"center",
        alignSelf:"center",
    },
    item_text: {
        fontSize:17, 
        color:"#846D84", 
        fontWeight:"bold"
    },
        image: {
            position:"absolute",
            bottom:70,
            left:80,
            height:300,
            width:350
            },
        delete_button: {
            flex:1.5/10, 
            justifyContent:"center",
            alignItems:"center"
        },
        input_Search: {
            height:60,
            width:"100%",
            backgroundColor:"#E1E2E6",
            borderRadius:20,
            paddingHorizontal:20,
            fontSize:20,
            fontWeight:"bold",
            color:"#846D84"
        },
        feedItem: {
            borderRadius:10,
            padding:5, 
            flexDirection:"row",
            marginVertical:10,
            width:"90%"
        },
        header_modal: {
            height:60,
            width:"90%",
            justifyContent:"center",
            alignContent:"center",
            flexDirection:"row",
            alignSelf:"center",
            backgroundColor:"#E1E2E6",
            borderRadius:20,
        },
        feedItem: {
            width:"90%",
            backgroundColor:"#fff",
            padding:15, 
            flexDirection:"row",
            marginBottom:10,
            marginHorizontal:5,
            borderBottomWidth:1,
            borderBottomColor:"purple",
            alignSelf:"center"
            
        },
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
          },
});

//make this component available to the app
