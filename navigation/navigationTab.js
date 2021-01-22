import React from 'react'
import HomeScreen from "../Components/HomeScreen"

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

const AppTab = createBottomTabNavigator()

export default function AppTabNavigator() {
    return(
       <AppTab.Navigator initialRouteName={'Home'}>
           <AppTab.Screen 
                name="Home"
                component={HomeScreen}
           />
       </AppTab.Navigator> 
    )
}

