//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image, Modal, TouchableHighlight, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as func from "../../helpers/functionsHelp"
import { FontAwesome } from '@expo/vector-icons';
import {connect} from 'react-redux'
import * as actions from '../../Store/actions/actionsTypes'
import * as actionsFunction  from '../../Store/actions/actions'
import DepartureDate from '../SytDate/DepartureDate';
import DateTimeCustom from '../SytDate/DateTimeCustom';
import SytLocationCustom from "../SytLocation/SytLocationCustom"
import { Entypo } from '@expo/vector-icons';
import CorrespondanceCustom from './CorrespondanceCustom';
// create a component
class SearchTrip extends Component {
    constructor(props) {
        super(props)
        this.state={
            departure:"",
            arrival:"",
            nbCorrespondance:0,
            isCorrespondance:false, 
            dateTimeModalVisible:this.props.dateTimeModalVisible, 
            type: ""
        }
    }
    /**
     * affiche le modal de temps et calendrier 
     * @param {*} type 
     */
    displayModalTime(type) {
        return (
            <DateTimeCustom type={type}/>
        )
    }
    /**
     * affiche le modal de localité 
     * @param {*} type 
     */
    displayModalLocation(type) {
        return (
            <SytLocationCustom type={type}/>
        )
          
    }
    /**
     * affiche le modal de corrependance 
     * @param {*} type 
     */
    displayModalCorrespondance(type) {
        return (
            <CorrespondanceCustom/>
        )
          
    }
    componentDidMount() {
        if (this.props.departureDateTime!=null) {
                this.setState({departureDateTime:this.props.departureDateTime})
        }
        if (this.props.arrivalDateTime!=null) {
            this.setState({arrivalDateTime:this.props.arrivalDateTime})
        }


    }
    dateTimeOnpress(type) {
        this.setState({type:type})
        this.props._toggleSetDateTimeModal(true)
        
    }
    locationOnpress(type) {
        this.setState({type:type})
        this.props._toggleSetLocationModal(true)
    }
    
