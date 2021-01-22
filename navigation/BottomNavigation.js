import {React} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import TripList from '../Components/TripList';
import SearchTrip from '../Components/SYT/SearchTrip';
import LocationForPropose from '../Components/SYT/LocationForPropose';
import ProfileScreen from '../Components/ProfileScreen';
const AppTab = createBottomTabNavigator()
export default  () => {
    <AppTab.Navigator  initialRouteName={"Home"} screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size,}) => {
          let iconName; 
          if (route.name === 'Mes SYT') {
            iconName = 'ios-list'
            size = 32
          } else if (route.name === 'Rechercher') {
            iconName = 'ios-search' ;
            size = 32
          }else if (route.name === 'Proposer') {
            iconName = 'ios-add-circle' 
            size = 32
          } else if (route.name === 'Notifications') {
            iconName = 'ios-notifications' ;
            size = 32
          }else if (route.name === 'Profile') {
            iconName = 'ios-person' ;
            size = 32
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#a818cc',
        inactiveTintColor: '#BBBBC4',
        

      }}>
        <AppTab.Screen
        name="Mes SYT"
        component={TripList}
        />
        <AppTab.Screen
        name="Rechercher"
        component={SearchTrip}
        />
         <AppTab.Screen
        name="Proposer"
        component={LocationForPropose}
        />
        <AppTab.Screen
        name="Notifications"
        children={AppMatTabNavigator}
        />
        <AppTab.Screen
        name="Profile"
        component={ProfileScreen}

        />
    </AppTab.Navigator>

}
