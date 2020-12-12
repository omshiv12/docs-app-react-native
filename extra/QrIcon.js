import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {AntDesign} from '@expo/vector-icons';

export function QrIcon() {
    const nav = useNavigation();
    return(
        <TouchableWithoutFeedback onPress={()=>{nav.navigate('QRCodePatient')}}> 
            <AntDesign name="qrcode" size={25} color="white" style={{marginHorizontal:10}}/> 
        </TouchableWithoutFeedback>
    )
}