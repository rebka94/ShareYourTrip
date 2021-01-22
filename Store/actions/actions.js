import  AsyncStorage  from "@react-native-async-storage/async-storage"
import * as actions from './actionsTypes'
import Fire from "../../Fire/Fire"
import {Voyage} from "../../classes/Voyage"

export const _toggleLocationDeparture= (item)=>{
    return {type: actions.TOGGLE_DEPARTURE, value: {name:item.name, code:item.code}}
}
export const _toggleLocationArrival= (item)=>{
    return {type: actions.TOGGLE_ARRIVAL, value: {name:item.name, code:item.code}}
}
export const _resetLocation= ()=>{
    return {type: actions.TOGGLE_RESET}
}
export const _toggleDateTimeDeparture= (DateTime)=>{
    return {type: actions.TOGGLE_DATE_TIME_DEPARTURE, value: DateTime}
}
export const _toggleDateTimeArrival= (DateTime)=>{
    return {type: actions.TOGGLE_DATE_TIME_ARRIVAL, value: DateTime}
}
export const _toggleCorrespondanceSearch= (stopOver)=>{
    return {type: actions.TOGGLE_STOPOVER_SEARCH, value: stopOver}
}
export const _toggleCorrespondanceNumbre= (nb)=>{
    return {type: actions.TOGGLE_STOPOVER_NB, value: nb}
}
export const _toggleResetGlobal= ()=>{
    return {type: actions.TOGGLE_RESET}
}


export const _toggleAddStopOver= (escale)=>{
    return {type: actions.ADD_STOP_OVER, value: escale}
}
export const _toggleDecrementerCorrespondance= ()=>{
    return {type: actions.DECREMENTER_CORRESPONDANCE}
}
export const _toggleIncrementerCorrespondance= ()=>{
    return {type: actions.INCREMENTER_CORRESPONDANCE}
}

export const _toggleSetDateTimeModal= (visible)=>{
    return {type: actions.SET_VISIBILITE_MODAL_DATE_TIME, value: visible}
}
export const _toggleSetLocationModal= (visible)=>{
    return {type: actions.SET_VISIBILITE_MODAL_LOCATION, value: visible}
}
export const _toggleSetCorrespondanceModal= (visible)=>{
    return {type: actions.SET_VISIBILITE_MODAL_CORRESPONDANCE, value: visible}
}
export const _toggleResetCorrespondance= ()=>{
    return {type: actions.TOGGLE_RESET_CORRESPONDANCE}
}
export const _toggleSetNbCorrespondance= (nb)=>{
    return {type: actions.TOGGLE_SET_NB_CORRESPONDANCE, value:nb}
}
const uuidv4= ()=> {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
export const _toggleAddSyt= (voyage)=> {
    const syt = {
            uid: Fire.shared.uid,
            id:voyage.id,
            departure: voyage.departure,
            arrival: voyage.arrival,
            departureDateTime:voyage.departureDateTime,
            departureArrivalTime:voyage.arrivalDateTime,
            listeEscales:voyage.listeEscales.length>0?voyage.listeEscales:""
        
    }
    AsyncStorage.getItem('voyages', (err, result) => {
        
        const item = [syt];
        if (result !== null) {
          console.log('Data Found', result);
          var newSyt = JSON.parse(result).concat(item);
          AsyncStorage.setItem('voyages', JSON.stringify(newSyt));
        } else {
          console.log('Data Not Found');
          AsyncStorage.setItem('voyages', JSON.stringify(item));
        }
      });
  
    return {type: actions.ADD_SYT}
}
