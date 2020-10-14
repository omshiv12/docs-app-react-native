import * as React from 'react';
import 'react-native-gesture-handler';
import LoginScreen from './LoginScreen';
import DrawerNavigation from './route/drawerNavigation';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigationDoctor from './routeDoc/DrawerNavDoc';

const Stack = createStackNavigator();
export default function App(){
    return(
            <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
                <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{headerShown:false}}/>
                <Stack.Screen name="DrawerNavigationDoctor" component={DrawerNavigationDoctor} options={{headerShown:false}}/>
            </Stack.Navigator>
            </NavigationContainer>
    )
}