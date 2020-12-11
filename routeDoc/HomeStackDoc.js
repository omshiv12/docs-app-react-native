import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import FirstPageDoc from '../ScreensDoc/firstPageDoc';
import Patients from '../ScreensDoc/patients';
import Reports from '../ScreensDoc/reports';
import Appointments from '../ScreensDoc/Appointments';
import PatientView from '../ScreensDoc/PatientView';
import PatientViewTab from '../ScreensDoc/PatientViewTab';
import Reschedule from '../ScreensDoc/Reschedule';
import QrScanner from '../ScreensDoc/QrScanner';

const homeStackDoc=createStackNavigator();

export default function HomeStackDoc(props) {
    const headerIcon=()=>{
        return(
          <Entypo name="menu" size={30} color="black" style={{marginLeft:20}} onPress={()=>props.navigation.openDrawer()}/>
        );
      }
    return (
       <homeStackDoc.Navigator >
                <homeStackDoc.Screen name="firstPageDoc" component={FirstPageDoc} 
                options={{headerLeft:headerIcon,title:"Home"}}/>
                <homeStackDoc.Screen name="appointments" component={Appointments} 
                options={{headerLeft:headerIcon,title:"Appointments"}}/>
                <homeStackDoc.Screen name="Reports" component={Reports} 
                options={{headerLeft:headerIcon,title:"Reports"}}/>
                <homeStackDoc.Screen name="Patients" component={Patients} 
                options={{headerLeft:headerIcon,title:"Patients"}}/>
                <homeStackDoc.Screen name="PatientViewTab" component={PatientViewTab} 
                options={{headerLeft:headerIcon,title:'PatientView'}}/>
                <homeStackDoc.Screen name='Reschedule' component={Reschedule} 
                options={{headerLeft:headerIcon,title:'Reschedule'}}/>
                <homeStackDoc.Screen name='QR' component={QrScanner} />
       </homeStackDoc.Navigator>
    )
}
