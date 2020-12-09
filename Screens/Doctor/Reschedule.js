import moment from 'moment';
import React ,{useState}from 'react'
import { Button,StyleSheet, Text, View } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
export default function Reschedule() {
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
        console.log(dt);
        hidePicker();
      };
    return (
        <View>
            <View>
                <Text style={{fontSize:24,color:'black'}}>date: {dt}</Text>
            </View>
            <Button title="Reschedule" onPress={showPicker} />
            <DateTimePickerModal
                isVisible={isPickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hidePicker}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({})
