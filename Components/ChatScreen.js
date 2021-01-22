import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, KeyboardAvoidingView, StatusBar} from 'react-native';
import Fire from '../Fire/Fire';
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {AutoScrollFlatList} from "react-native-autoscroll-flatlist";

const data = [
  {
      id: "1",
      text: "cc cv ?",
      createdAt: 54574545455,
      user : {
        uid: Fire.shared.uid,
      name: 'React ',
      firstName:"Native",
      avatar: 'https://placeimg.com/140/140/any',
      }
  },
  {
      id: "2",
      text: "tfk?",
      createdAt: 54574545455,
      user : {
        uid: Fire.shared.uid,
      name: 'React ',
      firstName:"Native",
      avatar: 'https://placeimg.com/140/140/any',
      }


  },

]
export default class ChatScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uid: Fire.shared.uid,
      user: {},
      person:{},
      text:"",
      messages:  [
        {
          id: "1",
          text: "Svp, Attendez le temps que les messages se chargent...",
          createdAt: this.convertTime(new Date()),
          user : {
            uid: 1,
            name: "L'équipe ",
            firstName:"ShareYourTrip",
            avatar: require("../assets/logoSYT.png"),
          }
    
    
      },
      ],
      isOnline: false

    }
    this.userRef=null,
    this.referenceMessagesUser = null;
    this.referenceConversationUser = null;
    this.referenceMessages = {};
    this.unsubscribeNetInfo = null;
    this._isMounted = false;

    
  }
  /**
     * @type {InnerFunctions.getMessages}
     *  get messages from storage, convert string to object and update messages state
    */
   async getMessages() {
    let messages = '';
    try {
        messages = await AsyncStorage.getItem('messages') || [];
        this.setState({
            messages: JSON.parse(messages)
        });
    } catch(error) {
        console.log(error.message);
    }
}
/** 
* save messages in asyncStorage with key name being the same as collection name
*        in Firebase 
*  @type {InnerFunctions.saveMessages}
*
*/
async saveMessages() {
  try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
  } catch(error) {
      console.log(error.message);
  }
  let messages = '';
  try {
      messages = await AsyncStorage.getItem('messages') || [];   
  } catch(error) {
      console.log(error.message);
  }
}    
  async componentDidMount() {
   try {

      // use eventListener and unsubscribe function to monitor for network connectivity status
   //this.unsubscribeNetInfo = NetInfo.(state => {
       //   this.setState({ isOnline: state.isInternetReachable || false });
          // this.setState({ isOnline: false })            // need to change back to :state.isConnected          
          //console.log('this.state.isOnline is HARDCODED FALSE');
     //})
      this.userRef = Fire.shared.fireStore.collection("users").doc(this.state.uid)

      this._unsubscribe = await this.userRef.onSnapshot( doc => {
        this.setState({...this.state, user: doc.data()})
    })
          // create reference to "messages" collection
          const referenceMessages = Fire.shared.fireStore.collection('messages');

         // update user state with data for currently active user
              this.setState({
                  uid: Fire.shared.uid,
                  person: this.props.route.params.person

              });

              // create a reference to the active user's documents (messages) for this uid
              this.referenceMessagesUser =  await Fire.shared.fireStore.collection('messages').doc(this.state.uid).collection(this.state.person.uid)
              this.referenceMessagesPerson = await  Fire.shared.fireStore.collection('messages').doc(this.state.person.uid).collection(this.state.uid)

              this.referenceConversationUser = await Fire.shared.fireStore.collection('conversations').doc(this.state.uid).collection("conversations").doc(this.state.person.uid)
              this.referenceConversationPerson = await  Fire.shared.fireStore.collection('conversations').doc(this.state.person.uid).collection("conversations").doc(this.state.uid)

              // listen for collection changes for current user  (also returns 'unsubscribe() function')
              // calls the onCollectionUpdate() function 
              let messages =[]
              this.unsubscribeMessagesUser = await this.referenceMessagesUser
              .orderBy("createdAt", "asc").onSnapshot(querySnapshot=> {
                if (!querySnapshot.empty) {
                  let messages = [];

                  // go through each document
                  querySnapshot.forEach((doc) => {
                      // get QueryDocumentSnapshot's database
                      let data = doc.data();
                      // convert from Firebase Timestamp object to Date using milliseconds - surprise!
                      let firebaseTime = data.createdAt;
            // convert from Firebase Timestamp object to Date using milliseconds - surprise!
            let timestamp = this.convertTime(firebaseTime);
                      messages.push({
                          id: data.id,
                          text: data.text,
                          createdAt: timestamp,
                          user: {
                              uid: data.user.uid,
                              name: data.user.name,
                              firstName:data.user.firstName,
                              avatar: data.user.avatar,
                          }
                      });
                  });
                  
                  // set messages state to be this array of messages
                  this.setState({messages});
              } else {
                  console.log("aucun profil récupérée ")
              }
           })
      this._isMounted = true;
  } catch(error) {
      console.log(error);
  }

  }
  componentWillUnmount() {
    if (this._isMounted === true) {
        //this.unsubscribeNetInfo(); 
        if (this.authUnsubscribe) {
            // stop listening to authentication changes if it was started when online
            this.authUnsubscribe();

            // stop listening to changes to messages if it was started when online
            if (this.unsubscribeMessagesUser) {
                this.unsubscribeMessagesUser();
            }
        }
        this._isMounted = false;
    }
}
activityIndicator() {
  return (
  <View style={{flex:1, justifyContent:"center", alignContent:"center", alignItems:"center", position:"absolute"}}>
    <Text>{"Pas de connexion internet"}</Text>
    <ActivityIndicator />
    <Text>{"Reconnexion..."}</Text>
  </View>)
}
convertTime= (time) => {
  let d = new Date(time)
  let c = new Date()
  let result = (d.getHours() < 10?'0':'') + d.getHours()+':';
  result += (d.getMinutes() < 10?'0': '') + d.getMinutes();
  if (c.getDay() !== d.getDay()) {
      result = d.getDay() + ' '+ d.getMonth() +' '+ result
  }

  return result

}


