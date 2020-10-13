import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import HomeStack from './HomeStack';
import Setting from '../Screens/Setting';
import About from '../Screens/About';

const Drawer=createDrawerNavigator();

export default function DrawerNavigation() {
    return (
      <Drawer.Navigator>
          <Drawer.Screen name="Home" component={HomeStack}/>
          <Drawer.Screen name="Setting" component={Setting}/>
          <Drawer.Screen name="About Us" component={About}/>
      </Drawer.Navigator>
    )
}

