import firebaseConfig from "../constants/ApiKeys"
import * as func from "../helpers/functionsHelp"
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
  
    
  
    uploadImageAsync =  async (uri, filename)=> {
        const reponse = await fetch(uri)
        const file = await reponse.blob()
        const upload = firebase.storage().ref("Images").child(filename)
        const snapshot = await upload.put(file)
        return await snapshot.ref.getDownloadURL()
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
                let ref = this.database.ref("users/"+this.uid)
                const profil = {
                    uid: this.uid,
                    userName:user.userName,
                    email:user.email,
                    name: user.name,
                    firstName: user.firstName,
                    avatar: null,
                    age: date.getFullYear()-user.age,
                    password: user.password,
                    friends:0

                }
                ref.set(profil).catch(error => {
                    console.log("erreur de saisie de données", error)
                })
                
                remoteUrl = await this.uploadImageAsync(user.avatar,this.uid+"/Avatar/").catch(error => {
                    console.log("Impossible d'obtenir l'image depuis le serveur", error)
                    alert(error)
                })
                console.log("remoteUtl", remoteUrl)
                ref.update({
                    avatar: remoteUrl
                })

        } catch (error) {
            alert(error)            
        }
       
        
    }
    
    get firebase() {
        return firebase;
    }
    get database() {
        return firebase.database();
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