async onSend(text) {  // async since from firebase
  let msgs = []
  const newMessage = {
    id: this.uuidv4(),
    text: text ? text : "",
    createdAt: Fire.shared.timestamp,
    user: {
    uid: Fire.shared.uid,
    name: (this.state.user.name) ?this.state.user.name: "",
    avatar: (this.state.user.avatar) ? this.state.user.avatar : "",
    firstName:(this.state.user.firstName) ? this.state.user.firstName : "",

    }
    
  }
  

      try {   
          this.addMessage(newMessage);
      } catch(error) {
          console.log('Add to Firebase failed in onSend(): ',error.message);
      }
      this.setState({text:""})

  
}
 uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

renderImage(item) {
  if (this.state.uid!=item.user.uid) {
    return (
      <View style={{flex:2.5/10, justifyContent:"center", alignItems:"center"}}>
      <Image source={item.user.avatar} style={styles.avatar}/>
      </View>
    )
  }

}
renderName(item) {
  if (this.state.uid!=item.user.uid) {
    return (
      <View style={{flexDirection:'row'}}>
      <Text style={{color:"black", padding:2, fontSize:20, fontWeight:"bold", marginLeft:10,}} >{item.user.firstName}</Text>
      <Text style={{color:"black", padding:2, fontSize:20, fontWeight:"bold", marginLeft:10,}} >{item.user.name}</Text>
      </View>

      )
  }


}
renderRow({item}){



  return (
    <View style={{
    flexDirection:"row", 
    width:"60%",
    marginVertical:15,
    marginHorizontal:5, 
    alignSelf:Fire.shared.uid===item.user.uid?"flex-end":"flex-start",
    backgroundColor: this.state.uid===item.user.uid?"#fff":"#B2BABB", borderRadius:20}}>
      <View style={{flex:1}}>
      <View style={{flexDirection:"row", justifyContent:"flex-end",flex:1}}>
                   <View style={{flex:8/10}}>
                    <Text style={{color:"black", padding:7, fontSize:17 }}> {item.text}</Text>
                    </View>
                    <View style={{justifyContent:"flex-end", flex:2/10, marginBottom:5 }}>
                      <Text style={{color:"black", padding:3, fontSize:12 }} >{item.createdAt}</Text>
                    </View>
                    
                </View>

      </View>
    
    </View>
  )

}
addMessage(message) {
  if (message.text.length > 0) {
    const s1 = {
      id: this.uuidv4(),
      text: message.text,
      createdAt: message.createdAt,
      user: {
      uid: this.state.person.uid,
      name: this.state.person.name,
      firstName:this.state.person.name,
      avatar: this.state.person.avatar,
      }}
          this.referenceMessagesUser.add(message)
          this.referenceMessagesPerson.add(message)
          this.referenceConversationUser.set(s1)
          this.referenceConversationPerson.set(message)

      
  }
}


