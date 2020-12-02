import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PatientView from './PatientView';
import PrevReports from './PrevReports';
const Tab = createMaterialTopTabNavigator();

export default function PatientViewTab(props) {
    let inf=props.route.params;
    return (
        <Tab.Navigator>
            <Tab.Screen name="PatientView" component={PatientView}  initialParams={inf} />
            <Tab.Screen name="Report" component={PrevReports} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({})
