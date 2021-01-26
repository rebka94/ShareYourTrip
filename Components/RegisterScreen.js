//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, Image, ScrollView, Picker, SafeAreaView} from 'react-native';
import Fire from "../Fire/Fire"
import UserPermissions from "../helpers/UserPermissions"
import * as ImagePicker from "expo-image-picker"
import Ionicons from 'react-native-vector-icons/Ionicons';



// create a component
class RegisterScreen extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            user : {
                userName:"",
                email: "",
                password: "",
                avatar: "",
                name: "",
                firstName:"",
                friends: 0,
                syt: 0,
                age: null,
                gender:"man",
            }, 
            errorMessage: null,

            
        }        
    }

    handlePickAvatar= async() => {
        UserPermissions.getCameraPermission()
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [10, 10]
        })
        if (!result.cancelled) {
            this.setState({user: {...this.state.user, avatar: result.uri}})
        }

    }
    handleSignUp = () => {
        Fire.shared.createUser(this.state.user)
     
    }
    ion() {
        if (this.state.user.avatar===null) 
        return <Ionicons 
        name= "ios-camera"
        size={60}
        color={"#fff"}
        style={{marginTop:6, marginLeft:2}}/>
    }
    onChangeText(text) {
        let t= this.strUcFirst(text)
        this.setState({})

    }
     strUcFirst(a){
         return (a+'').charAt(0).toUpperCase()+a.substr(0);
        }
   
    render() {
        console.log("avatar", this.state.user)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <View style={styles.circle}></View>
                    <View style={{flex:2/10}}>
                        <Text style={{fontSize:20, color:"#E1E2E6", alignSelf:"center", marginTop:20}}> {"On a besoin de vos informations"}</Text>
                        <Text style={{fontSize:20, color:"#E1E2E6", alignSelf:"center"}}> {"personnels"}</Text>
                    <View style={styles.error_message}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>
                </View>
                <ScrollView style={{flex:6/10, flexDirection:"column"}}>
                    <View style={{alignItems:"center"}}>
                        <TouchableOpacity style={styles.avatarPlaceHolder} onPress={()=>this.handlePickAvatar()}>
                            <Image source={{uri: this.state.user.avatar}} style={styles.avatar}/>
                            {this.ion()}
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.panel_form, {marginTop:10, width:"40%"}]}>
                            <Picker
                            selectedValue={this.state.user.gender}
                            style={{ height: 50, width: 150, color:"#7E7878" }}
                            onValueChange={(itemValue, itemIndex) => 
                                this.setState({user:{...this.state.user, gender:itemValue}}) }
                            >
                            <Picker.Item label="Monsieur" value="man"/>
                            <Picker.Item label="Madame" value="woman" />
                            </Picker>
                    </View>
                    
                    <View style={{flex:1/2, flexDirection:"row"}}>
                        <View style={[styles.panel_form, {marginVertical:40}]}>
                                <TextInput 
                                style={styles.input} 
                                placeholder="Nom"
                                autoCapitalize="none" 
                                onChangeText={name => this.setState({user:{...this.state.user, name}})}                                 
                                value={this.state.user.name}></TextInput>
                        </View>
                        <View style={[styles.panel_form, {marginVertical:40}]}>
                                <TextInput 
                                style={styles.input}
                                autoCapitalize="none" 
                                placeholder="Prénom"
                                onChangeText={firstName => this.setState({user:{...this.state.user, firstName}})} 
                                value={this.state.user.firstName}></TextInput>
                        </View>
                    </View>
                    <View style={{flex:1/2}}>
                        <View style={[styles.panel_form]}>
                                <TextInput 
                                style={styles.input} 
                                autoCapitalize="none"
                                placeholder="Email" 
                                onChangeText={email => this.setState({user:{...this.state.user, email}})} 
                                value={this.state.user.email}></TextInput>
                        </View>
                        <View style={[styles.panel_form, {marginTop:10}]}>
                                <TextInput 
                                style={styles.input} 
                                autoCapitalize="none"
                                secureTextEntry={true}
                                placeholder="Mot de passe"
                                onChangeText={password => this.setState({user:{...this.state.user, password}})}     
                                value={this.state.user.password}></TextInput>
                        </View>
                        <View style={[styles.panel_form, {marginTop:10}]}>
                                <TextInput 
                                style={styles.input} 
                                keyboardType="numeric"
                                autoCapitalize="none"
                                maxLength={4}
                                placeholder="Année de naissance"
                                onChangeText={age => this.setState({user:{...this.state.user, age}})}     
                                value={this.state.user.birthday}></TextInput>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => this.handleSignUp()}>
                            <Text style={{fontSize:20, color:"#E1E2E6" }}>S'inscrire</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate("Login")} style={{alignSelf:"center", marginTop:32 }}>
                            <Text style={{color:"#414959", marginTop:1 }}>
                                Déja inscris ?<Text style={{fontWeight:'500', color:"#E9446A"}}> Connexion</Text>
                            </Text>
                    </TouchableOpacity>
                </ScrollView>
               
                   

                
                
                <View style={{flex:2/10, justifyContent:"center"}}>
                    <Image style={{width:70, 
                                   height:70, 
                                   borderRadius:100, 
                                   alignSelf:"center"
                                   }} source={require("../assets/logoSYT.png")}></Image> 
                </View>
            </SafeAreaView>
        );
    };

}


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        flexDirection:"column",
        backgroundColor:"purple"
    },
    circle: {
        position:'absolute',
        width:500,
        height:500,
        backgroundColor:"white",
        borderRadius:500 /2,
        left:-100,
        bottom:40
    },
    avatarPlaceHolder: {
        width:100,
        height:100,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#E1E2E6",
        marginTop:10,
        borderRadius:100 

    },
    avatar: {
        position:"absolute",
        width:100,
        height:100,
        borderRadius:100 

    },

    error_message: {
        marginHorizontal:30,
        height:72,
        justifyContent:"center",
        alignItems:'center'
    },
    error: {
        color: '#E9446A', 
        textAlign:"center",
        fontWeight:"600",
        fontSize:15


    },
    form: {
        marginBottom:30,
        marginHorizontal:5,
        alignSelf:"center",
        flex:1/2,        
    },
    input_title: {
        color: "#8A8F9E",
        fontSize: 15,
        textTransform:"uppercase",
        marginLeft:5
    },
    panel_form: {
        backgroundColor:"#E1E2E6",
        borderRadius:15,
        marginHorizontal:10,
        flex:1,
    },
    input: {
        borderRadius:15,
        height:60,
        fontSize:20,
        color: "#D1C8C8",
        marginLeft:5,
    },
    button: {
        height:50,
        width:250,
        backgroundColor:"purple",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15,
        alignSelf:"center",
        marginHorizontal:30,
        marginTop:30,
    }
   
});

//make this component available to the app
export default RegisterScreen;
