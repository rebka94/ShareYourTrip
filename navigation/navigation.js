import React from 'react'
import {Alert, Platform, Settings, Text} from "react-native" 
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator,} from '@react-navigation/material-top-tabs';
import WelcomeScreen from '../Components/Welcomescreen'
import HomeScreen from "../Components/HomeScreen"
import LoginScreen from "../Components/LoginScreen"
import RegisterScreen from "../Components/RegisterScreen"
import LoadingScreen from "../Components/LoadingScreen"
import ProfileScreen from "../Components/ProfileScreen"
import Ionicons from 'react-native-vector-icons/Ionicons';
import TripList from "../Components/TripList"
import Fire from "../Fire/Fire"
import SearchTrip from '../Components/SYT/SearchTrip'
import ChatScreen from "../Components/ChatScreen"
import { FontAwesome } from '@expo/vector-icons';
import Notifications from '../Components/notificationScreens/Notifications';
import ChatRoom from '../Components/notificationScreens/ChatRoom';
import { Entypo } from '@expo/vector-icons';
import CustomHeaderTab from "./CustomHeaderTab"
import SearchTripReducer from '../Store/reducers/SearchTripReducer';
import { color } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import BackArrow from './BackArrow';
import Test1 from "../Components/Tests/Test1"
import CustomHeaderChatScreen from './CustomHeaderChatScreen';
import DateTimeModal from '../Components/SYT/DateTimeModal';
 const handleLogOut = () => {
  Alert.alert(
    'Deconnexion',
    'Êtes-vous sûr(e) de vouloir se deconnecter ?.',
    [
      {text: 'Annuler', onPress: () =>console.log('canceled')},
      {text: 'Oui !', onPress: () =>  Fire.shared.signOut()},
    ],
    { cancelable: false }
)
   
 }


// Création du StackNavigator qui contient les écrans de la navigation
const AppStack = createStackNavigator()
const AppTab = createBottomTabNavigator()
const AppMatTab = createMaterialTopTabNavigator()


//



function AppTabNavigator() {
    return(
        <AppTab.Navigator  initialRouteName={"Home"}  screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size,}) => {
              let iconName; 
              if (route.name === 'Home') {
                return <Entypo name="home" size={35} color={color} /> 
              } else if (route.name === 'Rechercher') {
                return <FontAwesome name="search" size={35} color={color} />;
              }else if (route.name === 'Proposer') {
                iconName = 'ios-add-circle' 
                size = 40
              } else if (route.name === 'Notifications') {
                iconName = 'ios-notifications' ;
                size = 40
              }else if (route.name === 'Profile') {
                iconName = 'ios-person' ;
                size = 40
              }
  
              // You can return any component that you like here!
              return  (
                
              <Ionicons name={iconName} size={size} color={color} />);
            },
          })}
          
          tabBarOptions={{
            
            activeTintColor: '#fff',
            inactiveTintColor: '#BBBBC4',
            style: {
              height:Platform.OS=="ios"?95:60,
              justifyContent:"center",
              alignItems:"center",
              backgroundColor:"purple",
              elevation:2,
              borderTopLeftRadius:20,
              borderTopRightRadius:20,
            

            }
          
           
            

          }}>
            <AppTab.Screen
            name="Home"
            component={HomeStack}
            
            options={{
              tabBarLabel: 'Accueil',
              tabBarBadge: 0,
              tabBarBadgeStyle: {
                alignContent:"center",
                justifyContent:"center",
                alignItems:"center",
                textAlign:"center",
                fontSize:10,
                alignSelf:"center",
                textAlignVertical:"center",
              },
            
            }}
            />
             <AppTab.Screen
            name="Rechercher"
            component={SearchTripStack}

            />
           
            <AppTab.Screen
            name="Notifications"
            component={NotificationsStack}
            
    
            />
        </AppTab.Navigator>
    )
}

