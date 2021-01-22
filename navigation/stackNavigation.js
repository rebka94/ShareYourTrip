import {React} from 'react';
 import {createStackNavigator} from '@react-navigation/stack'
import WelcomeScreen from '../Components/Welcomescreen';
import LoadingScreen from '../Components/LoadingScreen';
import LocationForPropose from '../Components/SYT/LocationForPropose';
import LoginScreen from '../Components/LoginScreen';
import ChatScreen from '../Components/ChatScreen';
import RegisterScreen from '../Components/RegisterScreen';
import ChatRoom from '../Components/ChatRoom';
import Friends from '../Components/Friends';
import PublicProfile from '../Components/PublicProfile';
import LocationForSearch from '../Components/SYT/LocationForSearch';

const Stack = createStackNavigator()
 export default () => {
    <Stack.Navigator initialRouteName={"Loading"} options={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="LocationForSearch" component={LocationForSearch} options={{headerShown: false}}/>
        <Stack.Screen name="LocationForPropose" component={LocationForPropose} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: true}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Loading" component={LoadingScreen} options={{headerShown: false}}/>
        <Stack.Screen name="ChatRoom" component={ChatRoom} options={{headerShown: true}} />
        <Stack.Screen name="Friends" component={Friends} options={{headerShown: true, headerStyle: {backgroundColor:'#10BFC5'}, title:"Amis SYT"}}/> 
        <Stack.Screen name="PublicProfile" component={PublicProfile} options={{headerShown: false}}/>
    </Stack.Navigator>
 }
