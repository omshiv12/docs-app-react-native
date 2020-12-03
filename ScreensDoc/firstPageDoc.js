import React ,{useState,useEffect}from 'react'
import { StyleSheet, Text, View,Image} from 'react-native'
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function FirstPageDoc(props) {
    return (
        <View style={{flex:1,backgroundColor:"#ffffff"}}>
            <View style={styles.imgContainer}>
                <Image source={require('../assets/doctorFirst.jpeg')} style={styles.imgDesign}/>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={styles.cards}>
                    <TouchableOpacity style={{alignItems:'center'}} onPress={()=>props.navigation.navigate('appointments')}>
                    <Text style={{fontSize:20,color:"#ffffff"}}>Appointments</Text>
                    <Foundation name="clipboard-notes" size={60} color="#ffffff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.cards} >
                    <TouchableOpacity style={{alignItems:'center'}} onPress={()=>props.navigation.navigate('Patients')}>
                    <Text style={{fontSize:20,color:"#ffffff"}}>Patients</Text>
                    <Ionicons name="ios-people" size={60} color="#ffffff" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.card2}>
                <TouchableOpacity style={{alignItems:'center'}} onPress={()=>props.navigation.navigate('Reports')}>
                <Text style={{fontSize:20,color:"#ffffff"}}>Reports</Text>
                <Octicons name="file-directory" size={60} color="#ffffff"  />
                </TouchableOpacity>
            </View>
            </View>
       
    )
}

const styles = StyleSheet.create({
    imgDesign:{
    height:250,
    width:"100%"
    },
    imgContainer:{
        height:252,
        width:"100%",
        borderBottomWidth:3,
        borderBottomColor:"black"
    },
    dateContainer:{
        height:80,
        width:"100%",
        backgroundColor:"#224D80",
        alignItems: 'center',
        justifyContent:'center',
    },
    dateText:
    {
        fontSize:20,
        color:"#ffffff",
    },
    dateText2:
    {
        fontSize:20,
        color:"#85ff88",
    },
    cards:
    {
        flex:2,
        backgroundColor:"#224D80",
        width:"80%",
        height:100,
        borderRadius:50,
        marginTop:50,
        marginHorizontal:5,
        alignItems:'center',
        justifyContent:'center'
    },
    card2:
    {
        backgroundColor:"#224D80",
        height:100,
        marginTop:20,
        marginHorizontal:10,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
    }

});
