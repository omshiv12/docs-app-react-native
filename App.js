import * as React from 'react';
import 'react-native-gesture-handler';
import LoginScreen from './Screens/Login/LoginScreen';
// import {Provider} from 'react-redux';
// import store from './Screens/Cart/store/index';
import {NavigationContainer} from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// PJ: do not uncomment the commented lines.

// You keep on adding the screens in the screens folder and add them here. We will take care of navigation more later.
export default function App(){
    return(
        // <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="login" component={LoginScreen} options={{title:"Login"}}/>
                </Stack.Navigator>
            </NavigationContainer>
        // </Provider>
    )
}