_scrollEnd = (evt) => { 
  this.refs.flatList1.scrollToEnd(); 
  } 
  render() {
    console.log(this.state.person)

    return (


      <SafeAreaView style={{flex:1, backfaceVisibility:"purple"}}>
        <View style={{height:70, backgroundColor:"purple", alignItems:"center", flexDirection:"row"}}>
        <StatusBar barStyle="dark-content" backgroundColor="purple"/>

          <View style={{flex:3/10,  backgroundColor:"purple"}}>
          <Image source={{uri: this.state.person.avatar}}style={{height:50,alignSelf:"center", width:50, borderColor:"white", borderWidth:2, borderRadius:50/2}}/>
          </View>
                <View style={{flexDirection:"row", flex:7/10}}>
                   <View style={{ flexDirection:"row"}}>
                        <Text style={{fontSize:17, fontWeight:"bold", color:"white"}}>{this.state.person.name}</Text>
                        <Text style={{fontSize:17, fontWeight:"bold", color:"white"}}>{this.state.person.firstName}</Text>
                    </View>
                </View>
          </View>
    
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}}
         behavior={Platform.OS == "ios" ? "padding" : ""}enabled   
        >
           

        <View style={{position:"absolute", height:300, width:400, borderRadius:400/2, backgroundColor:"#F2F3F4"}}></View>
        <View style={{position:"absolute", height:70, width:100, borderRadius:100/2, backgroundColor:"#F2F3F4", left:50, bottom:250}}></View>
        <View style={{position:"absolute", height:30, width:50, borderRadius:50/2, backgroundColor:"#F2F3F4", left:30, bottom:210}}></View>
        <View style={{position:"absolute", height:15, width:35, borderRadius:35/2, backgroundColor:"#F2F3F4", left:20, bottom:180}}></View>
        
        <AutoScrollFlatList 
                    style={styles.feed}
                    data= {this.state.messages}
                    renderItem={(item) => this.renderRow(item)}
                    keyExtractor= {item => item.id}
                    scrollEnabled={true}
                
                />
        
        <View style={{flexDirection:"row", alignItems:"center", marginBottom:15}}>
        <TextInput 
        style={styles.input}
        value={this.state.text}
        placeholder={"  Ecrivez votre messages ici..."}
        onChangeText={t => this.setState({text:t})}/>
        <TouchableOpacity style={{height:50, width:50, backgroundColor:"purple", borderRadius:100, justifyContent:"center", alignItems:"center", marginHorizontal:7}} onPress={()=>this.onSend(this.state.text)}>
          <Text style={{fontSize:30, color:"white", fontWeight:"bold"} }>{">"}</Text>
        </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>

      </SafeAreaView>


      
       
        
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent:"center",
    alignContent:"center"
  },
  input: {
    height:50,
    backgroundColor:"#fff",
    width:"80%", 
    borderRadius:17,
    fontSize:20,
    marginLeft:10
    
  }, text: {
    fontSize:15,
    color:"yellow" 
  },
  feed: {
    flex:1,
    marginTop:5
},
avatar: {
  width: 50,
  height:50,
  borderRadius:50/2,
  marginHorizontal:5
}, 
});
