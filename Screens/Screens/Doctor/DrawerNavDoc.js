import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import About from './About';
import FirstPageDoc from './firstPageDoc';
import HomeStackDoc from './HomeStackDoc';
import SettingDoc from './SettingDoc';

const DrawerDoc=createDrawerNavigator();

export default function DrawerNavigationDoctor() {
    return (
      <DrawerDoc.Navigator>
          <DrawerDoc.Screen name="Home" component={FirstPageDoc} options={{drawerLabel:"Home"}}/>
          <DrawerDoc.Screen name="SettingDoc" component={SettingDoc} options={{drawerLabel:"Settings"}}/>
          <DrawerDoc.Screen name="About Us" component={About} options={{drawerLabel:"About Us"}}/>
      </DrawerDoc.Navigator>
    )
}

