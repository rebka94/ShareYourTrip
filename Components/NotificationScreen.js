//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Platform, StatusBar} from 'react-native';
import Fire from '../Fire/Fire';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from 'react-native-reanimated';
import  Notifications from './notificationScreens/Notifications';
import ChatScreen from './ChatScreen';
import ChatRoom from './notificationScreens/ChatRoom';
import GestureRecognizer from 'react-native-swipe-gestures'


// create a component
class NotificationScreen extends React.Component{
    constructor(props) {
        super(props)
        this.state= {
            friendsRequests: [],
            index:'1'
        }
        this.unsubscribe=null
    }
   /* componentDidMount() {
        const uid = Fire.shared.uid
        this.unsubscribe = Fire.shared.fireStore.collection('notifications').doc(uid).collection('friends_request_receive').onSnapshot(
            snapshot => {
                if(snapshot.empty) {
                    console.log("acunce demande d'amis")
                    this.setState({friendsRequests:[]})
               
                } else {
                    let tab=[]
                    let docs = snapshot.docs.map((docSnapshot) => (
                        docSnapshot.data()
                    ))
                    this.setState({friendsRequests: docs})


                }
            }
        )

    }*/

    delete_request = (user)=> {
        Fire.shared.dellFriendRequest(user)
    }
    add_friend(user) {
        Fire.shared.addFriends(user)
        Fire.shared.dellFriendRequest(user)
    }
    renderItems({item}) {
        return (
            <TouchableOpacity style={styles.fR_item} >
                <Image source={{uri:item.avatar}} style={styles.avatar}/>
                <Text style={{fontSize:20, fontWeight:"900"}}>{item.userName}</Text>
                <View style={{flexDirection:"row", marginLeft:80}}>
                    <TouchableOpacity style={[styles.button_not,{backgroundColor:"#fff"}]} onPress = {()=>this.add_friend(item)}>
                        <Icon name="check" size={30} color="#900" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button_not,{backgroundColor:"red"}]} onPress= {() => this.delete_request(item)}>
                        <Icon name="check" size={30} color="#900" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }
   
    componentWillUnmount() {
       // this.unsubscribe()
    }
    onChangeIndex = (text) => {
        this.setState({index:text})
        }
    render() {
        //console.log(this.state.friendsRequests)
        return (
            <GestureRecognizer onSwipeLeft={() => {this.onChangeIndex('2') }}
                    onSwipeRight={() => { this.onChangeIndex('1') }}
                    config={{
                        velocityThreshold: 0.0,
                        directionalOffsetThreshold: 80,
                    }} style={{ flex: 1 }}
                >
                        <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="purple" />
                <View style={{height:40, backgroundColor:"purple"}}></View>

                <View style={styles.mainContainer}>
                    <TouchableOpacity style={[{width:"50%"}, this.state.index === '1' ? {borderBottomWidth:5, borderColor:"white"} : {borderBottomWidth:5, borderColor:"purple"}]}  onPress={() => { this.onChangeIndex('1')}}>
                        <Text 
                            style={[this.state.index === '1' ? styles.selectedIndex : styles.unselectedIndex, {alignSelf:"flex-start"}]}>
                            Notifications
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{width:"50%"}, this.state.index === '2' ? {borderBottomWidth:5, borderColor:"white"} : {borderBottomWidth:5, borderColor:"purple"}]} onPress={() => {this.onChangeIndex('2')}}>
                        <Text  
                        style={[this.state.index == '2' ? styles.selectedIndex : styles.unselectedIndex, {alignSelf:"flex-end"}]}>Messages</Text>
                    </TouchableOpacity>
                </View>
                {
                        this.state.index === '1' &&
                        <Notifications navigation={this.props.navigation} />
                    }
                    {
                        this.state.index === '2' &&
                        <ChatRoom navigation={this.props.navigation} />
                    }
            </View >
                </GestureRecognizer>
        
        )}

};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    SYT_add: {
        width:60,
        height:60,
        position:"absolute", 
        borderRadius:150,
        justifyContent:"center",
        alignItems:"center",
        bottom:25,
        right:15,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 2, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        elevation: 10, // Android
        
    },
    selectedIndex: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    
        },
        unselectedIndex:
        {
        color: 'gray',
        fontSize: 20,
        },
        mainContainer:{
        backgroundColor: 'purple',
        height: Platform.OS === 'android' ? '10%' : '5%',
        width: "100%",
        paddingLeft: '7%',
        paddingRight: '7%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        },
        
    lC_container: {
        flex:1.5/10,
        backgroundColor:"yellow",
        marginTop:25, 
        marginHorizontal:10,
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center"

    },
    avatar: {
        width: 50,
        height:50,
        borderRadius:50/2,
        marginRight: 20,
        backgroundColor:"yellow",
        marginLeft:10
    },
    feed: {
        flex:1, 
        marginTop:5

    },
    fR_item: {
        backgroundColor:"#10BFC5",
        borderRadius:30,
        marginHorizontal:10,
        flexDirection:"row",
        marginVertical:2,
        height:60,
        alignItems:"center"
    },
    button_not: {
        height:40,
        width:40,
        marginHorizontal:10,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center"
    }
});

//make this component available to the app
export default NotificationScreen;
