import React from 'react'
import { StyleSheet, Text, View ,Image} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
export default function Appointments(props) {
    let appointmentList=[{id:'1',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15', gender:'Male',blood:'A+',address:'Hapur',mobile:'7060207573',age:'19'},
                     {id:'2',name:'Punit Jain',condition:'Serious Heart Disease Due To Anwesha Singh', time:'11:50-12:15', gender:'Female',blood:'B-',address:'Indore',mobile:'6352419870',age:'20'},
                     {id:'3',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15', gender:'Female',blood:'A-',address:'Modinagar',mobile:'8596741230',age:'21'},
                     ];
    return (
        <View>
        <FlatList
            data={appointmentList}
            renderItem={({item})=>
            <Card style={styles.cardStyle}>
                <TouchableOpacity onPress={()=>props.navigation.navigate('PatientViewTab',item)}>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:2}}>
                            {item.gender=="Male"?<Image source={require('../assets/boyAvatar.jpeg')} style={{height:90,width:90,borderRadius:50}}/>:
                            <Image source={require('../assets/girlAvatar.jpg')} style={{height:90,width:90,borderRadius:50}}/>}
                        </View>
                        <View style={{flex:5,marginLeft:40}}>
                            <Text style={{color:'#ffffff',fontSize:20}}>{item.name}</Text>
                            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            <Text style={{color:'#ffffff',fontSize:15}}>Condition: {item.condition}</Text>
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            <Text style={{color:'#ff4066',fontSize:20}}>Timing: {item.time}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>props.navigation.navigate('Reschedule',item)}>
                    <View style={{flexDirection:'row' ,alignSelf:'flex-end'}}>
                            <MaterialIcons name="refresh" size={24} color="#99ff99" />
                            <Text style={{color:'#99ff99',fontSize:16}}>Reschedule</Text>
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
        paddingTop:20,
        backgroundColor:"#123456",
        margin:10,
        paddingLeft:15,
        borderColor:'#000000',
        borderWidth:3,
        borderRadius:10
    }
})
