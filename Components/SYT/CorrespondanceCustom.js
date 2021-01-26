//import liraries
import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../Store/actions/actionsTypes'
import * as actionsFunction  from '../../Store/actions/actions'
import { View,
     TouchableHighlight,
      Text, StyleSheet,
       TextInput, FlatList,
        TouchableOpacity,
         StatusBar, Image, SafeAreaView,
          Keyboard, KeyboardAvoidingView,
           ScrollView, Dimensions, Modal, Animated} from 'react-native';
import data from '../../database/airportBase'
import { MaterialIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { Value } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import EscaleForm from "../EscalesScreens/EscaleForm";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Escale } from '../../classes/Escale';
import Fire from '../../Fire/Fire';


// create a component
class CorrespondanceCustom extends React.Component {
    constructor(props){
        super(props)
        this.type=this.props.type
        this.state= {
            nb_correspondance:this.props.nb_correspondance,
            index:0,
            correspondances: [],
            correspondance: {
                lieuCorrespondance:"",
                debutCorrespondance:"", 
                finCorrespondance:""
            },           
        } 
    }
    onChangeFunction(type, text) {
        if (type=="lieu") {
            this.setState({correspondance:{...this.state.correspondance, lieuCorrespondance:text}})
        } 
    }
 

    handleNext() {
        if (this.state.index<this.state.nb_correspondance) {
            if (this.state.correspondances[this.state.index]==undefined) {
                const element = {
                    position: this.state.index,
                    lieuCorrespondance:this.state.correspondance.lieuCorrespondance,
                    debutCorrespondance:this.state.correspondance.debutCorrespondance, 
                    finCorrespondance:this.state.correspondance.finCorrespondance
                }
                this.setState({
                    correspondances:[...this.state.correspondances, element],
                    correspondance: {
                        lieuCorrespondance:"",
                        debutCorrespondance:"", 
                        finCorrespondance:""
                    },
                    index: this.state.index+1
                })
            } else {
                const element = {
                    lieuCorrespondance:this.state.correspondances[this.state.index].lieuCorrespondance,
                    debutCorrespondance:this.state.correspondances[this.state.index].debutCorrespondance,
                    finCorrespondance:this.state.correspondances[this.state.index].finCorrespondance,
                }
                this.setState({index:this.state.index+1})
                
            }
        }       
    }
    handleReturn() {
        if (this.state.index>0) {
            this.setState({index:this.state.index-1})
     
        }
    }
    


    renderItem(index) {
        return (
            <View style={{justifyContent:"center", width:"85%", alignItems:"center", alignSelf:"center"}}>
                <Text style={styles.escale_text}>{"Escale "}{this.state.index+1}</Text>
                <View style={ styles.input_contain}>
                    <View style={styles.icon_container}>
                        <MaterialIcons name="place" size={30} color="purple" />
                    </View>
                    <View style={styles.text_input_container}>
                        <TextInput
                            placeholder="Lieu de l'escale"
                            style={{ paddingHorizontal: 10, fontSize: 17, color: "#ccccef" }}
                            onChangeText={lieuCorrespondance =>this.onChangeFunction("lieu", lieuCorrespondance)}
                            value={this.state.correspondance.lieuCorrespondance}
                          
                                                       
                        />
                    </View>
                </View>
                <View style={ styles.input_contain}>
                    <View style={styles.icon_container}>
                        <Ionicons name="ios-time" size={30} color="purple"/>
                    </View>
                    <View style={styles.text_input_container}>
                        <TextInput
                            placeholder="Début de l'escale"
                            style={{ paddingHorizontal: 10, fontSize: 17, color: "#ccccef" }}
                            onChangeText={debutCorrespondance => this.setState({correspondance:{...this.state.correspondance,  debutCorrespondance}})}
                            value={this.state.correspondances[index]!=undefined?
                                this.state.correspondances[index].debutCorrespondance:
                                this.state.correspondance.debutCorrespondance}                              
                                 
                        />
                    </View>
                </View>
                <View style={ styles.input_contain}>
                    <View style={styles.icon_container}>
                        <Ionicons name="ios-time" size={30} color="purple"/>
                    </View>
                    <View style={styles.text_input_container}>
                        <TextInput
                            placeholder="Fin de l'escale"
                            style={{ paddingHorizontal: 10, fontSize: 17, color: "#ccccef" }}
                            onChangeText={finCorrespondance => this.setState({correspondance:{...this.state.correspondance,  finCorrespondance}})}    
                            value={this.state.correspondances[index]!=undefined?
                                this.state.correspondances[index].finCorrespondance:
                                this.state.correspondance.finCorrespondance}                                 
                        />
                    </View>
                </View>
                <View style={{flexDirection:"row", width:"100%"}}>
                    <View style={[styles.button_container]}>
                        {this.state.index!=0 && <TouchableOpacity style={[styles.button, {backgroundColor:"#ccccef",}]}
                        onPress={()=>this.handleReturn()}>
                            <Text style={styles.text_button}>{"Précedent"}</Text>
                        </TouchableOpacity>}
                    </View>
                    <View style={styles.button_container}>
                        {this.state.index<this.state.nb_correspondance-1&& <TouchableOpacity style={[styles.button, {backgroundColor:"purple",}]}
                        onPress={()=> this.handleNext()}>
                            <Text style={styles.text_button}>{"Suivant"}</Text>
                        </TouchableOpacity>}
                    </View>
                </View>
               
            </View>
        )
    }
    
  
   
