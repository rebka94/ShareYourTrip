//import liraries
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator, SafeAreaView, StatusBar} from 'react-native';
import Fire from "../../Fire/Fire"
import { MaterialIcons } from '@expo/vector-icons';

class ChatRoom extends React.Component{
    constructor(props) {
        super(props)
        const uid = Fire.shared.uid
        this.state = {
            ListMessages: [],
            isLoading: false, 
            profilesMessages: []
        }
    }
   async componentDidMount() {//faut réfléchir ça
    try {
        this.setState({isLoading:true})
  
         this.setState({isLoading:false})
    } catch (error) {
        alert(error)
    }
    }
    componentWillUnmount() {
        this.unsubscribeConversations();
        this.setState({ListMessages:[], profilesMessages:[]})
    }
    
    _render() {

        if (this.state.ListMessages.length==0) {
            return (
                /*<View style={{justifyContent:"center", alignItems:"center", flex:1}}>
                    <MaterialIcons name="message" size={100} color="purple" />                    
                    <Text style={{fontSize:20, fontWeight:"bold"}}>
                        Vous n'avez aucun méssages
                    </Text>
                </View>*/
                <View style={{position:"relative", alignSelf:"flex-start", top:"50%"}}>
                        <ActivityIndicator size="large" color="purple"></ActivityIndicator>
                    <Text style={{fontSize:17, fontWeight:"bold", marginTop:15, color:"purple"}}>{"Chargement des messages..."}</Text>
                </View>
                
            )
        } else  {
            return (
                 <FlatList 
                    style={styles.feed}
                    data= {this.state.ListMessages}
                    renderItem={(item) => this.renderItems(item)}
                    keyExtractor= {item => item.id}
                />  
            )
            
            
        }

    }
    convertTime= (time) => {
        let d = new Date(time)
        let c = new Date()
        let result = (d.getHours() < 10?'0':'') + d.getHours()+':';
        result += (d.getMinutes() < 10?'0': '') + d.getMinutes();
        if (c.getDay() !== d.getDay()) {
            result = d.getDay() + ' '+ d.getMonth() +' '+ result
        }

        return result

    }




 
    renderItems({item}) {
        return (
            <TouchableOpacity style={[styles.chatItem]} onPress= {() => this.props.navigation.navigate('ChatScreen', {person: item.user})}>
                <Image source={{uri: item.user.avatar}} style={styles.avatar}/>
                <View style={{flexDirection:"row", justifyContent:"flex-end",flex:1}}>
                   <View style={{flex:8/10,}}>
                        <Text style={{fontSize:17, fontWeight:"bold"}}>{item.user.name}</Text>
                        <Text style={{fontSize:13, marginRight:10, fontWeight:!item.isRead?"500":"bold"}}>{item.text.length>20?item.text.substring(0, 30)+" ...":item.text}</Text>
                    </View>
                    <View style={{justifyContent:"flex-end", flex:2/10 }}>
                       <Text style={{fontSize:14, fontWeight:!item.isRead?"500":"bold"}}>{this.convertTime(item.createdAt)}</Text>
                    </View>
                    
                </View>
            </TouchableOpacity>
        )
    }
    displayLoad() {
        if (this.state.isLoading==true) {
            return  (<View style={{position:"absolute", alignSelf:"center", top:"50%"}}>
                        <ActivityIndicator size="large" color="purple"></ActivityIndicator>
                    <Text style={{fontSize:17, fontWeight:"bold", marginTop:15, color:"purple"}}>{"Chargement des messages..."}</Text>
                </View>)
        }
            
    }

    render() {
        console.log("state",this.state.ListMessages)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="purple"/>
                <View style={{flexDirection:"row", flex:1}}>
                    {this.displayLoad()}
                    {this._render()}
                </View>
               
            </SafeAreaView>
        )
    }
}
    
   

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#fff",
        justifyContent:"center", 
        alignItems:"center"
    },
    feed: {
        flex:1,
        marginTop:5
    },
    avatar: {
        width: 60,
        height:60,
        borderRadius:60/2,
        marginRight: 20,
        marginLeft:10,
        borderWidth:2,
        borderColor:"purple"
    }, 
    chatItem: {
        borderRadius:20,
        borderRadius:15,
        borderRightColor:"purple",
        marginHorizontal:5,
        flexDirection:"row",
        marginVertical:2,
        height:80,
        alignItems:"center",
        borderBottomWidth:2,
        borderBottomColor:"purple"
    }
});

//make this component available to the app
const mapStateToProps = (state) => {
    return {
        location: state.SearchLocationRed,
        stopover: state.SearchStopOverRed
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        _update_messages: (messages) => dispatch(actionsFunction._update_messages(messages)),
        _reset_message: () => dispatch(actionsFunction._reset_message()),

    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)
