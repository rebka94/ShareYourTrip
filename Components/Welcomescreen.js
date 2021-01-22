//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, StatusBar, BackHandler, ToastAndroid, SafeAreaView  } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider'
const slides = [
    {
      key: 'one',
      text: "Partager votre voyage avec n'importe qui",
      text2:"qui",
      image: require('../assets/images/travels.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 'two',
      text: "Share Your Trip est là pour vous aider\nà trouver votre partenaire \le temps d'attente de votre avion ",
      image: require('../assets/images/together.png'),
      backgroundColor: '#febe29',
    },
    {
        key: 'three',
        text: "Share Your Trip est là pour vous aider\nà trouver votre partenaire \le temps d'attente de votre avion ",
        image: require('../assets/images/airport.png'),
        backgroundColor: '#febe29',
      },
  ];
  
// create a component
class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          }
    }
    _renderItem = ({item}) => {
        return (
            <View style={styles.slide}>
            <Image source={item.image} style={{height:310, width:200, alignSelf:"center", marginBottom:15}}/>
            <Text style={{alignSelf:"center", fontWeight:"bold", fontSize:16, color:"white"}}>{item.text}</Text>
            <Text style={{alignSelf:"center", fontWeight:"bold", fontSize:16, color:"white"}}>{item.text2}</Text>
            <Text style={{alignSelf:"center", fontSize:16, color:"white",marginTop:10 }}>{item.text3}</Text>
            <Text style={{alignSelf:"center", fontSize:16, color:"white",}}>{item.text4}</Text>    
            <Text style={{alignSelf:"center", fontSize:16, color:"white", marginBottom:15}}>{item.text5}</Text>
      
            </View>
        )
    }
   

    
   
    render() {
        console.log(this.props)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="purple"/>
                <Image source={require("../assets/images/woman.png")} style={{
                    height:500, width:500, top:-70,
                    position:"absolute", left:140,}}/>
                <Image source={require("../assets/images/plane.png")} style={{
                    height:160, width:400, bottom:5,
                    position:"absolute", left:50,}}/>
                <View style={{flex:8/10}}>
                    <Text style={styles.welcome_text}>Bienvenue!</Text>
                    <AppIntroSlider renderItem={this._renderItem} data={slides} showDoneButton={false} showNextButton={false}/>
                    
                  {/*  
                    <Image source={require("../assets/logoSYT.png")} style={styles.image}></Image>
                    <Text style={{alignSelf:"center", fontWeight:"bold", fontSize:16, color:"white"}}>{"Partager votre voyage avec n'importe"}</Text>
                    <Text style={{alignSelf:"center", fontWeight:"bold", fontSize:16, color:"white"}}>{"qui"}</Text>
                    <Text style={{alignSelf:"center", fontSize:16, color:"white", marginTop:30}}>{"Trouvez vous un partenaire de voyage"}</Text>
                    <Text style={{alignSelf:"center", fontSize:16, color:"white"}}>{"en avion, ou bien d'attente lors"}</Text>
        <Text style={{alignSelf:"center", fontSize:16, color:"white"}}>{"de vos escales."}</Text>*/}


                </View>
                <View style={{position:"absolute", bottom:50, alignSelf:"center"}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate("Register")} style={[styles.button]}>
                        <Text style={{fontSize:20, fontWeight:'bold'}}>S'inscrire</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate("Login")} style style={[styles.button, {marginTop:15}]}>
                        <Text style={{fontSize:20, fontWeight:'bold'}}>Se connecter</Text>
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
        backgroundColor:"purple"
    },
    welcome_container: {
        flex:8/10,
    },
    image: {
        height:200,
        width:200,
        alignSelf:"center",
        marginBottom:20
    },
    slide: {
        height:"100%", 
        width:"95%", 
        alignSelf:"center",
    },
 
    welcome_text: {
        fontSize:40,
        alignSelf:"center",
        fontWeight:"bold",
        color:"white",
        margin:30,
    },
    button: {
        height:50,
        width:250,
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15,
        alignSelf:"center",
        marginHorizontal:30,
        marginTop:40,
        opacity:0.8,
    }
});

//make this component available to the app
export default WelcomeScreen;
