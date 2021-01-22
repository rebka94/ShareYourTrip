import * as A from '../actions/actionsTypes'
import Fire from "../../Fire/Fire"
const uid = Fire.shared.uid
export const  sendMessage= async(text, user) => {
    return (dispatch) => {
        try {
            const chatMessage = {
                text,
                sentBy: user,
                sentAt: Fire.shared.timestamp
            }
            Fire.shared.fireStore.collection('conversations').doc(uid).collection(messages).doc(user.uid)
            .collection(messages).add(
                chatMessage
            )
            Fire.shared.fireStore.collection('conversations').doc(user.uid).collection(messages).doc(uid)
            .collection(messages).add(
                chatMessage
            )
            
            
        } catch (error) {
            alert(error)
        }   
    }
    
}
export const  displayCoversations= async(user) => {
    return (dispatch) => {
        try {
            dispatch({type: A.FEATCHING_CONVERSATIONS})
            const _unsubscribeFriends = Fire.shared.fireStore.collection("conversations").doc(uid).collection("messages")
            _unsubscribeFriends
             .onSnapshot(snapshot=> {
                 if (!snapshot.empty) {
                     const docs = snapshot.docs.map((docSnapshot) => (
                         docSnapshot.id
                       ))

                       
             //récuperer le dernier message de chaque conversation
     
                     console.log("tout est bon")
                 } else {
                     console.log("aucune donnée récupérée ")
     
                 }
              })
            
            
      
            
            
        } catch (error) {
            alert(error)
        }   
    }
    
}