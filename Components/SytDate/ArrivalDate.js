//import liraries
import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../Store/actions/actionsTypes'
import * as actionsFunction  from '../../Store/actions/actions'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, Button, Modal, SafeAreaView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as func from "../../helpers/functionsHelp"


/**
 * Classe qui où on peut mettre le l'arrivé du voyage 
 */
class ArrivalDate extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            visible: false,
            date : new Date(),
            show: false,
            mode:"date",
        }
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
      };
     
      hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
      };
     
      handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.hideDateTimePicker();
      };
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date
        console.log("ici",date)
        this.setState({show:Platform.OS === 'ios', date:currentDate});
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
    showDataTimePic() {
            
            if (this.state.show) {
                return (
                    <View style={{flex:1, justifyContent:"center", alignItems:"center",position:"absolute"}}>
                        <Modal
                            transparent={true}
                            animationType="slide"
                            visible={this.state.show}
                            onDismiss={() => this.setState({ visible: false })}>
                            <TouchableOpacity style={{flex:1, justifyContent:"center", alignItems:"center"}} onPress={()=>this.setState({show:false})}>
                                <DateTimePicker
                                testID="dateTimePicker"
                                value={this.state.date}
                                mode={this.state.mode}
                                is24Hour={true}
                                display="default"
                                onChange={this.onChange}
                                
                                style={{width: "25%", height:"50%"}}
                                />
                            </TouchableOpacity>
                            
                        </Modal>
                        
                    </View>
                    
                    
    
                )
            }
        
    }
    handleNext() {
        this.props._toggleDateTimeArrival(this.state.date)
        this.props.navigation.navigate("EscaleNumbreScreen")

    }

   

    
    componentDidMount() {
        if (this.props.arrivalDateTime!=null)
            this.setState({date:this.props.arrivalDateTime})
    }
  
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle='light-content0' backgroundColor="purple"/>
                <View style={{height:40, backgroundColor:"purple", justifyContent:"center", alignItems:"flex-start"}}>
                    <TouchableOpacity style={{justifyContent:"center", alignItems:"center", marginLeft:15}} onPress={()=>{this.props.navigation.goBack()}}>
                        <AntDesign name={"arrowleft"} size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{flex:1, backgroundColor:"white"}}>
                    <Image 
                        style={styles.image} 
                        source={require('../../assets/images/time.png')}
                        />
                   
                    <View style={{flex:2/10}}>
                    <Text style={{fontWeight:"bold", fontSize:35, marginTop:25, color:"#846D84", marginLeft:15}}>
                            {"Quand est-ce que"}
                        </Text>
                        <Text style={{fontWeight:"bold", fontSize:35, color:"#846D84", marginLeft:15}}>
                            {"vous arriver ?"}
                        </Text>
                    </View>  
                    <View style={{flex:8/10, justifyContent:"center", alignItems:"center"}}>
                        <Text>{this.state.dateDisplay}</Text>
                        {this.showDataTimePic()}
                        <View style={styles.date_time_content}>
                            <TouchableOpacity style={styles.time_date} onPress={()=>this.showTimepicker()}  >
                                <Ionicons name="ios-time" size={50} color="purple" />
                                <Text style={{fontWeight:"bold", color:"#846D84", fontSize:20}}>{"Heure du voyage:"}</Text>
                                <Text style={{fontWeight:"bold", color:"#846D84", fontSize:22}}>
                                    {func.getTimeFormat(this.state.date)}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.time_date}   onPress={()=>this.showDatepicker()}>
                                <FontAwesome5 name="calendar-day" size={50} color="purple"/>
                                <Text style={{fontWeight:"bold", color:"#846D84", fontSize:20, alignSelf:'center'}}>{"Date du voyage"}</Text>
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
                                <AntDesign name="arrowright" size={40} color="white" />
                            </TouchableOpacity>
                    </View>
            </SafeAreaView>
                
        );
    }
}


const mapStateToProps = (state) => {
    return {
        arrivalDateTime: state.DateTimeReducer.arrivalDateTime
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        _toggleDateTimeArrival: dateTime => dispatch(actionsFunction._toggleDateTimeArrival(dateTime)),
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(ArrivalDate)

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'purple',
    },
    image: {
        position:"absolute",
        top:100,
        left:80,
        height:300,
        width:350
        },
    logo_container: {
        justifyContent:"center",
        alignItems:"center",
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
        alignItems:"center"},

 
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
        marginRight:25,
        height:60,
        width:60,
        borderRadius:60,
        alignSelf:"flex-end",
        marginBottom:15

    },


});

//make this component available to the app
