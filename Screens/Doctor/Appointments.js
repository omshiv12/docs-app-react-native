import moment from 'moment';
import React ,{useState}from 'react'
import { Button,StyleSheet, Text, View ,Image, Alert} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
export default function Appointments(props) {
    let appointmentList=[{id:'1',name:'Mukund Madhav Goyal',condition:'No problem', time:'12:50-13:15', gender:'Male',blood:'A+',address:'Hapur',mobile:'7060207573',age:'19'},
                     {id:'2',name:'Punit Jain',condition:'Serious Heart Disease Due To Anwesha Singh', time:'11:50-12:15', gender:'Female',blood:'B-',address:'Indore',mobile:'6352419870',age:'20'},
                     {id:'3',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15', gender:'Female',blood:'A-',address:'Modinagar',mobile:'8596741230',age:'21'},
                     ];
    const [isPickerVisible, setPickerVisibility] = useState(false);
    const [dt,setDt]=useState('');
    let rt;
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
    Alert.alert('Confirm?','Reschedule to '+rt,[{text:'Cancel'},{text:'Ok'   ,onPress:(alert('update time and sort the list again'))   }]);
    };
    return (
        <View>
        <FlatList
            data={appointmentList.sort((a, b) => a.time.localeCompare(b.time))}
            renderItem={({item})=>
            <Card style={styles.cardStyle}>
                <TouchableOpacity onPress={()=>props.navigation.navigate('PatientViewTab',item)}>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:2}}>
                            {item.gender=="Male"?<Image source={require('../../assets/boyAvatar.jpeg')} style={{height:90,width:90,borderRadius:50}}/>:
                            <Image source={require('../../assets/girlAvatar.jpg')} style={{height:90,width:90,borderRadius:50}}/>}
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
                <DateTimePickerModal
                isVisible={isPickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hidePicker}
            />
                <TouchableOpacity onPress={showPicker}>
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