    correspondanceOnpress() {
        this.props._toggleSetCorrespondanceModal(true)
    }
    toggleDeleteCorrespondance() {
        if (this.props.nb_correspondance>0) {
            if (this.props.correpondance_data.length>=1) {
                this._showAlert()
                this.props._toggleSetCorrespondanceModal(false)
            } else {
                this.props._toggleResetCorrespondance()
                this.props._toggleSetCorrespondanceModal(false)
            }
        }
    }
    _showAlert() {// Affichage d'un message d'alerte avant la mise à zéro du score (et donc de la state)
    Alert.alert(
        'Suppression des correspondances',
        'Êtes-vous sûr(e) de vouloir supprimer\nles correspondances saisites ?.',
        [
          {text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Oui !', onPress: () =>this.props._toggleResetCorrespondance()},
        ],
        { cancelable: false }
    )}
    render() {
        console.log(this.props)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="purple"/>
                {this.props.dateTimeModalVisible
                 && this.displayModalTime(this.state.type)
                }{/*on affiche le custom 
                de temps en fonction du type depart ou bien arrivée */ }
                {this.props.locationModalVisible
                 && this.displayModalLocation(this.state.type)
                }{/*on affiche le custom 
                de temps en fonction du type depart ou bien arrivée */
                 }
                {this.props.correspondanceModalVisible
                && this.displayModalCorrespondance()/*on affiche la page Modal 
                de correspondance */  }
                <View style={{flex:1, backgroundColo:"purple"}}>
                    
                    <View style={{flex:3/10, backgroundColor:"#F5E7FF"}}>
                        <View style={styles.header}></View> 
                    </View>
                    <View style={{flex:7/10, backgroundColor:"#F5E7FF", borderTopLeftRadius:100}}>
                   
                        
                    </View>  
                    <Image 
                    style={[styles.image2, {position:"absolute", top:20, right:15}]} 
                    source={require('../../assets/images/destination2.png')}
                    />
                
                <Image 
                    style={[styles.image, {position: "absolute", bottom:20, right:0}]} 
                    source={require('../../assets/images/destination.png')}
                    />
                    <View style={{position:"absolute", top:50, width:"100%", alignSelf:"center"}}>
                        <Text style={[styles.text_header, {marginLeft:15}]}>
                            {"Dites nous où voulez-vous aller ?"}
                            </Text>
                        <View style={styles.location_date_container}>
                            <View style={styles.location_container}>
                                <TouchableOpacity onPress={()=>this.locationOnpress("departure")} >
                                    <Text style={styles.text_location}>
                                    {this.props.departure==""?"Départ":this.props.departure.code}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.date_container}>
                                <TouchableOpacity onPress={()=>this.dateTimeOnpress("departure")}>
                                    <Text style={styles.text_date}>{func.getDateFormat(this.props.departureDateTime)}</Text>
                                    <Text style={styles.text_date}>{func.getTimeFormat(this.props.departureDateTime)}</Text>
                                </TouchableOpacity>
                            </View>
                            
                          
                        </View>
                        <View style={[styles.location_date_container, {marginTop:20}]}>
                            <View style={styles.location_container}>
                                <TouchableOpacity onPress={()=>this.locationOnpress("arrival")}>
                                    <Text style={styles.text_location}>
                                        {this.props.arrival==""?"Destination":this.props.arrival.code}</Text> 
                                </TouchableOpacity>
                            </View>
                            <View style={styles.date_container}>
                                <TouchableOpacity onPress={()=>this.dateTimeOnpress("arrival")}>
                                    <Text style={styles.text_date}>{func.getDateFormat(this.props.arrivalDateTime)}</Text>
                                    <Text style={styles.text_date}>{func.getTimeFormat(this.props.arrivalDateTime)}</Text>
                                </TouchableOpacity>
                            </View>     
                        </View>
                        <View style={[styles.escale_container, {width:"80%", marginTop:15, justifyContent:"center", alignItems:"center"}]}>
                            <Text style={[styles.text_header, {fontSize:25, color:"#A9A3A9", alignSelf:"center"}]}>{"Comporte t-il\nune correspondance ?"}</Text>
                        </View>
                        <View style={styles.escale_container}>
                            <View style={styles.button_escale_container}>
                                <TouchableOpacity 
                                    style={[styles.button_escale,
                                    {backgroundColor:"#fff",
                                    borderBottomWidth:5, borderColor:this.props.nb_correspondance>0?"purple":"#fff"}]}
                                    onPress={()=>this.props._toggleSetCorrespondanceModal(true)}
                                    >
                                    <Text style={styles.text_button_escale}>
                                        {"oui"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{justifyContent:"center", alignItems:"center"}}>
                                 <Text styles={styles.text_header}>{this.props.nb_correspondance>0?this.props.nb_correspondance:null}</Text>
                            </View>
                            <View style={styles.button_escale_container}>
                                <TouchableOpacity 
                                    style={[styles.button_escale,
                                    {backgroundColor:"#fff",
                                    borderBottomWidth:5, borderColor:this.props.nb_correspondance>0?"#fff":"purple"}]}
                                    onPress={()=> this.toggleDeleteCorrespondance()}
                                >
                                    <Text style={styles.text_button_escale}>
                                        {"non"}
                                    </Text>
                                </TouchableOpacity>
                            </View> 
                        </View>
                            <TouchableOpacity style={[styles.search_button, {position: "relative", marginTop:20}]}>
                                <Text style={styles.search_text}>
                                {"Rechercher"}
                                </Text>
                                <FontAwesome name="search" size={27} color="#fff" />
                        </TouchableOpacity>
                    </View> 
                      
                </View>
                
                
                        
            </SafeAreaView>
        );
    };

}
const mapStateToProps = (state) => {
    return {
        departureDateTime: state.DateTimeReducer.departureDateTime,
        arrivalDateTime: state.DateTimeReducer.arrivalDateTime,
        dateTimeModalVisible: state.ModalVisibleReducer.dateTimeModalVisible,
        locationModalVisible: state.ModalVisibleReducer.locationModalVisible,
        correspondanceModalVisible: state.ModalVisibleReducer.correspondanceModalVisible,
        departure:state.SearchLocationRed.departure,
        arrival: state.SearchLocationRed.arrival,
        nb_correspondance: state.CorrespondanceRed.nb_correspondance,
        correpondance_data: state.CorrespondanceRed.correpondance_data

    }
  }
    
  const mapDispatchToProps = (dispatch) => {
    return {
        _toggleSetDateTimeModal: visible => dispatch(actionsFunction._toggleSetDateTimeModal(visible)),
        _toggleSetLocationModal: visible => dispatch(actionsFunction._toggleSetLocationModal(visible)),
        _toggleSetCorrespondanceModal: visible => dispatch(actionsFunction._toggleSetCorrespondanceModal(visible)),
        _toggleResetCorrespondance: visible => dispatch(actionsFunction._toggleResetCorrespondance()),

    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(SearchTrip)



// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"purple"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    location_date_container: {
        height:60,
        width:"80%",
        padding:10,
        backgroundColor:"#E8DAEF",
        alignItems:"center",
        borderRadius:15,
        alignSelf:"center",
        opacity:0.9,
        flexDirection:"row"
    },
    search_text: {
        fontSize:17, 
        color:"#fff",
        marginHorizontal:10, 
        fontWeight:"bold",
    },
    text_button_escale: {
        fontSize:20,
        fontWeight:"bold"
    },
    date_container: {
        flex:5/10,
        justifyContent:"center",
        alignItems:"center"
    },
    image3: {

    },
    search_button: {
        padding:10,
        borderRadius:20,
        backgroundColor:"purple",
        flexDirection:"row",
        width:"40%",
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        marginBottom:20,
        position:"relative",


    },
    text_date: {
        fontSize:14,
        fontWeight:"bold",
        color:"#A9A3A9"
    },
    location_container: {
        flex:5/10
    },
    text_location: {
        fontSize:20,
        fontWeight:"bold",
        color:"#A334A3",
        opacity:0.8
    },
    text_header: {
        fontWeight:"bold", 
        fontSize:35, 
        marginVertical:20, 
        color:"#fff", 
        marginLeft:5
    },
    image: {
        position:"absolute",
        height:350,
        width:350,
        bottom:20,
        right:1
    },
    image2: {
        position:"absolute",
        height:170,
        width:170,
        bottom:40,
        right:35
    },
    escale_container: {
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#E8DAEF",
        marginTop:30,
        opacity:0.9,
        width:"65%",
        borderRadius:35,
        alignSelf:"center"
    },
    button_escale_container: {
        flex:1/2,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:30
    },
    textinput: {
        height:50,
        width:300,
        backgroundColor:"#EFECF4",
        borderRadius:20,
        alignSelf:"center",

    },
    button_escale: {
        height:60,
        width:80,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:20
    },
    header: {
        flex:1, 
        backgroundColor:"purple",
        justifyContent:"center",
        alignItems:"flex-start",
        borderBottomRightRadius:100,
        paddingHorizontal:20
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
        marginVertical:8,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.30,
shadowRadius: 4.65,

elevation: 8,
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
})

//make this component available to the app
