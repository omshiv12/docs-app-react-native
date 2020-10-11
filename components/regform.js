import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
export default class regform extends React Components {
    render() {
        return ( <
            View style = { styles.regform } >

            <
            Text style = { styles.header } > Registration < /Text> < /
            View >
        );
    }
}

const styles = StyleSheet.create({
    regform: {
        alignSelf: 'stretch',
    },
    header: {
        fontSize: 30,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: 'pink',
        borderBottomWidth: 1,
    }
})