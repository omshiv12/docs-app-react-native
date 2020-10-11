import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import Input from '../Input/Inputs';
import Submit from '../Input/Submit';
const SignUp = props => {
    return ( 
        <ScrollView style = {{ backgroundColor: 'red' }}>
            
        
        
        <View style ={ styles.container } >
        
        <Image source = { require('../assets/signup.jpg')} resizeMode = "center" style = { styles.image }/>
        
        
        
        <Text style = { styles.textTitle } > Lets Get Started < /Text> 
        <Text style = { styles.textBody } > Create an account to get all features < /Text> 
        
        
       
        <Input name = "Full Name" icon = "user" / >
        
        
        <Input name = "Email" icon = "envelope" / >
        
        
        <Input name = "Phone" icon = "phone" / >
        
        
        <Input name = "Password" icon = "lock" pass = { true }/>
        
        
         
        <Input name = "Confirm Password" icon = "lock" pass = { true }/>
        
        
        
        <Submit color = "#0251ce" title = "CREATE" / >
        

        
        <View style = {{flexDirection:' row'}}>
            
                
               
            
        
        
        <Text style = { styles.textBody } > Already have an account < /Text> 
        <Text style = {[styles.textBody, { color: 'blue' }]} onPress = {() => props.navigation.navigate('Home') } > Login Here < /Text>
            
        
        
          </View>  
        </View > 
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: 400,
        height: 250,
        marginVertical: 10,
    },
    textTitle: {
        fontSize: 40,
        
        marginVertical: 5,
    },
    textBody: {
        fontSize: 10,
        
    }
});

export default SignUp;