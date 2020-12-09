import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';

export default function PrevReports() {
    let prevReports=[{id:'1',doctorName:'Ernest Lopez',Date:'23/12/2025'},
                     {id:'2',doctorName:'Hulululu',Date:'23/12/2025'},
                     {id:'3',doctorName:'XYZXYZ',Date:'23/12/2025'}
                    ];
    return (
        <View>
        <FlatList
            data={prevReports}
            renderItem={({item})=>
            <Card style={styles.cardStyle}>
                <TouchableOpacity>
                        <View style={{flex:5,paddingLeft:'5%'}}>
                            <Text style={{color:'#ffffff',fontSize:15}}>Doctor:  {item.doctorName}</Text>
                            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            <Text style={{color:'#ffffff',fontSize:15}}>Problem: {item.condition}</Text>
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            <Text style={{color:'#ff4066',fontSize:15}}>Date: {item.Date}</Text>
                            </View>
                        </View>
                </TouchableOpacity>
            </Card>
            }
            keyExtractor={item=>item.id}

        />
        </View>
    )
}

const styles = StyleSheet.create({
    cardStyle:{
        flex:1,
        paddingTop:2,
        backgroundColor:"#123456",
        margin:3,
        paddingLeft:5,
        borderColor:'#000000',
        borderWidth:3,
        borderRadius:10
    }
})
