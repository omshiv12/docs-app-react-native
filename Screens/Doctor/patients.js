import React from 'react'
import {Image, StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
export default function Patients(props) {
    let patientsList=[{id:'1',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15', gender:'Male',blood:'A+',address:'Hapur',mobile:'7060207573',age:'19'},
    {id:'2',name:'Punit Jain',condition:'Serious Heart Disease Due To Anwesha Singh', time:'11:50-12:15', gender:'Female',blood:'B-',address:'Indore',mobile:'6352419870',age:'20'},
    {id:'3',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15', gender:'Female',blood:'A-',address:'Modinagar',mobile:'8596741230',age:'21'},
    {id:'4',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15', gender:'Male',blood:'A+',address:'Hapur',mobile:'7060207573',age:'19'},
    {id:'5',name:'Punit Jain',condition:'Serious Heart Disease Due To Anwesha Singh', time:'11:50-12:15', gender:'Female',blood:'B-',address:'Indore',mobile:'6352419870',age:'20'},
    {id:'6',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15', gender:'Female',blood:'A-',address:'Modinagar',mobile:'8596741230',age:'21'},
    {id:'7',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15', gender:'Male',blood:'A+',address:'Hapur',mobile:'7060207573',age:'19'},
    {id:'8',name:'Punit Jain',condition:'Serious Heart Disease Due To Anwesha Singh', time:'11:50-12:15', gender:'Female',blood:'B-',address:'Indore',mobile:'6352419870',age:'20'},
    {id:'9',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15', gender:'Female',blood:'A-',address:'Modinagar',mobile:'8596741230',age:'21'},
    {id:'10',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15', gender:'Male',blood:'A+',address:'Hapur',mobile:'7060207573',age:'19'},
    {id:'11',name:'Punit Jain',condition:'Serious Heart Disease Due To Anwesha Singh', time:'11:50-12:15', gender:'Female',blood:'B-',address:'Indore',mobile:'6352419870',age:'20'},
    {id:'12',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15', gender:'Female',blood:'A-',address:'Modinagar',mobile:'8596741230',age:'21'},
    {id:'13',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15', gender:'Male',blood:'A+',address:'Hapur',mobile:'7060207573',age:'19'},
    {id:'14',name:'Punit Jain',condition:'Serious Heart Disease Due To Anwesha Singh', time:'11:50-12:15', gender:'Female',blood:'B-',address:'Indore',mobile:'6352419870',age:'20'},
    {id:'15',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15', gender:'Female',blood:'A-',address:'Modinagar',mobile:'8596741230',age:'21'},
    {id:'16',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15', gender:'Male',blood:'A+',address:'Hapur',mobile:'7060207573',age:'19'},
    {id:'17',name:'Punit Jain',condition:'Serious Heart Disease Due To Anwesha Singh', time:'11:50-12:15', gender:'Female',blood:'B-',address:'Indore',mobile:'6352419870',age:'20'},
    {id:'18',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15', gender:'Female',blood:'A-',address:'Modinagar',mobile:'8596741230',age:'21'},
    ];
    return (
        <View>
        <FlatList
            data={patientsList}
            renderItem={({item})=>
                <Card style={styles.cardStyle}>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('PatientViewTab',item)}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                {item.gender=="Male"?<Image source={require('../../assets/boyAvatar.jpeg')} style={{height:50,width:50,borderRadius:50}}/>:
                                <Image source={require('../../assets/girlAvatar.jpg')} style={{height:50,width:50,borderRadius:50}}/>}
                            </View>
                            <View style={{flex:2}}>
                                <Text style={{color:'#ffffff'}}>{item.name}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Card>
            }
            keyExtractor={item=>item.id}
            numColumns={2}

        />
        </View>
    )
}

const styles = StyleSheet.create({
    cardStyle:{
        flex:1,
        paddingTop:5,
        width:'20%',
        backgroundColor:"#123456",
        margin:4,
        paddingLeft:15,
        borderColor:'#000000',
        borderWidth:3,
        borderRadius:10
    }
})