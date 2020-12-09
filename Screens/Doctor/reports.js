import React from 'react'
import { Image,StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
export default function Reports() {
  let reportsList=[{id:'1',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15'},
                   {id:'2',name:'Punit Jain',condition:'Serious Heart Disease Due To Anwesha Singh', time:'11:50-12:15'},
                   {id:'3',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15'},
                   {id:'4',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15'},
                   {id:'5',name:'Punit Jain',condition:'Serious Heart Disease Due To Anwesha Singh', time:'11:50-12:15'},
                   {id:'6',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15'},
                   {id:'7',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15'},
                   {id:'8',name:'Punit Jain',condition:'Serious Heart Disease Due To Anwesha Singh', time:'11:50-12:15'},
                   {id:'9',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15'},
                   {id:'10',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15'},
                   {id:'11',name:'Punit Jain',condition:'Serious Heart Disease Due To Anwesha Singh', time:'11:50-12:15'},
                   {id:'12',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15'},
                  ];
  return (
    <View>
        <FlatList
            data={reportsList}
            renderItem={({item})=>
            <Card style={styles.cardStyle}>
                <TouchableOpacity>
                        < View style={{flex:5}}>
                            <Text style={{color:'#ffffff',fontSize:15}}>{item.name}</Text>
                            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            <Text style={{color:'#ffffff',fontSize:15}}>Condition: {item.condition}</Text>
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            <Text style={{color:'#ff4066',fontSize:15}}>Timing: {item.time}</Text>
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
