import React, { Component } from 'react'
import QRCode from 'react-native-qrcode-generator';
 
import {
    StyleSheet,
    View,
    TextInput
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Caption, RadioButton } from 'react-native-paper';
import { colors } from '../../extra/colors';
 
export default class QRCodePatient extends Component {
    constructor(props){
        super(props);
        this.state = {
            qrCodeText:'',
            patientId:'',
        };
        this.getCustomer = this.getCustomer.bind(this);
        this.setQrData = this.setQrData.bind(this);
    }
 
    componentDidMount() {
      this.getCustomer();
    }

    getCustomer = async() => {
        const patient = await AsyncStorage.getItem('patient');
        let patientParsed = JSON.parse(patient);
        this.setState({patientId:patientParsed['_id']},this.setQrData);
    }

    setQrData = (sensitive) => {
        let qr = {};
        if(sensitive == 0){
            qr = {
                patientId : this.state.patientId,
            }
        }
        else{
            qr = {
                patientId : this.state.patientId,
                sensitive : 1,
            }
        }
        qr = JSON.stringify(qr);
        this.setState({qrCodeText:qr});

    }


    render() {
        return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({text: text})}
                placeholder={this.state.qrCodeText}
                placeholderTextColor={colors.themeDark}
                editable={false}
            />
            <QRCode
                value={this.state.qrCodeText}
                size={300}
                bgColor='black'
                fgColor='white'
            />
            <Caption style={{width:"80%",fontWeight:"bold",color:colors.themeColor,fontSize:20,marginTop:"10%"}}>Share this with a doctor to let him see your reports and medical history.</Caption>

        </View>
        );
    };
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
 
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});
 