//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, Image, Alert, ScrollView, KeyboardAvoidingView, SafeAreaView} from 'react-native';
import Fire from "../Fire/Fire"
// create a component
class LoginScreen extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            errorMessage: null
        }
    }
    static navigationOptions = {
        headerShown: false
    };
    
    handlelogin = () => {
        Fire.shared.signIn(this.state.email, this.state.password)

    }
    render() {
        console.log(this.props)
        return (

           
            <SafeAreaView style={styles.container}>
                 <KeyboardAvoidingView
        
        behavior={Platform.OS == "ios" ? "padding" : ""}
        style={styles.container}
      >
                <StatusBar barStyle="light-content"></StatusBar>
                <Image source={require("../assets/images/login.png")} style={{
                    height:500, width:250, top:50,
                    position:"absolute", left:-170,}}/>
                    <Image source={require("../assets/images/phone2.png")} style={{
                    height:300, width:250, bottom:0,
                    position:"absolute", right:0,}}/>
                <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", marginBottom:50}}>
                    <Image source={require("../assets/logoSYT.png")} style={styles.image}></Image>
                    <Text style={{marginLeft:10, fontSize:25, fontWeight:"bold", color:'white'}}>Share Your Trip</Text>
                </View>
                <Text style={[styles.hello, {fontWeight:"bold", color:"white", fontSize:30}]}> {"Connectez vous "}</Text>
                <View style={styles.error_message}>
                   {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                <View style={styles.form}>
                    <View style={styles.panel_form}>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize="none" 
                            onChangeText={email => this.setState({email})} 
                            value={this.state.email}
                            placeholder="E-mail"
                        ></TextInput>
                    </View>
                    <View style={[styles.panel_form, {marginTop:32}]}>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize="none" 
                            secureTextEntry 
                            placeholder="Mot de passe"
                            onChangeText={password => this.setState({password})} 
                            value={this.state.password}></TextInput>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => this.handlelogin()}>
                            <Text style={{fontSize:20, }}>Se connecter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{}}>
                        <Text style={{textAlign:"center",marginTop:20, fontSize:17, color:"#fff" }}>Mot de passe oublié ?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=> this.props.navigation.navigate("Register")} style={{alignSelf:"center", marginTop:32 }}>
                            <Text style={{color:"#E1E2E6"}}>
                                Nouveau parmis nous ?<Text style={{fontWeight:'500', color:"#E9446A"}}> Inscription</Text>
                            </Text>
                    </TouchableOpacity>
                </View>

                </KeyboardAvoidingView>
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
        backgroundColor:"purple",
    },
    image: {
        height:50,
        width:50,
        alignSelf:"flex-start",
        borderRadius:1000,
        opacity:0.9,
    },
    hello: {
        textAlign:"center",
        fontSize:25,
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
        marginBottom:40,
        marginHorizontal:30,
        
    },
    input_title: {
        color: "#8A8F9E",
        fontSize: 15,
        textTransform:"uppercase",
        marginLeft:5
    },
    panel_form: {
        backgroundColor:"#E1E2E6",
        borderRadius:15
    },
    input: {
       
        height:60,
        fontSize:20,
        color: "#161F3D",
        marginLeft:5,
    },
    button: {
        height:50,
        width:250,
        backgroundColor:"#E1E2E6",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15,
        alignSelf:"center",
        marginHorizontal:30,
        marginTop:40
    

    }
   
});

//make this component available to the app
export default LoginScreen;
