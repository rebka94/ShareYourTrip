//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image, Modal} from 'react-native';
import Fire from "../Fire/Fire"
import { DrawerActions } from '@react-navigation/native';
import UserPermissions from "../helpers/UserPermissions"
import * as ImagePicker from "expo-image-picker"
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment"
const posts = [
    {
        id: "1",
        name:"Yanis Selam",
        text: "sqjfljklqjsfjlkqjmfjmqjfhmqkfjbnqmkjbmqfjmhqfmjhqmhfq",
        timestamp: 54574545455,
        avatar: require("../assets/image1.jpg"),
        image: require("../assets/image1.jpg")
    },
    {
        id: "2",
        name:"Yanis Selam",
        text: "sqjfljklqjsfjlkqjmfjmqjfhmqkfjbnqmkjbmqfjmhqfmjhqmhfq",
        timestamp: 54574545455,
        avatar: require("../assets/image2.jpg"),
        image: require("../assets/image2.jpg")
    },
    {
        id: "3",
        name:"Yanis Selam",
        text: "sqjfljklqjsfjlkqjmfjmqjfhmqkfjbnqmkjbmqfjmhqfmjhqmhfq",
        timestamp: "1569109273726",
        avatar: require('../assets/image3.jpg'),
        image: require('../assets/image3.jpg')
    },

]

// create a component
class HomeScreen extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            user: {
                avatar: null
            },
            userSearch: []

            ,
            modalVisible: false
        }
    }
   
 
    


 
    navigate(props) {
        if (this.state.userSearch[0].userName===Fire.shared.userName){
            this.props.navigation.navigate("Profile")
            this.setState({modalVisible:false})
        } else {
            this.props.navigation.navigate("PublicProfile", {props})
            this.setState({modalVisible:false})
        }
      
    }

        redderPost = (post)=>{
        return (
            <View style={styles.feedItem}>
                <Image source={post.avatar} style={styles.avatar}/>
                <View style={{flex:1}}>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                        <View>
                            <Text style={styles.name}>{post.name} </Text>
                            <Text style={styles.timestamp}>{moment(post.timestamp.format).fromNow()}</Text>
                        </View> 
                        
                        <Ionicons 
                            name= "ios-more"
                            size={35}
                            color={"#4F566D"}
                            style={{marginTop:6, marginLeft:2}}/>
                    </View>
                    <Text style={styles.post}> {post.text}</Text>
                    <Image source={post.image} resizeMode="cover" style={styles.postImage}/>
                    <View style={{flexDirection:"row"}}>
                        <Ionicons 
                            name= "ios-heart-empty"
                            size={25}
                            color={"#4F566D"}
                            style={{marginRight:16}}/>
                        <Ionicons 
                            name= "ios-chatboxes"
                            size={25}
                            color={"#4F566D"}/>

                    </View>


                </View>
            </View>
        )
    }
    redderUsers = (user)=>{
        return (
            <TouchableOpacity style={styles.feedItem} onPress={()=> this.navigate(user)}>
                <Image source={{uri:user.avatar}} style={styles.avatar}/>
                <View style={{flex:1}}>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                        <View>
                            <Text style={styles.name}>{user.name} </Text>
                        </View> 
                    </View>   
                </View>
            </TouchableOpacity>
        )
    }
    _searchTextInputChanged(user) {
        Fire.shared.fireStore.collection('users').where('userName', '==', user).get()
        .then( instance => {
            if(instance.empty) {
                console.log("Aucun utilisateurs de ce nom")
                return;
            }
            instance.forEach(doc => {
                console.log(doc.uid, '=>', doc.data())
                this.setState({userSearch: [doc.data()], modalVisible:true})
            });
            
        }).catch(err => {
            console.log('Error getting documents', err);
          })
    }
  

    render() {
        console.log("la state du home",this.state)
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={{width:100, 
                                   height:100, 
                                   borderRadius:100, 
                                   alignSelf:"center",
                                   marginTop:20
                                   }} source={require("../assets/logoSYT.png")}>
                    </Image> 
                </View>
                <View style={styles.screen}>

                </View>
               
                <TouchableOpacity style={[styles.SYT_add]} onPress={()=> console.log('im pressed')}>
                    <Image style ={{width:35, height:35}}source={require("../assets/searchh.png")}/>
                </TouchableOpacity>
                <Modal visible={this.state.modalVisible}
                       animationType="fade"
                       transparent={true}
                       onRequestClose={()=>this.setState({modalVisible:false})}>
                   <View style={styles.Modal}>
                    <FlatList 
                        style={styles.feed}
                        data= {this.state.userSearch}
                        renderItem={({item}) => this.redderUsers(item) }
                        keyExtractor= {item => item.uid}
                />  
                </View>
               </Modal>
                
            </View>
        );
    };

}


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#EFECF4"
        
    },
    screen: {
        flex:8/10
    },
    flatSearch: {
        marginHorizontal:5,
    },
    feedItemSearch: {

    },
    Modal: {
        height:250,
        backgroundColor:"#10BFC5",
        position:"absolute", 
        bottom:350, 
        right:80, 
        left:80, 
        borderRadius:20
    },
    post: {
        marginTop: 15,
        fontSize:15,
        color:"#838899"

    },
    textinput: {
        height:50,
        width:300,
        backgroundColor:"#EFECF4",
        borderRadius:20,
        alignSelf:"center",

    },
    postImage: {
        width:undefined,
        height: 150,
        borderRadius:5,
        marginVertical:15

    },
    header: {
        flex:2/10,
        backgroundColor:"purple",
        alignItems:"center",
        justifyContent:"center",
        borderBottomWidth: 1,
        borderBottomColor:"#EBECF4"
    }, 
    feed: {
        marginHorizontal:16,

    },

    headertitle: {
        fontSize: 50,
        fontWeight: "bold",
        fontStyle:"italic"
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
    feedItem: {
        backgroundColor:"#fff",
        borderRadius:10,
        padding:9, 
        flexDirection:"row",
        marginVertical:8
    },
    avatar: {
        width: 36,
        height:36,
        borderRadius:18,
        marginRight: 16
    },
    name : {
        fontWeight:"600",
        fontSize:16,
        color: "#454D65"
    },
    timestamp: {
        fontSize:11,
        color: "#C4C6CE",
        marginTop: 4

    }

   
   
});

//make this component available to the app
export default HomeScreen;

