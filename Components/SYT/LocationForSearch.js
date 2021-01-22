//import liraries
import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../Store/actions/actionsTypes'
import * as actionsFunction  from '../../Store/actions/actions'
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, StatusBar, Image} from 'react-native';
import data from '../../database/airportBase'
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
// create a component
class LocationForSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            location: "",
            fullDataAirport:[],
            airports:[]
        }
        this.typeLocation=this.props.route.params.typeLocation
    }
    _toggleLocation(item) {        
       if (this.typeLocation===1) {
           this.props._toggleLocationDeparture(item)
        }
        if (this.typeLocation===2) {
            this.props._toggleLocationArrival(item)
        }
    }
    handleSearch(text) {
        const formattedQuery = text.toLowerCase();
        this.setState({ 
            fullDataAirport: this.state.airports.filter(i => i.name.toLowerCase().includes(text.toLowerCase())),
        })
        
    }
    _renderItem({item}) {
        return (
            <TouchableOpacity style={styles.feedItem} onPress={()=>{this.props.navigation.navigate("TAB", {screen:"Rechercher"});this._toggleLocation(item)}}>
                <View style={{width:"100%", height:50, flexDirection:"row"}}>
                    <View style ={{flex:2/10,justifyContent:"center", alignContent:"center"}}>
                        <MaterialIcons name="local-airport" size={35} color="black" />
                    </View>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", flex:8/10}}>
                        <View>
                            <Text style={[styles.input, {fontSize:15}]}>{item.code}{" | "}{item.name}{" | "}{item.city}{" | "}{item.country}  </Text>
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
            <View style={styles.container}>
                <StatusBar barStyle='light-content0' backgroundColor="purple"/>
                <View style={{height:40, backgroundColor:"purple"}}></View>
                <View style={styles.header_modal}>
                    <TouchableOpacity style={{ height:30, width:30, justifyContent:"center", alignItems:"flex-start"}} onPress={()=> this.props.navigation.goBack()}>
                        <Ionicons name="ios-arrow-back" size={40} color="purple" />
                    </TouchableOpacity>
                        <TextInput 
                                autoFocus={true}
                                style={styles.input_Search} 
                                autoCapitalize="none"
                                placeholder=" Aéroport Orly ou Charles d...  "
                                onChangeText={text =>this.handleSearch(text)} 
                                >
                        </TextInput>
                    </View>
                    <FlatList 
                        style={styles.feed}
                        data= {this.state.fullDataAirport}
                        renderItem={(item)=>this._renderItem(item)}
                        keyExtractor= {(item )=> item.code}/>            
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    return {state}
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      _toggleLocationDeparture: item => dispatch(actionsFunction._toggleLocationDeparture(item)),
      _toggleLocationArrival: item => dispatch(actionsFunction._toggleLocationArrival(item)),
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(LocationForSearch)

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    input_Search: {
        height:60,
        width:"85%",
        backgroundColor:"#E1E2E6",
        borderRadius:25,
        padding:10,
    
    },
    feedItem: {
        backgroundColor:"#fff",
        borderRadius:10,
        padding:9, 
        flexDirection:"row",
        marginVertical:10
    },
    header_modal: {
        height:100,
        width:"100%",
        borderBottomWidth:3,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderBottomColor:"#fafafa",
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"center",
        alignSelf:"center"
    },
    feedItem: {
        backgroundColor:"grey",
        borderRadius:30,
        padding:15, 
        flexDirection:"row",
        marginBottom:10,
        marginHorizontal:5
        
    },

});

//make this component available to the app
