import AsyncStorage from '@react-native-async-storage/async-storage'
import Fire from "../../SYT/Fire/Fire.js"

export const  getProfile = async () => {
    try {
        const value = await AsyncStorage.getItem("user");
        if (value!==null) {
            //we have data 
            console.log('we have data ')

            return (JSON.parse(value))
        }
      } catch (error) {
        alert(error)
      }
}


