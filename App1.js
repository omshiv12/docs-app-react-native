import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Regform from './components/regform'
export default class App extends React Components {
    render() {
        return ( <
            View style = { styles.container } >
            <
            Regform / >

            <
            /View>
        );
    }
}

const styles = StyleSheet.create({
    container {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'blue',
        paddingLeft: 60,
        paddingRight: 60
    },
})