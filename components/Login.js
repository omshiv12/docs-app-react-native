import React from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Inputs from '../Input/Inputs';
import Submit from '../Input/Submit';
import Account from '../Input/Account';
const Login = props => {
    return ( 
        <ScrollView style = {{ backgroundColor: 'black' }}>
            
        

        
        <View style = { styles.container } >
        
        <Image source = { require('../assets/login.jpg') } resizeMode = "center" style = { styles.image } />
        
        
          
        <Text style = { styles.textTitle } > AAPKA SWAGAT HAI < /Text>  
        <Text style = { styles.textBody } > Log in youe existant account </ Text >
        
       < View style = {{ marginTop: 20 }}/>
         
        <Inputs name = "Email" icon = "user" / >
        
        
        <Inputs name = "password" icon = "lock" pass = { true } />
        
        
        
        <View style = {{ width: '90%' }}>
            
        
        
        <Text style = {[styles.textBody],{ alignSelf: 'flex-end' }} > Forget Password < /Text>
            
            <Submit title="LOG IN" color="#0148a4" />
            <Text style={styles.textBody}> Or Connect using</Text>
	    <View style={{flexDirection:'row'}}>
		<Account color="#3b5c8f" icon="facebook" title="Facebook"/>
		<Account color="#3b5c8f" icon="google" title="google"/>
		</View>
		<View style={{flexDirection:'row',marginVertical:5}}>
		<Text style={styles.textBody}>Don't have an account</Text>
		<Text style={[styles.textBody,{color:'blue'}]} onPress={()=>props.navigation.navigate('SignUp')}>Sign Up</Text>
		</View>

         
        </View> 
        <Submit / >
        
        
        </View > 
        </ScrollView >
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 400,
        height: 250,
        marginVertical: 10
    },
    textTitle: {
        
        fontSize: 40,
        marginVertical: 10,
    },
    textBody: {
        
        fontSize: 16
    }
});