function NotificationsStack() {
  return (
    <AppStack.Navigator initialRouteName={"Notifications"} options={{headerShown: true, }}>
    <AppStack.Screen
       name="Notifications"
       component={Notifications}
       options={{headerShown: false}}
      
   />
   </AppStack.Navigator>

  )
}
function SearchTripStack() {
  return (
    <AppStack.Navigator initialRouteName={"SearchTrip"} options={{headerShown: true, }}>
    <AppStack.Screen
       name="SearchTrip"
       component={SearchTrip}
       options={{headerShown: false}}
   />
   </AppStack.Navigator>

  )
}
function HomeStack() {
  return (
    <AppStack.Navigator initialRouteName={"Home"} options={{headerShown: true, }}>
    <AppStack.Screen
       name="Home"
       component={TripList}
       options={{headerShown: false}}

   />
    <AppStack.Screen
                
                name="DateTimeModal"
                component={DateTimeModal}
                options={({ navigation, route, }) => ({
                  headerShown:false,
                  ...TransitionPresets.ModalPresentationIOS,
                  gestureEnabled:true,
                  cardOverlayEnabled: true,
                  headerStyle: {
                    backgroundColor:"transparent"
                  }, 
                })}
                
                
            />
   </AppStack.Navigator>

  )
}
function tabStack() {
  return (
    <AppStack.Navigator initialRouteName={"TabTes"} options={{headerShown: true, }}>
    <AppStack.Screen
       name="TabTes"
       children={AppTabNavigator}
       options={{headerShown: true, headerLeft: () => {
        return null;
      },

      header: (props)=> <CustomHeaderTab {...props}/>
      }}
   />
   </AppStack.Navigator>

  )
}
function ProfileStack() {
  return (
    <AppStack.Navigator initialRouteName={"Profile"}>
      <AppStack.Screen
                
                name="Profile"
                component={ProfileScreen}
                options={({ navigation, route, }) => ({
                  headerShown:false,
                  ...TransitionPresets.ModalSlideFromBottomIOS,
                  gestureEnabled:true,
                  cardOverlayEnabled: true,
                  headerStyle: {
                    backgroundColor:"transparent"
                  }, 
                })}
                
                
            />
      <AppStack.Screen
                
                name="Settings"
                component={Test1}
                options={({ navigation, route, }) => ({
                  headerShown:false,
                  ...TransitionPresets.ModalPresentationIOS,
                  gestureEnabled:true,
                  cardOverlayEnabled: true,
                  headerStyle: {
                    backgroundColor:"transparent"
                  }, 
                })}
                
                
            />

    </AppStack.Navigator>

  )
}
function chatStack() {
  return (
    <AppStack.Navigator initialRouteName={"chatRoom"}>
      <AppStack.Screen
                
                name="chatRoom"
                component={ChatRoom}
                options={({ navigation, route }) => (
                  { 
                    headerShown: true,
                    headerTitle: "Messages",
                    headerStyle: {
                      backgroundColor:"purple"
                    },
                    headerLeft: () => (
                      <BackArrow
                        {...navigation}
                      />
                    ),
                    headerTitleStyle: {
                      fontSize:24,
                      color:"#fff"
                    },
                    gestureEnabled:true,
                    cardOverlayEnabled: true,
                    cardStyle: {
                      backgroundColor:"transparent"
                    },
                  }
                 
                )}
            />
      <AppStack.Screen
                
                name="ChatScreen"
                component={ChatScreen}
                options={({route, navigation}) => ({
                  title:"",
                  headerShown:true,
                  ...TransitionPresets.SlideFromRightIOS,
                  gestureEnabled:true,
                  cardOverlayEnabled: true,
                  headerStyle: {
                    backgroundColor:"purple"
                  }, 
                  headerLeft: (props) => (
                    <CustomHeaderChatScreen {...route} {...navigation}/>)
                  
                  
                })}
                
                
            />

    </AppStack.Navigator>

  )
}



function AppStackNavigator() {
    return (
        <AppStack.Navigator initialRouteName={"Loading"} options={{headerShown: false, }}>
             <AppStack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{headerShown: false}}
            />

            <AppStack.Screen
                name="TAB"
                children={tabStack}
                options={{headerShown: false, headerLeft: () => {
                  return null;
                },
                headerTitle:""
                }}
           />
            <AppStack.Screen
                name="Login"
                component={LoginScreen}
              
                options={{
                  
                  headerStyle: {
                    backgroundColor: "red",
                  },
                  headerTintColor: "red",
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  headerShown: false, headerTitle:"Connexion", headerTintColor:"white", }}
            />
              
            
             
            <AppStack.Screen
                
                name="Profile"
                component={ProfileStack}
                options={({ navigation, route, }) => ({
                  headerShown:false,
                  ...TransitionPresets.ModalSlideFromBottomIOS,
                  gestureEnabled:true,
                  cardOverlayEnabled: true,
                  headerStyle: {
                    backgroundColor:"transparent"
                  }, 
                })}
                
                
            />
       
             <AppStack.Screen
                name="ChatRoom"
                component={chatStack}
                options={{headerShown:false,
                  ...TransitionPresets.SlideFromRightIOS,
                  gestureEnabled:true,}}
                
            />
          
            
            <AppStack.Screen
                name="Register"
                component={RegisterScreen}
                options={{headerShown: false}}
            />
            <AppStack.Screen
                name="Loading"
                component={LoadingScreen}
                options={{headerShown: false}}
            />
         
        </AppStack.Navigator>
        
    )
}

export default (AppStackNavigator)

