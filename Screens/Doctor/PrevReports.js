import AsyncStorage from '@react-native-community/async-storage';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Caption, Card, Title } from 'react-native-paper';
import { Base64 } from '../../Base64';
import { colors } from '../../extra/colors';

export default function PrevReports(props) {
    let prevReports=[{id:'1',doctorName:'Ernest Lopez',Date:'23/12/2025'},
                     {id:'2',doctorName:'Hulululu',Date:'23/12/2025'},
                     {id:'3',doctorName:'XYZXYZ',Date:'23/12/2025'}
                    ];
    React.useEffect(()=>{
        getData();
    },[])
    const [allowed,setAllowed] = React.useState(false);
    const [sensitive,setSensitive] = React.useState(false);
    const [share,setShare] = React.useState({});
    const [doctorData,setDoctorData] = React.useState({});
    const [reportList, setReportList] = React.useState([]);

    const patientData = props.route.params.patient;


    const getData = async() => {
        let doctor = await AsyncStorage.getItem('doctor');
        doctor = JSON.parse(doctor);
        setDoctorData(doctor);
        let data = {
            Doctor_Id : doctor['_id'],
            Patient_Id : patientData['Patient_Id'],
        }
        console.log(patientData['_id'])
        data  = Base64.encode(JSON.stringify(data));
        // console.log('http://192.168.1.11:5000/retrieve/sharing/'+data);
        fetch('http://192.168.1.11:5000/retrieve/sharing/'+data)
        .then(res => res.json())
        .then((responseJson) => {
            console.log(responseJson)
            if(responseJson.status == "Success"){
                let obj = {};
                responseJson.data.forEach(el => obj = el);
                setShare(obj);
                if(obj.Share_Report == 1){
                    setAllowed(true);
                }
                if(obj.Sensitive_Information == 1){
                    setSensitive(true);
                }
                getReportList();
                
            }
            else{
                alert("Error fetching data");
            }
        })
        .catch(err => console.log(err))
    }

    const getReportList = () => {
        let get = {
            Doctor_Id : doctorData['_id'],
            Patient_Id : patientData['Patient_Id'],
        }
        if(sensitive != 1){
            get['Sensitive'] = 0;
        }
        get = Base64.encode(JSON.stringify(get));
        fetch('http://192.168.1.11:5000/retrieve/reports/'+get)
        .then(resp => resp.json())
        .then((response) => {
            if(response.status == "Success")
            {   

                setReportList(response.data);
                if(response.data.length == 0)
                {
                    alert("No Past Records Found");
                }
            }

        })
        .catch(err => console.log(err))
    }

    return (
        <View>
        {allowed ? (
        <FlatList
            data={reportList}
            renderItem={({item})=>
            <Card style={styles.cardStyle}>
            
                <TouchableOpacity>
                        <View style={{flex:5,paddingLeft:'5%',paddingTop:"5%"}}>
                            <Text style={{color:'#ffffff',fontSize:15}}>Doctor:  {item.Doctor_Name}</Text>
                            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            <Text style={{color:'#ffffff',fontSize:15}}>Notes: {item.Notes}</Text>
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
        ) : (
            <View style={{alignContent:"center",width:"96%",marginHorizontal:"2%",marginTop:"50%",alignSelf:"center",justifyContent:"center"}}>
                <Caption style={{fontSize:20,fontWeight:"bold",paddingHorizontal:"5%"}}>Permission Required!! Scan the Patients QR code to access the data.</Caption>
                <Button style={{marginTop:"10%"}} mode="text" icon="qrcode-scan" color={colors.contrast} onPress={()=>alert("Scan QR")}>Scan QR Code</Button>
            </View>
        ) }
        </View>
    )
}

const styles = StyleSheet.create({
    cardStyle:{
        flex:1,
        backgroundColor:colors.themeColor,
        margin:3,
        paddingBottom:12,
        alignContent:"center",
        justifyContent:"center",
        borderWidth:1,
        borderRadius:10
    }
})
