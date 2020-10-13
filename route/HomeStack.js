import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Consultation from '../Screens/Consultation';
import Appointment from '../Screens/Appointment';
import FavDoctors from '../Screens/FavDoctors';
import MedicalRecords from '../Screens/MedicalRecords';
import FirstPage from '../Screens/firstPage';
import { Entypo } from '@expo/vector-icons';

const homeStack=createStackNavigator();

export default function HomeStack(props) {
    const headerIcon=()=>{
        return(
          <Entypo name="menu" size={30} color="black" style={{marginLeft:20}} onPress={()=>props.navigation.openDrawer()}/>
        );
      }
    return (
       <homeStack.Navigator>
                <homeStack.Screen name="firstPage" component={FirstPage} options={{headerLeft:headerIcon}}/>
                <homeStack.Screen name="Consultation" component={Consultation} options={{headerLeft:headerIcon}}/>
                <homeStack.Screen name="appointments" component={Appointment} options={{headerLeft:headerIcon}}/>
                <homeStack.Screen name="favDoctors" component={FavDoctors} options={{headerLeft:headerIcon}}/>
                <homeStack.Screen name="records" component={MedicalRecords} options={{headerLeft:headerIcon}}/>
       </homeStack.Navigator>
    )
}
