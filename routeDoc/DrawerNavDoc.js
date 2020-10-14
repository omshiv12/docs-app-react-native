import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import About from '../Screens/About';
import HomeStackDoc from './HomeStackDoc';
import SettingDoc from '../ScreensDoc/SettingDoc';

const DrawerDoc=createDrawerNavigator();

export default function DrawerNavigationDoctor() {
    return (
      <DrawerDoc.Navigator>
          <DrawerDoc.Screen name="HomeDoc" component={HomeStackDoc} options={{drawerLabel:"Home"}}/>
          <DrawerDoc.Screen name="SettingDoc" component={SettingDoc} options={{drawerLabel:"Settings"}}/>
          <DrawerDoc.Screen name="About Us" component={About} options={{drawerLabel:"About Us"}}/>
      </DrawerDoc.Navigator>
    )
}

