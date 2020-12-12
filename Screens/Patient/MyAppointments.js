import moment from 'moment';
import React ,{useState}from 'react'
import { Button,RefreshControl,StyleSheet, Text, View ,Image, Alert} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-community/async-storage';
import { Base64 } from '../../Base64';
import { colors } from '../../extra/colors';

export default function MyAppointments(props) {
    // let appointmentList = 
    // [
    //     {id:'1',name:'Mukund Madhav Goyal',condition:'No problem', time:'12:50-13:15', gender:'Male',blood:'A+',address:'Hapur',mobile:'7060207573',age:'19'},
    //     {id:'2',name:'Punit Jain',condition:'Kuch toh hai', time:'11:50-12:15', gender:'Female',blood:'B-',address:'Indore',mobile:'6352419870',age:'20'},
    //     {id:'3',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15', gender:'Female',blood:'A-',address:'Modinagar',mobile:'8596741230',age:'21'},
    // ];
    const [isPickerVisible, setPickerVisibility] = useState(false);
    const [dt,setDt]=useState('');
    const [appoint,setAppoint] = React.useState([]);
    const [refresh,setRefresh] = React.useState(false);
    let rt;

    React.useEffect(()=>{
        getPatients();
    },[])

    const getPatients = async() => {
        let patient = await AsyncStorage.getItem('patient');
        patient = JSON.parse(patient);
        let patientId =  patient['_id'];
        patient = {
            Patient_Id : patientId,
        }
        patient = Base64.encode(JSON.stringify(patient));
        // let key = Base64.encode('Doctor_Id');
        fetch('http://192.168.1.11:5000/retrieve/appointments/'+patient)
        .then(res => res.json())
        .then((resultJson) => {
            console.log(resultJson)
            setAppoint(resultJson.data);
            // console.log(JSON.stringify(resultJson.data));
        })
        .catch(err => console.log())
    } 

    const confirmAppointment = (id) => {
        let where = {
            _id : id,
        }
        let stat = {
            Status : "Approved"
        } 


        console.log(where);
        console.log("Entered");
        stat = Base64.encode(JSON.stringify(stat))
        where = Base64.encode(JSON.stringify(where));
        fetch('http://192.168.1.11:5000/update/appointments/'+stat+'/'+where)
        .then(res => res.json())
        .then((resultJson) => {
            if(resultJson.status =="Success"){
                alert("Appointment Confirmed");
                onRefresh();
            }
            else{
                alert("Error Occured");
            }
        })
        .catch(err => console.log(err))
    }

    const reschedule = (id) => {
        let where = {
            _id : id,
        }
        let stat = {
            Status : "Rescheduled - Confirmation Pending"
        } 

 
        console.log(where);
        stat = Base64.encode(JSON.stringify(stat))
        where = Base64.encode(JSON.stringify(where));
        fetch('http://192.168.1.11:5000/update/appointments/'+stat+'/'+where)
        .then(res => res.json())
        .then((resultJson) => {
            if(resultJson.status =="Success"){
                alert("Appointment Rescheduled - Confirmation Pending");
                onRefresh();
            }
            else{
                alert("Error Occured");
            }
        })
        .catch(err => console.log(err))
    }

    const showPicker = () => {
        setPickerVisibility(true);
    };

    const hidePicker = () => {
        setPickerVisibility(false);
    };

    const handleConfirm = (datetime) => {
        rt=moment(datetime).format('DD-MM-YYYY HH:mm')
        setDt(rt);
        hidePicker();
        Alert.alert('Confirm?','Reschedule to '+rt,[{text:'Cancel'},{text:'Ok'   ,onPress:()=>{ reschedule() }}]);
    };

    const onRefresh = () => {
        setRefresh(true)
        getPatients();
        setRefresh(false)
    }

    return (
        <View>
        <FlatList
            // data={appoint.sort((a, b) => a.time.localeCompare(b.time))}
            data  = {appoint}
            refreshControl = {
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={()=>{onRefresh()}}
                />
              }
            keyExtractor={(item,index) => index.toString()}
            renderItem={({item})=>
            <Card style={styles.cardStyle}>
                {/* <TouchableOpacity onPress={()=>props.navigation.navigate('PatientViewTab',{patient:item})}> */}
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:2}}>
                            {item.Gender=="Male"?<Image source={require('../../assets/boyAvatar.jpeg')} style={{height:90,width:90,borderRadius:50}}/>:
                            <Image source={require('../../assets/girlAvatar.jpg')} style={{height:90,width:90,borderRadius:50}}/>}
                        </View>
                        <View style={{flex:5,marginLeft:40}}>
                            <Text style={{color:'white',fontSize:20}}>Doctor Name : {item.Doctor_Name}</Text>
                            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            <Text style={{color:'white',fontSize:15}}>Condition: {item.Diseases}</Text>
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            <Text style={{color:colors.contrast,fontSize:16}}>Timing: {item.Date_Of_Appointment}  - {item.Time}</Text>
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            <Text style={{color:colors.contrast,fontSize:16}}>Status: {item.Status}</Text>
                            </View>
                        </View>

                    </View>
                {/* </TouchableOpacity> */}
                <DateTimePickerModal
                    isVisible={isPickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirm}
                    onCancel={hidePicker}
                />
            {(item.Status !== "Pending Approval" && item.Status !=="Approved" && item.Status != "Cancelled") && 
            (    
                <View style={{flexDirection:"row",width:"100%",alignSelf:"center"}}>
                    <View style={{flexDirection:'row' ,alignSelf:'flex-start',margin:10,marginRight:0,width:"50%"}}>
                        {/* <TouchableOpacity onPress={showPicker} style={{flexDirection:"row"}}>
                            <MaterialIcons name="refresh" size={24} color={colors.contrast} style={{marginRight:5}}/>
                            <Text style={{color:colors.contrast,fontSize:16}}>Reschedule</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={{flexDirection:'row' ,alignSelf:'flex-end',alignContent:"flex-end",width:"50%",margin:10,marginLeft:0,paddingRight:10}}>
                        <TouchableOpacity onPress={() => {confirmAppointment(item['_id'])}} style={{flexDirection:"row",justifyContent:"flex-end"}}>
                            <MaterialIcons name="done" size={24} color={colors.contrast} style={{marginRight:5}} />
                            <Text style={{color:colors.contrast,fontSize:16,}}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            </Card>
            }
            keyExtractor={item => item.id}

        />
        </View>
    )
}

const styles = StyleSheet.create({
    cardStyle:{
        flex:1,
        paddingVertical:5,
        backgroundColor:colors.themeDark,
        alignContent:"center",
        justifyContent:"center",
        elevation:8,
        margin:10,
        paddingLeft:15,
        borderColor:'#000000',
        borderWidth:3,
        borderRadius:10
    }
})
