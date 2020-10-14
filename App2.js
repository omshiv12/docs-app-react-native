import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
 class Home extends React.Components {
    render() {
        return ( 
            <View style = {styles.container}} >
            <Text>HOME SCREEN</Text>
            <Button title="go to"  onPress={()=>this.props.navigation.navigate('About')}/>

            
            </View>
        );
    }
}

class AboutScreen extends React.Components {
    render() {
        return ( 
            <View style = {styles.container}} >
            <Text>HOME SCREEN</Text>
            

            
            </View>
        );
    }
}
const AppNavigator =creatStackNavigator({
    Home:{
        screen:Home
    }
    About:{
        screen:AboutScreen;
    }
});
export default createAppContainer (AppNavigator);
const styles = StyleSheet.create({
    container {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'blue',
        paddingLeft: 60,
        paddingRight: 60
    },
})