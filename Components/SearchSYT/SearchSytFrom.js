//import liraries
import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../Store/actions/actionsTypes'
import * as actionsFunction  from '../../Store/actions/actions'
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, StatusBar, Image, SafeAreaView, Keyboard, KeyboardAvoidingView} from 'react-native';
import data from '../../database/airportBase'
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

/**
 * Classe qui où on peut mettre le départ du voyage 
 */
class SearchSytFrom extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            fullDataAirport:[],
            airports:[]
        }
    }
    handleSearch(text) {
        const formattedQuery = text.toLowerCase();
        this.setState({ 
            fullDataAirport: this.state.airports.filter(i => i.name.toLowerCase().includes(text.toLowerCase())),
        })
        if (text.length==0) {
            this.setState({fullDataAirport:[]})
        }
       
        
    }
    ToggleItem(item) {
        this.props._toggleLocationDeparture(item)
        this.props.navigation.navigate("SearchSytTo")
    }
    _renderItem({item}) {
        return (
            <TouchableOpacity style={styles.feedItem} onPress={()=>this.ToggleItem(item)}>
                <View style={{width:"100%", height:50, flexDirection:"row",}}>
                    <View style ={{flex:2/10,justifyContent:"center", alignContent:"center"}}>
                        <MaterialIcons name="local-airport" size={35} color="purple" />
                    </View>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", flex:8/10}}>
                        <View>
                            <Text style={ {fontSize:18, color:"#846D84", fontWeight:"bold"}}>{item.code}{" | "}{item.name}{" | "}{item.city}{" | "}{item.country}  </Text>
                        </View> 
                    </View>   
                </View>
            </TouchableOpacity>
        )
    }
   
    componentDidMount() {
        this.setState({airports:data})
    }
  
    render() {
        return (
            <KeyboardAvoidingView
      style={styles.container}
    >
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle='light-content0' backgroundColor="purple"/>
                <Image 
                        style={styles.image} 
                        source={require('../../assets/images/destination.png')}
                        />
                <View style={{height:40, backgroundColor:"purple", justifyContent:"center", alignItems:"flex-start"}}>
                </View>
                
                
                <View style={{flex:1}}>
                
                <Text style={{fontWeight:"bold", fontSize:35, marginVertical:25, color:"#846D84", marginLeft:15}}>
                    {"D'où partez-vous ?"}
                </Text>
                <View style={styles.header_modal}>
                        <TextInput 
                                style={styles.input_Search} 
                                autoCapitalize="none"
                                placeholder=" Aéroport Orly ou Charles d...  "
                                autoFocus={true}
                                onChangeText={text =>this.handleSearch(text)
                                }                                
                                >
                        </TextInput>
                    </View>
                    <FlatList 
                        style={styles.feed}
                        data= {this.state.fullDataAirport}
                        renderItem={(item)=>this._renderItem(item)}
                        keyExtractor= {(item )=> item.code}/>            
                </View>
            </SafeAreaView>
            </KeyboardAvoidingView>
                
        );
    }
}


const mapStateToProps = (state) => {
    return {state}
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      _toggleLocationDeparture: item => dispatch(actionsFunction._toggleLocationDeparture(item)),
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(SearchSytFrom)

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        position:"absolute",
        bottom:70,
        left:80,
        height:300,
        width:350
        },
    input_Search: {
        height:60,
        width:"95%",
        backgroundColor:"#E1E2E6",
        borderRadius:25,
        padding:10,
        fontSize:20,
        fontWeight:"bold",
        color:"#846D84"
    },
    feedItem: {
        borderRadius:10,
        padding:9, 
        flexDirection:"row",
        marginVertical:10
    },
    header_modal: {
        height:100,
        width:"100%",
        justifyContent:"center",
        alignContent:"center",
        flexDirection:"row",
    },
    feedItem: {
        backgroundColor:"#fff",
        padding:15, 
        flexDirection:"row",
        marginBottom:10,
        marginHorizontal:5,
        borderBottomWidth:2,
        borderBottomColor:"purple"
        
    },

});

//make this component available to the app
