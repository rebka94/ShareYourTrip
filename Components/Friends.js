//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native';
import PulseLoader from 'react-native-pulse-loader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fire from '../Fire/Fire'
class Friends extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            friends: null,
            isLoading : false
        }
    }

    componentDidMount() {
        const user = Fire.shared.uid || this.props.uid 
        const {navigation} = this.props
        this._unsubscribeFriends = Fire.shared.fireStore.collection('users').doc(user).collection('friends')
        .onSnapshot(snapshot => {
            if (!snapshot.empty) {
                this.onFriendsUpdate(snapshot)
            }
        })
    }

    onFriendsUpdate = (snapshot) => {
        const docs = snapshot.docs.map((docSnapshot) => (
          docSnapshot.data()
        ))
        console.log('fiensss', docs)
        this.setState({
            friends: docs,
        })
    }
    componentWillUnmount() {
        this._unsubscribeFriends()
        console.log("avant de sortir ", this.state.friends)
    }
     

    redderFriends= (friend)=>{
        return (
            <TouchableOpacity style={styles.feedItem} onPress={()=> this.props.navigation.navigate("PublicProfile", {props: friend})}>
                <Image source={{uri:friend.avatar}} style={styles.avatar}/>
                <View style={{flex:1}}>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", flex:8/10}}>
                        <View style={{flexDirection:"row"}}>
                            <Text style={styles.name}>{friend.name} </Text>
                            <Text style={styles.name}>{friend.firstName}</Text>
                        </View>
                        <TouchableOpacity style={{flex:2/10, justifyContent:"center", alignItems:"center"}}>
                            <Ionicons 
                                name= "md-more"
                                size={35}
                                color={"#4F566D"}
                                style={{marginTop:6, marginLeft:2}}/>
                        </TouchableOpacity> 
                        
                    </View>                  
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        console.log("ici ces amis", this.state.friend)
        return (
            <View style={styles.container}>
                <View style={styles.circle}></View>
               <View style={styles.header}>
               </View>
               <FlatList 
                    style={styles.feed}
                    data= {this.state.friends}
                    renderItem={({item}) => this.redderFriends(item) }
                    keyExtractor= {item => item.uid}
                />    
            </View>
        );

    }

};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#EFECF4"
    },
    feedItem: {
        backgroundColor:"#10BFC5",
        borderRadius:10,
        padding:15, 
        flexDirection:"row",
        marginVertical:2,
        marginHorizontal:10
    },
    name: {
        fontWeight:"600",
        fontSize:16,
        color: "#454D65"

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
        
        
    },
    avatar: {
        width: 50,
        height:50,
        borderRadius:50/2,
        marginRight: 16
    }
});

//make this component available to the app
export default Friends;
