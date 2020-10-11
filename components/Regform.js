import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
export default class Regform extends React.Component{
    render() {
        return ( 
            <View style = { styles.regform } >

            
            <Text style = { styles.container } > Registration < /Text> 

            
            <TextInput style = { styles.textinput } placeholder = "Your name" underlineColorAndroid = { 'transparent' } />
            
            
            
            <TextInput style = { styles.textinput } placeholder = "Your Email" underlineColorAndroid = { 'transparent' } />
            
            
            
            <TextInput style = { styles.textinput } placeholder = "Password" secureTextEntry = { true } underlineColorAndroid = { 'transparent' } />
            
            
            
            
            <TouchableOpacity style = { styles.button } >
            
            <Text style = { styles.button } > Sign up < /Text> 
            </TouchableOpacity >

           
            
            </View >
        );
    }
}

const styles = StyleSheet.create({
    regform: {
        alignSelf: 'stretch',
    },
    header: {
        fontSize: 24,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: 'red',
        borderBottomWidth: 1,
    },
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#fff',
        borderBottomColor: 'pink',
        borderBottomWidth: 1,

    },
    button: {
       // alignSelf: 'stretch',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'pink',
        marginTop: 5,
    },
    btntext: {
        color: '#fff',
        fontWeight: 'bold',
    }
});