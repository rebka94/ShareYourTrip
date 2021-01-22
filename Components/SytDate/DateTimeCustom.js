import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../Store/actions/actionsTypes'
import * as actionsFunction  from '../../Store/actions/actions'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, Button, Modal, SafeAreaView, TouchableHighlight} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as func from "../../helpers/functionsHelp"
// create a component
class DateTimeCustom extends React.Component {
    constructor(props){
        super(props)
        this.type=this.props.type
        this.state= {
            visible: false,
            date : new Date(),
            show: false,
            mode:"date",

        }
    }
    onChange = (selectedDate) => {
        this.setState({show:false, date:selectedDate});
      };
    
    showMode = (currentMode) => {
        this.setState({show:true, mode: currentMode});
      };
    
    showDatepicker = () => {
        this.showMode('date');
      };
    
    showTimepicker = () => {
        this.showMode('time');
      };
    handleConfirm=(date)=> {
        console.log("date", date)
    }
    showDataTimePic() {
        if (this.state.show) {
            return (
                <View style={{flex:1, justifyContent:"center", alignItems:"center",position:"absolute"}}>
                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={this.props.modalVisibleTime}
                        onDismiss={() => this.setState({ show: false })}>
                        <TouchableOpacity style={{flex:1, justifyContent:"center", alignItems:"center"}} onPress={()=>this.setState({show:false})}>
                            {/*<DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.date}
                            mode={this.state.mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.onChange}
                            
                            style={{width: "25%", height:"50%"}}
                            />*/}
                            <DateTimePickerModal
                             isVisible={this.state.show}
                             mode={this.state.mode}
                             is24Hour={true}
                             display={"default"}
                             onConfirm={this.onChange}
                             onCancel={()=>this.setState({show:false})}
                             style={{height:"24%", width:this.state.mode=="time"?"19.5%":"30%", alignSelf:"center", }}
                             cancelTextIOS={"Annuler"}
                             confirmTextIOS={"Confirmer"}
                             pickerContainerStyleIOS={{justifyContent:"center", alignItems:"center"}}
                             headerTextIOS={this.state.mode=="date"?"Choisissez votre date":"Choisissez votre heure"}
                            />  
                        </TouchableOpacity>
                        
                    </Modal>
                    
                </View>
                
                

            )
        }
    }
   
    /**
     * fonction qui valide les données et les envoies à redux 
     */
   
    handleNext=()=> {
        if (this.type=="departure" ) {
            this.props._toggleDateTimeDeparture(this.state.date)
        }
        if (this.type=="arrival" ) {
            this.setState({date:this.props.arrivalDateTime})
            this.props._toggleDateTimeArrival(this.state.date)
        }
        this.props._toggleSetDateTimeModal(false)
    }
    
    componentDidMount() {
        if (this.type=="departure" && this.props.departureDateTime!=null)
            this.setState({date:this.props.departureDateTime})
        if (this.type=="arrival" && this.props.arrivalDateTime!=null)
            this.setState({date:this.props.arrivalDateTime})
    }

    
    render() {
        console.log("custom",this.props)
        return (
            <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            style={{flex:1, width:"100%", alignSelf:"center", }}

        
          >
             <SafeAreaView style={styles.centeredView}>
                <View style={{flex:1, width:"100%", 
                backgroundColor:"#fff", borderTopRightRadius:50,
                borderTopLeftRadius:50
                }}>

                
                    <View style={styles.container}>
                        <View style={{flex:1}}>
                            <Image 
                                 style={styles.image} 
                                source={require('../../assets/images/time.png')}
                                 />
                                
                            <View style={{flex:3/10, }}>
                                <View style={[styles.text_container]}>
                                    <Text style={{fontWeight:"bold", fontSize:35, marginTop:25, color:"#846D84", marginLeft:24}}>
                                        {"Quand est-ce que"}
                                    </Text>
                                    <Text style={{fontWeight:"bold", fontSize:35, color:"#846D84", marginLeft:25}}>
                                        {this.type=="departure"?"vous partez ?":"vous arriver ?"}
                                    </Text>
                                </View>
                            </View> 
                            <View style={{flex:7/10, justifyContent:"center", alignItems:"center"}}>
                                {this.showDataTimePic()}

                            
                           
                                <View style={styles.date_time_content}>
                                    <TouchableOpacity style={styles.time_date} onPress={()=>this.showTimepicker()} >
                                        <Ionicons name="ios-time" size={50} color="purple" />
                                        <Text style={{fontWeight:"bold", color:"#846D84", fontSize:20}}>{"Heure du voyage:"}</Text>
                                        <Text style={{fontWeight:"bold", color:"#846D84", fontSize:22}}>
                                        {func.getTimeFormat(this.state.date)}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.time_date}   onPress={()=>this.showDatepicker()}>
                                        <FontAwesome5 name="calendar-day" size={50} color="purple"/>
                                        <Text style={{fontWeight:"bold",color:"#846D84", fontSize:20, alignSelf:'center'}}>{"Date du voyage"}</Text>
                                        <Text style={{fontWeight:"bold", color:"#846D84", fontSize:22, alignSelf:'center'}}>
                                        {func.getDateFormat(this.state.date)}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.logo_container}>
                                <Text style={{fontWeight:"bold", fontSize:35, marginLeft:17, 
                                    marginVertical:30, color:"purple", alignSelf:"center"}}>ShareYourTrip</Text>
                            </View>
                            <TouchableOpacity style={styles.button_next} onPress={()=>this.handleNext()}>
                                <Text style={{fontSize:17, color:"#fff", fontWeight:"bold"}}>Valider</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableHighlight
                        underlayColor={'transparent'}
                        style={{ backgroundColor: "#fff", position:"absolute", top:40, left:15, }}
                        onPress={() => {
                        this.props._toggleSetDateTimeModal(false)
                        }}
                    >
                        <Entypo name="cross" size={40} color="purple" />
                    </TouchableHighlight>
             </SafeAreaView>
          </Modal>
            
        );
    }
}
const mapStateToProps = (state) => {
    return {
        departureDateTime: state.DateTimeReducer.departureDateTime,
        arrivalDateTime: state.DateTimeReducer.arrivalDateTime,
        modalVisibleTime: state.ModalVisibleReducer.dateTimeModalVisible,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        _toggleDateTimeDeparture: dateTime => dispatch(actionsFunction._toggleDateTimeDeparture(dateTime)),
        _toggleDateTimeArrival: dateTime => dispatch(actionsFunction._toggleDateTimeArrival(dateTime)),
        _toggleSetDateTimeModal: visible => dispatch(actionsFunction._toggleSetDateTimeModal(visible)),

    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(DateTimeCustom)
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    logo_container: {
        justifyContent:"center",
        alignItems:"center",
    },
    image: {
        position:"absolute",
        top:70,
        left:80,
        height:300,
        width:350
        },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    date_time_content: {
        height:150,
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
    },
    time_date: {
        height:140,
        width:250,
        marginVertical:20,
        borderRadius:15,
        justifyContent:"center", 
        alignItems:"center",
    },

 
    header_modal: {
        height:100,
        width:"100%",
        borderBottomWidth:3,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderBottomColor:"#fafafa",
        justifyContent:"center",
        alignContent:"center",
        flexDirection:"row",
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
    text_container: {
        justifyContent:"center",
        marginTop:70
    }


});

//make this component available to the app
