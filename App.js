import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Signup from './screens/Signup';


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const navigator = createStackNavigator({
  signup: {
    screen: Signup,
    navigationOptions: {
      headerShown: false,
      headerTransparent: true,
    },
  },
  
});

const AppContainer = createAppContainer(navigator);
