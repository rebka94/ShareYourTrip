import Constants from "expo-constants"
import * as Permissions from "expo-permissions"
import {Notifications} from "expo"
import Fire from '../Fire/Fire'


class UserPermissions {
    getCameraPermission = async () => {
        if (Constants.platform.android) {

            const status = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if (status !="granted") {
                alert("On a besoin de votre accord pour accéder à votre galerie.")
            }
        }
    }
    registerForePushNotifications = async () => {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus =  existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status
        } 
        if ( finalStatus !== 'granted') {
            return;
        }
        let token = await Notifications.getDevicePushTokenAsync();
        let uid = Fire.shared.uid
        Fire.shared.fireStore.collection('users').doc(uid).update({
            appPushToken: token
        })
    }
}

export default new UserPermissions()