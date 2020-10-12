import * as React from 'react';
import 'react-native-gesture-handler';
import FirstPage from './Screens/firstPage';
import Consultation from './Screens/Consultation'
import {NavigationContainer} from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App(){
    return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="FirstPage" component={FirstPage} options={{title:"First Page!!"}}/>
                    <Stack.Screen name="Consultation" component={Consultation} options={{title:"Find Doctor!!"}}/>
                </Stack.Navigator>
            </NavigationContainer>
    )
}