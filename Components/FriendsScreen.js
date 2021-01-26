//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Fire from '../Fire/Fire';
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage"

// create a component
class FriendsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            fetchingfriends: [],
            count:0,
            storageFriend:[
               
            ]
        }
        this.storageFriend=[]
     
    }
    componentDidMount() {
        this.getFriends()
       
       const refFriends = Fire.shared.database.ref("friends/"+Fire.shared.uid)
       /* refFriends.limitToLast(1).on("child_added", (snapshot)=> {
            const refUsers = Fire.shared.database.ref("users/")
            refUsers.child(snapshot.val()).on("value", data=> {
               const newFriend = {
                    uid : snapshot.val(),
                    avatar: data.val().avatar,
                    name : data.val().name,
                    firstName:data.val().firstName
               }
               this.setState({fetchingfriends: [...this.state.fetchingfriends, newFriend]})
            })            
        })*/
        refFriends.on("child_removed", (snapshot)=> {
            console.log("supprimer", snapshot.key)
        })  

    }

    renderItems({item}) {
        return (
            <TouchableOpacity style={styles.feedItem} onPress={()=>this.toggleItem(item)}>
            <View style={{width:"100%", flexDirection:"row", alignItems:"center"}}>
                    <Image style={{height:70, width:70, borderRadius:50, marginHorizontal:10}} source= {{uri: item.avatar}}/>
                    <Text style={[styles.text_item, {marginLeft:15}]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.text_item, {marginLeft:5}]}>
                        {item.firstName}
                    </Text>
            </View>
        </TouchableOpacity>
        )
    }
    getFriends= async() => {
        try {
            const friends = await AsyncStorage.removeItem("friends");
            const refFriends = Fire.shared.database.ref("friends/"+Fire.shared.uid)
            if (friends==null) {//si il ne y'a pas de friends enregistrer dans le tel 
                this.unsubscribe= refFriends.on("value", (snapshot)=> {
                    if (snapshot.hasChildren()) {
                        console.log("si il ne y'a pas de friends enregistrer dans le tel ")
                        var monTableauUid = Object.keys(snapshot.val()).map(function(cle) {
                            return [Number(cle), snapshot.val()[cle]];
                        });
                        console.log("monTab", monTableauUid)
                        var friendsTab = []
                        if (monTableauUid.length>0) {
                            for (let i =0; i<monTableauUid.length; i++) {
                                const refUsers = Fire.shared.database.ref("users/"+monTableauUid[i][1])
                                refUsers.on("value", data=> {
                                    const newFriend = {
                                        uid : monTableauUid[i][1],
                                        avatar: data.val().avatar,
                                        name : data.val().name,
                                        firstName:data.val().firstName
                                   }
                                    friendsTab.push(newFriend)
                                })  
                            }

                        } else {
                            const refUsers = Fire.shared.database.ref("users/"+monTableauUid[0][1])
                            refUsers.on("value", data=> {
                                const newFriend = {
                                    uid : monTableauUid[0][1],
                                    avatar: data.val().avatar,
                                    name : data.val().name,
                                    firstName:data.val().firstName
                               }
                                friendsTab.push(newFriend)
                            }) 
                            
                            

                        }
                        
                        console.log("friends tab",friendsTab)
                       this.setState({fetchingfriends: friendsTab})
                    }        
                })
            } else {// si il y'a des friends dans le tel on telecharge que les nouveaux 
                console.log("si il y'a des friends dans le tel on telecharge que les nouveaux ")
                refFriends.limitToLast(1).on("child_added", (snapshot)=> {
                    const refUsers = Fire.shared.database.ref("users/")
                    refUsers.child(snapshot.val()).on("value", data=> {
                       const newFriend = {
                            uid : snapshot.val(),
                            avatar: data.val().avatar,
                            name : data.val().name,
                            firstName:data.val().firstName
                       }
                       console.log("newFriend",newFriend)
                       console.log("friendStokage", JSON.parse(friends))
                       //this.storageFriend= JSON.parse(friends)
                       this.setState({fetchingfriends:[...this.state.fetchingfriends, newFriend], storageFriend:JSON.parse(friends)})
                       
                    })            
                })
                


            }

        } catch (error) {
            alert(error)
        
        }

    }
    saveFriends = async(friends) => {
        try {
            await AsyncStorage.setItem("friends", JSON.stringify(friends));
          } catch (error) {
            alert(error)
          }

    }
    componentWillUnmount() {
        this.saveFriends(this.state.fetchingfriends)
    }
    
    render() {
        console.log("state",this.state)
        console.log("stockage",this.storageFriend)

        return (
            <View style={styles.container}>
                    <View style={styles.input_Search}>
                        <EvilIcons name="search" size={30} color="#846D84" style={{marginRight:5}} />
                        <TextInput 
                                style={{}} 
                                autoCapitalize="none"
                                placeholder="Rechercher des amis"
                                onChangeText={text =>this.handleSearch(text)} 
                                value={this.state.text}                               
                                >
                        </TextInput>
                    </View>
                 <FlatList 
                    style={styles.feed}
                    data= {this.state.storageFriend.concat(this.state.fetchingfriends)}
                    renderItem={(item) => this.renderItems(item)}
                    keyExtractor= {item => item.uid}
                />  
            </View>
        );
    }
}


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    feedItem: {
        borderRadius:10,
        padding:10, 
        flexDirection:"row",
        marginVertical:10,
        width:"100%"
    },
    text_item: {
        fontSize:23,
        fontWeight:"bold"
    },
    input_Search: {
        padding:10,
        width:"90%",
        alignSelf:"center",
        marginTop:20,
        backgroundColor:"#E1E2E6",
        borderRadius:20,
        paddingHorizontal:20,
        fontSize:20,
        fontWeight:"bold",
        color:"#846D84",
        flexDirection:"row",
    },
    feed: {
        flex:1,
        marginTop:5
    },
});

//make this component available to the app
export default FriendsScreen;
