import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
export default function FirstPage(props) {
    return (
        <View>
            <TouchableOpacity onPress={()=>props.navigation.navigate("Consultation")}>
            <View style={styles.card}>
            <View style={{flex:4}}>
            <Text style={{fontSize:14,color:"#ffffff",marginTop:20,marginLeft:10}}>Good Bye Doubts</Text>
            <Text style={styles.cardText}>Say Hello To Doctor!</Text>
            <View style={{borderBottomWidth:1.5,marginTop:9,width:200,marginLeft:10,borderBottomColor:"#ffffff"}}></View>
            <Text style={{fontSize:25,color:"#85ff88",marginTop:10,marginLeft:10}}>50% OFF</Text>
            <Text style={{fontSize:14,color:"#85ff88",marginLeft:10}}>On Your First Consultation.</Text>
            <Text 
            style={{fontSize:15,
            color:"#35309f",
            marginTop:10,
            marginLeft:10,
            backgroundColor:'#ffffff',
            width:150,
            borderRadius:8,
            paddingLeft:5
            }}>
            Use Code:MMG50
            </Text>
            </View>
            <View style={{flex:2,marginRight: 30,}}>
                <Image source={require("../assets/helloDoctor.png")} style={styles.helloDoctor}/>
            </View>
            </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        backgroundColor:"#35309f",
        height:200,
        width:"90%",
        marginHorizontal:20,
        borderRadius:20,
        marginVertical:20,
        flexDirection: 'row',
    },
    cardText:{
        color:"#ffffff",
        fontSize:20,
        marginLeft: 10,
    },
    helloDoctor:{
        height:"100%",
        width:"100%",
        resizeMode:'contain',
    }
});