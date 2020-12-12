import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {MaterialCommunityIcons} from '@expo/vector-icons';

export function QrIcon() {
    const nav = useNavigation();
    return(
        <TouchableWithoutFeedback onPress={()=>{nav.navigate('ScanQRCode')}}> 
            <MaterialCommunityIcons name="qrcode-scan" size={25} color="white" style={{marginHorizontal:10}}/> 
        </TouchableWithoutFeedback>
    )
}