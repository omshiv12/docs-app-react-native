import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import FirstPageDoc from '../ScreensDoc/firstPageDoc';

const homeStackDoc=createStackNavigator();

export default function HomeStackDoc(props) {
    const headerIcon=()=>{
        return(
          <Entypo name="menu" size={30} color="black" style={{marginLeft:20}} onPress={()=>props.navigation.openDrawer()}/>
        );
      }
    return (
       <homeStackDoc.Navigator>
                <homeStackDoc.Screen name="firstPageDoc" component={FirstPageDoc} options={{headerLeft:headerIcon,title:"Home"}}/>
       </homeStackDoc.Navigator>
    )
}
