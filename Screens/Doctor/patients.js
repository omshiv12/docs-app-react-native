import AsyncStorage from '@react-native-community/async-storage';
import React from 'react'
import {Image, StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import { Base64 } from '../../Base64';
import { colors } from '../../extra/colors';
export default function Patients(props) {
    let patientsList = [
        {id:'1',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15', gender:'Male',blood:'A+',address:'Hapur',mobile:'7060207573',age:'19'},
        {id:"5fc294fb328b5e0d8fc3eef4",name:'Punit Jain',condition:'Normal Cough/Cold', time:'11:50-12:15', gender:'Female',blood:'B-',address:'Indore',mobile:'6352419870',age:'20'},
        {id:'3',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15', gender:'Female',blood:'A-',address:'Modinagar',mobile:'8596741230',age:'21'},
        {id:'4',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15', gender:'Male',blood:'A+',address:'Hapur',mobile:'7060207573',age:'19'},
        {id:'6',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15', gender:'Female',blood:'A-',address:'Modinagar',mobile:'8596741230',age:'21'},
        {id:'7',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15', gender:'Male',blood:'A+',address:'Hapur',mobile:'7060207573',age:'19'},
        {id:'9',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15', gender:'Female',blood:'A-',address:'Modinagar',mobile:'8596741230',age:'21'},
        {id:'10',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15', gender:'Male',blood:'A+',address:'Hapur',mobile:'7060207573',age:'19'},
        {id:'12',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15', gender:'Female',blood:'A-',address:'Modinagar',mobile:'8596741230',age:'21'},
        {id:'13',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15', gender:'Male',blood:'A+',address:'Hapur',mobile:'7060207573',age:'19'},
        {id:'15',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15', gender:'Female',blood:'A-',address:'Modinagar',mobile:'8596741230',age:'21'},
        {id:'16',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15', gender:'Male',blood:'A+',address:'Hapur',mobile:'7060207573',age:'19'},
        
    ];

    const [doctorData,setDoctorData] = React.useState({});
    const [patientList,setPatientList] = React.useState([]);

    React.useEffect(() => {
        getData();
    },[])

    const getData = async() => {
        let doctor = await AsyncStorage.getItem('doctor');
        doctor = JSON.parse(doctor);
        setDoctorData(doctor);
        let get = {
            Doctor_Id : doctor['_id'],
            Favorite : 1,
        };
        get = Base64.encode(JSON.stringify(get));
        fetch('http://192.168.1.11:5000/retrieve/favorites/'+get)
        .then(res => res.json())
        .then((resultJson) => {
            if(resultJson.status =="Success"){
                console.log(resultJson);
                console.log("Go");
                setPatientList(resultJson.data);
                if(resultJson.data.length == 0){
                    alert("No Data Found");
                }
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <View>
        <FlatList
            data={patientList}
            renderItem={({item})=>
                <Card style={styles.cardStyle}>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('PatientViewTab',{patient:item})}>
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
        paddingVertical:10,
        width:'20%',
        backgroundColor:colors.themeDark,
        margin:4,
        paddingLeft:15,
        borderColor:'#000000',
        borderWidth:3,
        borderRadius:10
    }
})