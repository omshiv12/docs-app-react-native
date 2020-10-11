import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Display = (prop) => {
    console.log(prop)
    if(prop.data=="loading"){
       return <Text>Wait kr le</Text>
    }
    if(prop.data.message){
       return <Text style={styles.text}>something went wrong calculate again </Text>
    }
    else{
    return(
        
        <View style={styles.container}>
        <Text style={styles.text}>{prop.data.percentage}</Text>
        <Text style={styles.text}>{prop.data.result}</Text>
        </View>
    )
    }
}

export default Display

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
        
        
    },

    text:{
        fontSize:30,
        textAlign:"center"
    }
})