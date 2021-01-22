import firebaseConfig from "../constants/ApiKeys"
import * as firebase from "firebase"
import "firebase/firestore"
import Constants from "expo-constants"
import * as Permissions from "expo-permissions"
import { not } from "react-native-reanimated"
class Fire {
    constructor() {
        this.initFireBase()
    
    }
    initFireBase=() =>{
       
            firebase.initializeApp(firebaseConfig)
        
    }
    fetchMessages= async  ()=> {
        const messages = await this.messageRef
          .orderBy('created_at', 'desc')
          .limit(10)
          .get()
    
        return messages.docs
      }
      createMessage = async({ message, uid })=>  {
        await this.messageRef.add({
          message,
          user_id: uid,
          created_at: new Date()
        })
      }
    
    
  
    uploadImageAsync =  async (uri, filename)=> {
        const reponse = await fetch(uri)
        const file = await reponse.blob()
        const upload = firebase.storage().ref("Images").child(filename)
        const snapshot = await upload.put(file)
        return await snapshot.ref.getDownloadURL()
      }
    
 

    addFriendRequest =  (user) => {
        try {
                    let frsRef= this.fireStore.collection("notifications").doc(this.uid).collection('friends_request_send').doc(user.uid)
                    let frrRef = this.fireStore.collection("notifications").doc(user.uid).collection('friends_request_receive').doc(this.uid)
                    let userRef = this.fireStore.collection('users')
                    userRef.doc(user.uid).onSnapshot( doc=> {
                        frsRef.set({
                            uid: user.uid,
                            avatar: doc.data().avatar,
                            userName: doc.data().userName
                        })
                    })
                    userRef.doc(user.uid).onSnapshot( doc=> {
                        frrRef.set({
                            uid: this.uid,
                            avatar: doc.data().avatar,
                            userName: doc.data().userName
                        })
                    })
        } catch (error) {
            alert(error)
        }
    }
    dellFriendRequest = (user) => {
        let notRef = this.fireStore.collection("notifications")
        let notRefReceive = notRef.doc(user.uid).collection('friends_request_receive').where('uid', '==', this.uid)
        let notRefSend = notRef.doc(this.uid).collection('friends_request_send').where('uid', '==', user.uid)
        notRefReceive.get().then(doc => {
            doc.forEach(instance => {
                instance.ref.delete().catch(console.log('probleme de supression'))  
            })
        })     
        notRefSend.get.then(doc => {
            doc.forEach(instance => {
                instance.ref.delete().catch(console.log('probleme de supression'))
            })

        })     
    }
    addFriends = async (friend) => {
        try {
            let usersRef = this.fireStore.collection('users')
            usersRef.doc(friend.uid).onSnapshot( doc => {
                usersRef.doc(this.uid).collection('friends').add({
                    uid: doc.data().uid,
                    avatar:doc.data().avatar,
                    userName:doc.data().userName
                })
                usersRef.doc(friend.uid).update({
                    friends: doc.data().friends+1
                })
            })
            usersRef.doc(this.uid).onSnapshot( doc => {
                usersRef.doc(friend.uid).collection('friends').add({
                    uid: doc.data().uid,
                    avatar:doc.data().avatar,
                    userName:doc.data().userName
                })
                usersRef.doc(this.uid).update({
                    friends: doc.data().friends+1
                })
            })
        } catch (error) {
            alert(error)
        }    
    }     
    delFriends = (friend) => {
        try { 
             this.fireStore.collection("users").doc(this.uid).collection("friends").where('uid', '==', friend.uid).onSnapshot( doc => {
                if (!doc.empty) {
                    doc.forEach(snapshot=> {
                        snapshot.ref.delete()
                    })
                }
            })
        } catch (error) {
            alert("Erreur", error)
        }
    }
   
   

   
   
    createUser = async user => {
        let remoteUrl = null
        let Fail = null
        let date = new Date()
        console.log(user)
        try {
            console.log('ici', user)
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(newUser =>
                newUser.user.updateProfile({displayName:user.userName, email: user.email}).catch( error => {
                    console.log("error updateProfile ou création de profile: ", error)
                })).catch( error => {
                    console.log("error de création de compte", error)
                    alert(error)
                })
                let db = this.fireStore.collection("users").doc(this.uid);
                db.set({
                    uid: this.uid,
                    userName:user.userName,
                    email:user.email,
                    name: user.name,
                    firstName: user.firstName,
                    avatar: null,
                    friends: 0,
                    shareYourTrip: 0,
                    age: date.getFullYear()-user.age,
                    password: user.password,
                    onLine:false,
                }).catch(error => {
                    console.log("erreur de saisie de données", error)
                })
                
                remoteUrl = await this.uploadImageAsync(user.avatar,this.uid+"/Avatar/").catch(error => {
                    console.log("Impossible d'obtenir l'image depuis le serveur", error)
                    alert(error)
                })
                console.log("remoteUtl", remoteUrl)
                db.update({
                    avatar: remoteUrl
                })

        } catch (error) {
            alert(error)            
        }
       
        
    }
    get firebase() {
        return firebase;
    }
    get fireStore() {
        return firebase.firestore();
    }
    get storage() {
        return firebase.storage();
    }
    get onAuthStateChanged() {
        firebase.auth().onAuthStateChanged(user => {
            return user;
        })
    }
    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
    get userName() {
        return (firebase.auth().currentUser || {}).displayName;
    }
    signOut = () => {
     firebase.auth().signOut();
    }
    get timestamp() {
        return Date.now();
    }
    signIn(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(error => alert("Error"+error))
    }
}

Fire.shared = new Fire()

export default Fire