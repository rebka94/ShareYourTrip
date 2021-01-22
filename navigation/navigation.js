import React from 'react'
import {Alert, Platform} from "react-native" 
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator,} from '@react-navigation/material-top-tabs';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer'
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
import PublicProfile from '../Components/PublicProfile'
import ChatScreen from "../Components/ChatScreen"
import { FontAwesome } from '@expo/vector-icons';
import ChatRoom from '../Components/notificationScreens/ChatRoom';
import Notifications from '../Components/notificationScreens/Notifications';
import Test1 from "../Components/Tests/Test1"
const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
};


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
              } else if (route.name === 'TabNotifications') {
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
            name="TabNotifications"
            component={MyTopTabNotifications()}
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
const TabTopNotifications = createMaterialTopTabNavigator();

function MyTopTabNotifications() {
  return (
    <TabTopNotifications.Navigator>
      <TabTopNotifications.Screen name="notifications" component={ChatRoom} />
      <TabTopNotifications.Screen name="messages" component={Notifications} />
    </TabTopNotifications.Navigator>
  );
}

function AppStackNavigator() {
    return (
        <AppStack.Navigator initialRouteName={"Loading"} options={{headerShown: false}}
        screenOptions={TransitionScreenOptions}>
             <AppStack.Screen
                name="Welcome"
                component={WelcomeScreen}
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
            <Stack.Screen
              name="Test1"
              component={Test1}
              options={{
                title: 'Test1',
                ...TransitionPresets.ModalSlideFromBottomIOS,
              }}
              />;
            
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
                name="PublicProfile"
                component={PublicProfile}
                options={{headerShown: false}}
            />
        </AppStack.Navigator>
        
    )
}

export default (AppStackNavigator)

