import * as React from 'react';
import 'react-native-gesture-handler';
import LoginScreen from './Screens/LoginScreen'
import Consultation from './Screens/Consultation'
import Appointment from './Screens/Appointment';
import FavDoctors from './Screens/FavDoctors';
import MedicalRecords from './Screens/MedicalRecords';
import { Entypo } from '@expo/vector-icons';
import FirstPage from './Screens/firstPage';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const headerIcon=()=>{
  return(
    <Entypo name="menu" size={30} color="black" style={{marginLeft:20}} />
  );
}
export default function App(){
    return(
            <NavigationContainer>
                <Stack.Navigator>
                    {/* <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/> */}
                    <Stack.Screen name="FirstPage" component={FirstPage} options={{title:"First Page!!",headerLeft:headerIcon}}/>
                    <Stack.Screen name="Consultation" component={Consultation} options={{title:"Find Doctor!!"}}/>
                    <Stack.Screen name="appointments" component={Appointment}/>
                    <Stack.Screen name="favDoctors" component={FavDoctors}/>
                    <Stack.Screen name="records" component={MedicalRecords}/>
                </Stack.Navigator>
            </NavigationContainer>
    )
}