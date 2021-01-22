import AsyncStorage from "@react-native-async-storage/async-storage"
import Fire from "../../Fire/Fire"
import * as a from '../actions/userActionsTypes'

export const getProfile = async() => {
    try {
            const user = Fire.shared.uid
            var profile = []
            let userRef =  await Fire.shared.fireStore.collection("users").doc(user)
            //pour recupere profile
            userRef.onSnapshot( doc => {
                profile.push(doc.data())
            })
            return {type: a.GET_PROFILE, value: profile}
    } catch (error) {
        
    }
        
}
export const featching_profile = () => {
        try {
            return {type: a.FEATCHING_PROFILE}
        } catch (error) {
            alert(error)
        }   
}
export const addProfiletoStorage = async() => {
    try {
        await AsyncStorage.setItem(
          '@MySuperStore:key',
          'I like to save it.'
        );
      } catch (error) {
        // Error saving data
      }
}