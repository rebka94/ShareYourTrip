//import liraries
import React, { Component, } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PixelRatio, Image, Alert, SafeAreaView, Modal, StatusBar, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fire from "../Fire/Fire"
import * as functions from "../helpers/getUserFromAsync"
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
// create a component
class ProfileScreen extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          user: {

          },
          modalVisible: false
        }
        this._unsubscribe= null
    }
    
    
     componentDidMount= ()=> {
        const {navigation} = this.props
        this._unsubscribe = navigation.addListener('focus', () => {
            this.getData()
            
          });
    }
    getData = async() => {
        let data = await functions.getProfile()
        this.setState({user:data})
        console.log("profil récupérec")
    }
   
    componentWillUnmount() {
        this._unsubscribe();

    }
    handleLogOut() {
        Fire.shared.signOut()
        this.setState({user:{}, modalVisible:false})
    }
    _showAlert() {// Affichage d'un message d'alerte avant la mise à zéro du score (et donc de la state)
    Alert.alert(
        'Deconnexion',
        'Êtes-vous sûr(e) de vouloir se deconnecter ?.',
        [
          {text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Oui !', onPress: () => this.handleLogOut()},
        ],
        { cancelable: false }
    )
}
    displayModal() {
        return (
            <SafeAreaView style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                    
                    <SafeAreaView style={[styles.centeredView, {position:"relative"}]}>
                        <View style={{justifyContent:"center", alignItems:"center",flex:1/10, borderBottomWidth:2, width:"100%", flexDirection:"row"}}>
                            <View style={{flex:2/10, justifyContent:"center", alignItems:"center"}}>
                                <TouchableOpacity style={{}}
                                    onPress={()=>this.setState({modalVisible:false})}>
                                    <Entypo name="cross" size={35} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:8/10, justifyContent:"center", alignItems:"flex-start"}}>
                                <Text style={{fontSize:25, fontWeight:"bold"}}>{"Réglages"}</Text>
                            </View>
                        </View>
                        <View style={{flex:9/10, }}>
                        <TouchableOpacity style={{}}
                                    onPress={()=>this.setState({modalVisible:false})}>
                                    <Entypo name="cross" size={35} color="black" />
                                </TouchableOpacity>
                            <ScrollView style={{flexDirection:"column", marginTop:20}}>
                                <View style={styles.contain_item}>
                                    <TouchableOpacity style={styles.items}>
                                        <View style={{flexDirection:"row", alignItems:"center", flex:9/10}}>
                                            <MaterialIcons name="account-box" size={35} color="black" style={{marginHorizontal:10}} />
                                            <Text style={styles.text_item}>{"Compte"}</Text>
                                        </View>
                                        <View style={{flex:1/10}}>
                                            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{alignSelf:"center"}}/>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.items}>
                                        <View style={{flexDirection:"row", alignItems:"center", flex:9/10}}>
                                            <MaterialCommunityIcons name="shield-lock" size={35} color="black" style={{marginHorizontal:10}}/>
                                            <Text style={styles.text_item}>{"Sécurité et confidetialité"}</Text>
                                        </View>
                                        <View style={{flex:1/10}}>
                                            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{alignSelf:"center"}}/>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.items}>
                                        <View style={{flexDirection:"row", alignItems:"center", flex:9/10}}>
                                            <MaterialIcons name="notifications" size={35} color="black" style={{marginHorizontal:10}} />
                                            <Text style={styles.text_item}>{"Notifications"}</Text>
                                        </View>
                                        <View style={{flex:1/10}}>
                                            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{alignSelf:"center"}}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.contain_item, {marginTop:45}]}>
                                    <TouchableOpacity style={styles.items}>
                                        <View style={{flexDirection:"row", alignItems:"center", flex:9/10}}>
                                            <MaterialCommunityIcons name="help-box" size={35} color="black" style={{marginHorizontal:10}}/>
                                            <Text style={styles.text_item}>{"Aide"}</Text>
                                        </View>
                                        <View style={{flex:1/10}}>
                                            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{alignSelf:"center"}}/>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.items}>
                                        <View style={{flexDirection:"row", alignItems:"center", flex:9/10}}>
                                            <MaterialIcons name="view-list" size={35} color="black" style={{marginHorizontal:10}} />
                                            <Text style={styles.text_item}>{"Règles de l'application"}</Text>
                                        </View>
                                        <View style={{flex:1/10}}>
                                            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{alignSelf:"center"}}/>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.items}>
                                        <View style={{flexDirection:"row", alignItems:"center", flex:9/10}}>
                                            <MaterialCommunityIcons name="book-open-variant" size={30} color="black" style={{marginHorizontal:14}}/>
                                            <Text style={styles.text_item}>{"Légal"}</Text>
                                        </View>
                                        <View style={{flex:1/10}}>
                                            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{alignSelf:"center"}}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.contain_item, {marginTop:45}]}>
                                    <TouchableOpacity style={styles.items} onPress={()=>this._showAlert()}>
                                        <View style={{flexDirection:"row", alignItems:"center", flex:9/10}}>
                                            <MaterialCommunityIcons name="logout-variant" size={30} color="black" style={{marginHorizontal:14}}/>
                                            <Text style={styles.text_item}>{"Se déconnecter"}</Text>
                                        </View>
                                        <View style={{flex:1/10}}>
                                            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{alignSelf:"center"}}/>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.items}>
                                        <View style={{flexDirection:"row", alignItems:"center", flex:9/10}}>
                                            <MaterialCommunityIcons name="delete" size={35} color="black" style={{marginHorizontal:10}}/>
                                            <Text style={styles.text_item}>{"Supprimer mon compte"}</Text>
                                        </View>
                                        <View style={{flex:1/10}}>
                                            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{alignSelf:"center"}}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{justifyContent:"center", alignItems:"center", marginTop:50}}>
                                    <Text style={styles.text_item}>{"Fait avec amour à Paris"}</Text>
                                    <Text style={{fontSize:14, fontWeight:"900", color:"grey"}}>{"ShareYourTrip 1.0.0"}</Text>
                                </View>
                                

                            </ScrollView>
                        </View>
                        
                       
                    </SafeAreaView>
                </Modal>
            </SafeAreaView>
        )
    }
   
    render() {   
        return (
       
                <SafeAreaView style={styles.container}>
                    {this.displayModal()}
                    <StatusBar backgroundColor="purple"/>
                <View style={[styles.up_Screen, {}]}>
                    <View style={{flex:2/10, justifyContent:"center", alignSelf:"flex-end", marginRight:20, marginTop:15}}>
                        <TouchableOpacity style={{}} onPress={()=>this.setState({modalVisible:true})}>
                        <Ionicons 
                        name= "ios-settings"
                        size={50}
                        color={"#4F566D"}
                        />
                        </TouchableOpacity>

                    </View>
                    <View style={{flex:8/10, justifyContent:"center", alignItems:"center"}}>
                        <View style={styles.avatar_container}>
                            <Image style={styles.avatar} source={this.state.user.avatar? {uri: this.state.user.avatar}: require('../assets/tempAvatar.png')}/>
                        </View>
                        <Text style={styles.name}>{this.state.user.userName}</Text> 

                    </View>
                
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
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate("Friends", {avatar: this.state.user.avatar})} style={styles.item}>
                            <Text style={styles.statAmount}>{this.state.user.friends}</Text>
                            <Text style={styles.statTitle}>Amis</Text> 
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{alignItems:"center", height:50, width:"60%", backgroundColor:"red", justifyContent:"center", alignSelf:"center", borderRadius:20, position:"absolute", bottom:20}} onPress={()=>this._showAlert()}>
                        <Text style={{fontSize:25, fontWeight:"bold", color:"white"}}>Déconnexion</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );

    }

};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#EFECF4"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position:"absolute",
        backgroundColor:"#E5E7E9"
      },
    up_Screen: {
        flex:4/10,
        justifyContent:"center",
        alignItems:"center",
      
    },
    text_item: {
        fontSize:15,
        fontWeight:"bold"
    },
    contain_item: {
        width:350, 
        borderRadius:15, 
        backgroundColor:"#fff",
    },
    down_Screen: {
        flex:6/10

    },
    items: {
        height:50,
        borderBottomWidth:1,
        borderColor:"#E5E7E9",
        flexDirection:"row",
        alignItems:"center",
        
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
export default ProfileScreen;
