import React from 'react'
import {Alert, Platform} from "react-native" 
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer'
import WelcomeScreen from '../Components/Welcomescreen'
import EscaleNumbreScreen from "../Components/EscalesScreens/EscaleNumbreScreen"

import HomeScreen from "../Components/HomeScreen"
import LoginScreen from "../Components/LoginScreen"
import RegisterScreen from "../Components/RegisterScreen"
import LoadingScreen from "../Components/LoadingScreen"
import ProfileScreen from "../Components/ProfileScreen"
import ChatRoom from "../Components/ChatRoom"
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotificationScreen from "../Components/NotificationScreen"
import TripList from "../Components/TripList"
import Syt from "../Components/SYT/Syt"
import Fire from "../Fire/Fire"
import SearchTrip from '../Components/SYT/SearchTrip'
import PublicProfile from '../Components/PublicProfile'
import Friends from '../Components/Friends'
import ChatScreen from "../Components/ChatScreen"
import LikesAndComments from "../Components/notificationScreens/LikesAndComments"
import FriendRequests from "../Components/notificationScreens/FriendRequests"
import LocationForSearch from "../Components/SYT/LocationForSearch"

import LocationForPropose from "../Components/SYT/LocationForPropose"
import DateComponent from '../Components/SYT/DateComponent';
import EscaleScreen from '../Components/EscalesScreens/EscaleScreen';
import SearchSyt from '../Components/SearchSYT/SearchSytFrom';
import SearchSytFrom from '../Components/SearchSYT/SearchSytFrom';
import SearchSytTo from '../Components/SearchSYT/SearchSytTo';
import DepartureDate from '../Components/SytDate/DepartureDate';
import ArrivalDate from '../Components/SytDate/ArrivalDate';
import SettingProfile from '../Components/Profile/SettingProfile';



import { FontAwesome } from '@expo/vector-icons';
import EscaleForm from '../Components/EscalesScreens/EscaleForm';



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
const AppDrawer = createDrawerNavigator()
const AppMatTab = createMaterialTopTabNavigator()


//



function AppTabNavigator() {
    return(
        <AppTab.Navigator  initialRouteName={"Mes SYT"} screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size,}) => {
              let iconName; 
              if (route.name === 'Mes SYT') {
                return <FontAwesome name="archive" size={35} color= {color} />
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
            activeTintColor: '#a818cc',
            inactiveTintColor: '#BBBBC4',
            style: {
              height:Platform.OS=="ios"?95:60,
              justifyContent:"center",
              alignItems:"center",
              backgroundColor:"#fff",
              elevation:2
            }
           
            

          }}>
            <AppTab.Screen
            name="Mes SYT"
            component={TripList}
            options={{
              tabBarLabel: 'Voyages',
              tabBarBadge: 0,
              tabBarBadgeStyle: {
                alignContent:"center",
                justifyContent:"center",
                alignItems:"center",
                textAlign:"center",
                fontSize:10,
                alignSelf:"center",
                textAlignVertical:"center",
              }
            }}
            />
             <AppTab.Screen
            name="Rechercher"
            component={SearchTrip}

            />
            <AppTab.Screen
            name="Notifications"
            component={NotificationScreen}
            options={{
              tabBarBadge: 35,
              tabBarBadgeStyle: {
                justifyContent:"center",
                alignItems:"center",
                height:20,
                textAlign:"center",
                fontSize:10,
                alignSelf:"center",
                textAlignVertical:"center",
                
               
              }
            }}
            />
            <AppTab.Screen
            name="Profile"
            component={ProfileScreen}
    
            />
        </AppTab.Navigator>
    )
}

function AppStackNavigator() {
    return (
        <AppStack.Navigator initialRouteName={"Loading"} options={{headerShown: false}}>
             <AppStack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{headerShown: false}}
            />
            <AppStack.Screen
                name="LocationForSearch"
                component={LocationForSearch}
                options={{headerShown: false}}
            />
            <AppStack.Screen
                name="SettingProfile"
                component={SettingProfile}
                options={{headerShown: true, title:"mon profile", 
                headerTintColor:"white",
                headerStyle: {
                  backgroundColor:"purple"
                }
              }}
            />
             <AppStack.Screen
                name="DateComponent"
                component={DateComponent}
                options={{headerShown: false}}
            />
             <AppStack.Screen
                name="LocationForPropose"
                component={LocationForPropose}
                options={{headerShown: false}}
            />
            <AppStack.Screen
                name="TAB"
                children={AppTabNavigator}
                options={{headerShown: false}}
           />
            <AppStack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false, headerTitle:"Connexion", headerTintColor:"white", headerStyle: {
                  backgroundColor:"purple"
                }}}
            />
                <AppStack.Screen
                name="EscaleScreen"
                component={EscaleScreen}
                options={{headerShown: false
                }}
            />
             <AppStack.Screen
                name="EscaleNumbreScreen"
                component={EscaleNumbreScreen}
                options={{headerShown: false, headerTintColor:"white", headerStyle: {
                  backgroundColor:"purple"
                }}}
            />
            <AppStack.Screen
                name="SearchSytFrom"
                component={SearchSytFrom}
                options={{headerShown: false, headerTintColor:"white", headerStyle: {
                  backgroundColor:"purple"
                }}}
            />
            <AppStack.Screen
                name="SearchSytTo"
                component={SearchSytTo}
                options={{headerShown: false, headerTintColor:"white", headerStyle: {
                  backgroundColor:"purple"
                }}}
            />
            
            <AppStack.Screen
                name="DepartureDate"
                component={DepartureDate}
                options={{headerShown: false}}
            />
            <AppStack.Screen
                name="ArrivalDate"
                component={ArrivalDate}
                options={{headerShown: false}}
            />
            
             <AppStack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{headerShown: false}}
            />
            <AppStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{headerShown: false,

                }}
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
        
            
              <AppStack.Screen
                name="ChatRoom"
                component={ChatRoom}
                options={{headerShown: true}}
            />
            <AppStack.Screen
                name="Friends"
                component={Friends}
                options={{headerShown: true, headerStyle: {backgroundColor:'#10BFC5'}, title:"Amis SYT"}}
            />
            <AppStack.Screen
                name="PublicProfile"
                component={PublicProfile}
                options={{headerShown: false}}
            />
        </AppStack.Navigator>
        
    )
}

export default (AppStackNavigator)

