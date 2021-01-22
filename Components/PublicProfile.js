//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PixelRatio, Image, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fire from "../Fire/Fire"


// create a component
class PublicProfile extends React.Component{
    constructor(props) {
        super(props)
        this.user = this.props.route.params.props
        this.state = {
          isItaFriend: false,
          Friends:0
        }
        this.unsubscribe = null
    }
    UNSAFE_componentWillMount() {
        this.unsubscribe = this.statutProfile()    
         
    }
    statutProfile = () => {
        const uid = Fire.shared.uid
        const friend = this.props.route.params.props
        let fRequestRefI =  Fire.shared.fireStore.collection("notifications").doc(uid).collection('friends_request_send')
        let fRequestRefF =  Fire.shared.fireStore.collection("notifications").doc(uid).collection('friends_request_receive')

        let friendRef =  Fire.shared.fireStore.collection("users").doc(uid).collection('friends')
        friendRef.where('uid', '==', friend.uid).onSnapshot( instance => {
            if (!instance.empty) {
                this.setState({isItaFriend: true})
            }
        })
        fRequestRefF.where('uid', '==', friend.uid).onSnapshot( instance => {
            if (!instance.empty) {
                this.setState({friendRequestF: true})
            }
        })
        fRequestRefI.where('uid', '==', friend.uid).onSnapshot( instance => {
            if (!instance.empty) {
                this.setState({friendRequestI: true})
            }
        })
      
    }

    handleFriend() {
        const friend = this.props.route.params.props
        const user = Fire.shared.uid
        let userRef = Fire.shared.fireStore.collection("users").doc(user)
        let friendsRef = userRef.collection('friends')
        if (this.state.isItaFriend===false) {
            Fire.shared.addFriendRequest(friend)
            this.setState({friendRequestI: true})
        }
        if  (this.state.friendRequestI===true)  {
            Fire.shared.dellFriendRequest(friend)
            this.setState({friendRequestI: false})
        }
        if (this.state.isItaFriend===true) {
            Fire.shared.delFriends(friend)
            this.setState({isItaFriend: false})
        }
        friendsRef.get()
        .then( snapshot => {
            userRef.update({
                friends: snapshot.size
            })
            this.setState({Friends: snapshot.size})
        })
    }
    textFunction() {
        if (this.state.friendRequestI===true) {
            return <Text>{"Demande d'ami envoyé(X)"}</Text>
        } else if (this.state.friendRequestF===true) {
            return <Text>{"Accepter la demande d'ami"}</Text>
        } else if (this.state.isItaFriend === false) {
            return <Text>{"Ajouter comme ami"}</Text>
        } else if (this.state.isItaFriend ===true ) {
        return <Text>{"Supprimer de mes amis"}</Text> 
        }
    }
    componentWillUnmount() {
        this.unsubscribe()
    }
    render() {   
        console.log("profilepublic", this.user)
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{position:"absolute", left:20, top:25}} onPress={()=>this.props.navigation.goBack()}>
                    <Ionicons 
                        name= "ios-undo"
                        size={40}
                        color={"#4F566D"}
                        style={{marginTop:6, marginLeft:2}}/>
                </TouchableOpacity>
                <View style={styles.up_Screen}>
                    <View style={styles.avatar_container}>
                        <Image style={styles.avatar} source={this.user.avatar? {uri: this.user.avatar}: require('../assets/tempAvatar.png')}/>
                    </View>
                    <Text style={styles.name}>{this.user.userName}</Text> 
                    <TouchableOpacity onPress={()=> this.handleFriend()}style={{height:30, width:170, backgroundColor:"grey", justifyContent:"center", alignItems:"center", borderRadius:30, alignSelf:"center"}}>
        <Text style={{color:'white'}}>{this.textFunction()}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.down_Screen}>
                    <View style={styles.data_stat}>
                        <View style={styles.item}>
                            <Text style={styles.statAmount}>10</Text>
                            <Text style={styles.statTitle}>SYT</Text> 
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.statAmount}>20</Text>
                            <Text style={styles.statTitle}>Posts</Text> 
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.statAmount}>12</Text>
                            <Text style={styles.statTitle}>Amis</Text> 
                        </View>
                    </View>
                   

                </View>
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
    up_Screen: {
        flex:4/10,
        justifyContent:"center",
        alignItems:"center",
      
    },
    down_Screen: {
        flex:6/10

    },
    avatar_container: {
        shadowColor:"#151734",
        shadowRadius:15,
        shadowOpacity:0.3,

    },
    avatar: {
        height:136,
        width:136,
        borderRadius:500 / PixelRatio.get(),
    
    },
    name: {
        marginTop:32,
        fontSize:20,
        fontWeight:"600"
    },
    data_stat: {
        flexDirection:"row",
        justifyContent:"space-between",
        margin:32
    },
    item: {
        alignItems:"center",
        flex:1,
    },
    statTitle: {
        color:"#C3C5CD",
        fontWeight:"600",
        fontSize:14,
        marginTop: 4
    },
    statAmount: {
        color:"#4F566D",
        fontWeight:"600",
        fontSize:20,

    }
});

//make this component available to the app
export default PublicProfile;
