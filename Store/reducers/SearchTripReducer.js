import { combineReducers } from 'redux'


import * as actions from '../actions/actionsTypes'
const SytData = {
InfoLocation : {
  departure: "",
  arrival:"",
},
infoDate : {
  departureDateTime:new Date(),
  arrivalDateTime:new Date(),
},
infoCorrespondance: {
  nb_correspondance:0,
  correpondance_data: []
},
}
const modalState = {
  dateTimeModalVisible: false,
  locationModalVisible: false,
  correspondanceModalVisible:false
}

const  VoyageReducer = (state = {}, action)=> {
  let nextState
  switch (action.type) {
    case actions.ADD_VOYAGE:
        return action.value
  default:
    return state
  }
}
const  ModalVisibleReducer = (state = modalState, action)=> {
  let nextState
  switch (action.type) {
    case actions.SET_VISIBILITE_MODAL_DATE_TIME:
      nextState = {
          ...state,
          dateTimeModalVisible:action.value
    }
    return nextState || state
    case actions.SET_VISIBILITE_MODAL_LOCATION:
      nextState = {
          ...state,
          locationModalVisible:action.value
    }
    return nextState || state
    case actions.SET_VISIBILITE_MODAL_CORRESPONDANCE:
      nextState = {
          ...state,
          correspondanceModalVisible:action.value
    }
    return nextState || state
  default:
    return state
  }
}



const  SearchLocationRed = (state = (SytData.InfoLocation), action)=> {
  let nextState
  switch (action.type) {
    case actions.TOGGLE_DEPARTURE:
        nextState = {
            ...state,
            departure:action.value
      }
      return nextState || state

    case actions.TOGGLE_ARRIVAL:
        nextState = {
            ...state,
            arrival:action.value
      }
      return nextState || state
    
    case actions.TOGGLE_RESET: 
        nextState = {
            ...state,
            departure: null,
            arrival:null
    }
      return nextState || state
  default:
    return state
  }
}
const  CorrespondanceRed = (state = (SytData.infoCorrespondance), action)=> {
  let nextState
  switch (action.type) {
 
      case actions.TOGGLE_SET_NB_CORRESPONDANCE:
        nextState = {
            ...state,
            nb_correspondance:action.value
      }
      return nextState || state
      case actions.ADD_STOP_OVER:
        nextState = {
            ...state,
            correpondance_data:action.value
      }
      return nextState || state
      case actions.INCREMENTER_CORRESPONDANCE:
        nextState = {
            ...state,
            nb_correspondance:state.nb_correspondance+1
      }
      return nextState || state
      case actions.DECREMENTER_CORRESPONDANCE:
        nextState = {
            ...state,
            nb_correspondance:state.nb_correspondance-1
      }
      return nextState || state
      case actions.TOGGLE_RESET_CORRESPONDANCE: 
        nextState = {
          nb_correspondance:0,
          correpondance_data:[]
    }
      return nextState || state
      
  default:
    return state
  }
}
const  DateTimeReducer = (state = (SytData.infoDate), action)=> {
  let nextState
  switch (action.type) {
    case actions.TOGGLE_DATE_TIME_DEPARTURE:
        nextState = {
            ...state,
            departureDateTime:action.value
      }
      return nextState || state
    case actions.TOGGLE_DATE_TIME_ARRIVAL:
        nextState = {
            ...state,
            arrivalDateTime:action.value
    }
    return nextState || state
    case actions.TOGGLE_RESET: 
        nextState = {
          ...state,
          departureDateTime:null,
          arrivalDateTime:null

    }
    return nextState || state
      
  default:
    return state
  }
}



export default combineReducers({SearchLocationRed, CorrespondanceRed, DateTimeReducer, ModalVisibleReducer})