//import liraries
import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../Store/actions/actionsTypes'
import * as actionsFunction  from '../../Store/actions/actions'
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, StatusBar, Image, SafeAreaView} from 'react-native';
import data from '../../database/airportBase'
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

/**
 * Classe qui où on peut mettre le l'arrivé du voyage 
 */
class SearchSytFrom extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            location: "",
            fullDataAirport:[],
            airports:[]
        }
    }
    ToggleItem(item) {
        this.props._toggleLocationArrival(item)
        this.props.navigation.navigate("DepartureDate")
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
    _renderItem({item}) {
        return (
            <TouchableOpacity style={styles.feedItem} onPress={()=>{this.ToggleItem(item)}}>
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
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle='light-content0' backgroundColor="purple"/>
                <View style={{height:40, backgroundColor:"purple", justifyContent:"center", alignItems:"flex-start"}}>
                    <TouchableOpacity style={{justifyContent:"center", alignItems:"center", marginLeft:15}} onPress={()=>{this.props.navigation.goBack()}}>
                        <AntDesign name={"arrowleft"} size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{flex:1, backgroundColor:"white"}}>
                    <Image 
                        style={styles.image} 
                        source={require('../../assets/images/destination.png')}
                        />
                <Text style={{fontWeight:"bold", fontSize:35, marginVertical:25, color:"#846D84", marginLeft:15}}>
                    {"Quel est votre destination ?"}
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
                <View style={{justifyContent:"center", alignItems:"flex-end", backgroundColor:"white"}}>
                    <TouchableOpacity style={{justifyContent:"center", alignItems:"center", 
                    marginRight:15,backgroundColor:"purple", 
                    height:55, width:55, 
                    borderRadius:55, marginVertical:15}} >
                        <AntDesign name="arrowright" size={45} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
                
        );
    }
}


const mapStateToProps = (state) => {
    return {state}
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      _toggleLocationArrival: item => dispatch(actionsFunction._toggleLocationArrival(item)),
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(SearchSytFrom)

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'purple',
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
        flexDirection:"row",
    },
    feedItem: {
        backgroundColor:"white",
        borderRadius:30,
        padding:15, 
        flexDirection:"row",
        marginBottom:10,
        marginHorizontal:5,
        borderBottomWidth:2,
        borderBottomColor:"purple"
        
    },

});

//make this component available to the app