    showButton() {
        if (this.state.nb_correspondance>0) {
            return (
                <TouchableOpacity style={styles.button_compteur} onPress={()=>{this.setState({nb_correspondance:this.state.nb_correspondance-1})}}>
                    <AntDesign name="minuscircle" size={50} color="#846D84" />
                </TouchableOpacity>
            )
        } 
    }
    handleConfirm() {
        this.props._toggleSetNbCorrespondance(this.state.nb_correspondance)
        this.props._toggleSetCorrespondanceModal(false)
    }
    handleFermerModal() {
        this.props._toggleResetCorrespondance()
        this.props._toggleSetCorrespondanceModal(false)
    }
    decrementer() {
        if (this.state.nb_correspondance>0) {
            this.setState({nb_correspondance:this.state.nb_correspondance-1,})
        }
    }
   
    render() {
        return (
            <Modal
            transparent={true}
            isVisible={this.props.correspondanceModalVisible}
            animationType={"slide"}

    
            style={{flex:1, alignSelf:"center", backgroundColor:"#fff" }}
          
           
          >
            <SafeAreaView style={styles.centeredView}>
                <View style={{flex:1, width:"100%", borderTopRightRadius:50, 
                    borderTopLeftRadius:50, backgroundColor:"#fff"
                }}>
            
                    <View style={[styles.container]}>
                            <View style={[styles.text_container]}>
                                <Text style={styles.text_header}>
                                {"Quelles sont vos"}
                                </Text>
                                <Text style={styles.text_header}>
                                    {"correspondances ?"}
                                </Text>
                            </View>
                            <View style={[styles.compteur_container,]}>
                                <TouchableOpacity style={styles.button_compteur} onPress={()=>{this.setState({nb_correspondance:this.state.nb_correspondance+1})}}>
                                    <AntDesign name="pluscircle" size={50} color="purple" />
                                </TouchableOpacity>
                                <View style={{height:50,width:50, justifyContent:"center", alignItems:"center"}}>
                                    <Text style={{fontSize:50, fontWeight:"bold", color:"#846D84"}}>{this.state.nb_correspondance}</Text>
                                </View>
                                <TouchableOpacity style={styles.button_compteur} onPress={()=>this.decrementer()}>
                                    <AntDesign name="minuscircle" size={50} color="#846D84" />
                                 </TouchableOpacity>
                            </View>
                            <View style={{justifyContent:"center", alignItems:"center", marginBottom:40}}>
                                {this.state.nb_correspondance==0?
                                <Image 
                                    style={styles.image} 
                                    source={require('../../assets/images/time.png')}
                                />
                                : this.renderItem(this.state.index) }
                            </View>
                        <TouchableOpacity style={styles.button_next} onPress={()=>this.handleConfirm()}>
                            <Text style={{fontSize:17, color:"#fff", fontWeight:"bold"}}>Valider</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        underlayColor={'transparent'}
                        style={{position:"absolute", top:20, left:15, }}
                        onPress={() => this.handleFermerModal()}
                        >
                            <Entypo name="cross" size={40} color="purple" />
                        </TouchableOpacity>          
                    </View>
                </View>
            </SafeAreaView>
          </Modal>
            
        );
    }
}
const mapStateToProps = (state) => {
    return {
        correspondanceModalVisible: state.ModalVisibleReducer.correspondanceModalVisible,
        nb_correspondance: state.CorrespondanceRed.nb_correspondance

    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        _toggleSetCorrespondanceModal: visible => dispatch(actionsFunction._toggleSetCorrespondanceModal(visible)),
        _toggleResetCorrespondance: () => dispatch(actionsFunction._toggleResetCorrespondance()),
        _toggleSetNbCorrespondance: (nb) => dispatch(actionsFunction._toggleSetNbCorrespondance(nb)),

    
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(CorrespondanceCustom)
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text_container: {
        justifyContent:"flex-end",
        marginTop:70,
        marginLeft:25
       },
    text_header: {
        fontWeight:"bold", 
        fontSize:32, 
        color:"#846D84",
        alignSelf:"flex-start"

    },
       text_button: {
            fontSize:25,
            fontWeight:"bold",
            color:"#fff"
       },
    compteur_container: {
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        marginTop:10

    }, 
    logo_container: {
        justifyContent:"flex-start",
        alignItems:"center"
    },
    button_compteur: {
        height:100,
        width:100, 
        borderRadius:100, 
        justifyContent:"center", 
        alignItems:"center",

    },
    button_next: {
        height:"100%",
        width:"40%",
        alignSelf:"flex-end",
        backgroundColor:"purple",
        justifyContent:"center",
        alignItems:"center",
        borderTopLeftRadius:70,
        

    },
    
   
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    button_next: {
        backgroundColor:"purple",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:70,
        height:50,
        width:"35%",
        borderRadius:60,
        alignSelf:"center",
        marginBottom:35

    },
    input_contain: {
        flexDirection: "row",
        backgroundColor: "#F2F3F4",
        borderRadius: 15,
        alignItems: "center",
        marginBottom: 20,
        width:"90%"

},
escale_text: {
  fontWeight:"bold",
  fontSize:30,
  marginVertical:10,
  alignSelf:"center",
  color:"#846D84",
},
text_input_container: {
  flex:8/10,
   paddingVertical: 20
},
icon_container: {
  flex:2/10,
  justifyContent:"center",
  alignItems:"center"
},
button_container: {
  flex:1/2,
  justifyContent:"center",
  alignItems:"center",
  
},
button: {
  justifyContent:"center",
  alignItems:"center",
  borderRadius:17,
  width:100,
  paddingVertical:13
},
text_button: {
  fontSize:15,
  fontWeight:"bold",
  marginHorizontal:10,
  color:'#fff'
},
image: {
    height:350,
    width:300
}
});

//make this component available to the app
