
import {View,Text} from 'react-native';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AuthContext } from '../../auth/AuthContext';

export default function DummyDoctor(){
    const {signOut} = React.useContext(AuthContext);
    return(
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <TouchableWithoutFeedback onPress={()=>{signOut()}}><Text>Doctor Sign Out</Text></TouchableWithoutFeedback>
    </View> 
)
}

