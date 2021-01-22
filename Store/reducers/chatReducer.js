import * as A from '../actions/actionsTypes'
const INITAL_STATE = { fetching: false, messages: [], conversations: []};

/**
 * @param {Object} state 
 * @param {Object} action
 * @returns {Object} New state
*/
export default (state= INITAL_STATE, action) => {
    switch (action.type) {
        case A.MESSAGE_RECEIVED:
            return {
                ...state,
                fetching: false, messages: action.playload
            }
            break;
        case A.FEATCHING_MESSAGES: 
            return {INITAL_STATE, fetching:true}
            break;
            case A.FEATCHING_CONVERSATIONS: 
            return {...state,
                conversations: action.convers
            }
            break;
        default:
            return state;
            break;
    }
}