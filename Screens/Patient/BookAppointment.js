import * as React from 'react';
import {StyleSheet,AppRegistry,View,Text,TextInput,Button,Image,TouchableOpacity,StatusBar,ScrollView,Dimensions, Picker} from 'react-native';
import { Caption, Checkbox, Chip, Subheading, Title } from 'react-native-paper';
import {
    MaterialCommunityIcons,
    AntDesign,
    SimpleLineIcons
} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../../extra/colors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { Base64 } from '../../Base64';
const Layout={
    height:Dimensions.get('window').height,
    width:Dimensions.get('window').width,
}
const Colors={
    theme:'#24685b',
    white:'#fff',
    greyish:'#a4a4a4'
}
const dateObj = new Date();
const month = dateObj.getUTCMonth() + 1; //months from 1-12
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();
date = new Date(Date.parse(day+"/"+month+"/"+year))

const chips = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM'];

newdate = year + "/" + month + "/" + day;
export default class App extends React.Component{
    constructor(){
        super();
        this.state={
          doctor:'',
          doctorName:'',
          patient:'',
          name:'',
          age:'',
          diseases:'',
          date:'',
          time:'',
          selectDate:false,
          activeIndex:null,
          mobile:'',
          address:'',
          blood_grp:'',
          gender:'',
        }
        this.selectDate = this.selectDate.bind(this);
        this.bookAppointment = this.bookAppointment.bind(this)
        this.getDate = this.getDate.bind(this)
        this.getPatient = this.getPatient.bind(this);
    }

    componentDidMount(){
        this.getPatient();
        if(this.props.route.params){
            let doctor = this.props.route.params.doctor;
            // console.log(this.props.route.params);
            this.setState({doctor});
        }
    }

    getPatient = async() => {
        const patient =await AsyncStorage.getItem('patient');
        let patientParsed = JSON.parse(patient);
        this.setState({patient:patientParsed});
        this.setDetails();
    }

    setDetails = () => {
        this.setState((prevState => ({
            name:prevState.patient.Name,
            age:prevState.patient.Age,
            patientId:prevState.patient["_id"],
            doctorName:prevState.doctor.Name,
            doctorId:prevState.doctor['_id'],
            gender:prevState.patient.Gender,
            blood_grp:prevState.patient.Blood_Group,
            mobile:prevState.patient.Mobile,
            address:prevState.patient.Address,
        })))
    }

    bookAppointment = () => {
        if(this.state.doctorName && this.state.name && this.state.age && this.state.date && this.state.time)
        {
            let appoint = {
                Doctor_Id : this.state.doctorId,
                Doctor_Name : this.state.doctorName,
                Patient_Id: this.state.patientId,
                Name: this.state.name,
                Age: this.state.age,
                Diseases : this.state.diseases,
                Time: this.state.time,
                Date_Of_Appointment : this.state.date,
                Status:"Pending Approval",
                Blood_Group : this.state.blood_grp,
                Address: this.state.address,
                Mobile : this.state.mobile,
                Gender : this.state.gender,
            }

            let fav = {
                Doctor_Id : this.state.doctorId,
                Patient_Id : this.state.patientId,
                Patient_Name : this.state.name,
                Age: this.state.age,
                Mobile:this.state.mobile,
                Gender : this.state.gender,
                Favorite: 0,
            }

            let share = {
                Doctor_Id: this.state.doctorId,
                Patient_Id:this.state.patientId,
                Share_Report : this.state.shareReport ? 1 : 0,
                Sensitive_Information : this.state.sensitiveInfo ? 1 : 0,
            }
            share = Base64.encode(JSON.stringify(share));
            appoint = Base64.encode(JSON.stringify(appoint));
            fav = Base64.encode(JSON.stringify(fav));
            // console.log('http://192.168.1.11:5000/insert/appointments/'+appoint);
            fetch('http://192.168.1.11:5000/insert/appointments/'+appoint)
            .then(result => result.json())
            .then((resultJson) => {
                // console.log(resultJson);
                if(resultJson.status=="Success"){
                    console.log("Appointment Booked");
                    this.props.navigation.navigate('PatientDashboard');
                }
                else{
                    console.log("Error booking appointment");
                }
            })
            .catch(err => console.log(err))

            fetch('http://192.168.1.11:5000/insert/favorites/'+fav)
            .then(res => res.json())
            .then(resultJson => {
                if(resultJson.status =="Success"){
                    console.log("Fav. Set");
                }
                else{
                    console.log("Error Setting Fav.");
                }
            })
            .catch(err=>console.log(err))
            // console.log('http://192.168.1.11:5000/insert/sharing/'+share);
            fetch('http://192.168.1.11:5000/insert/sharing/'+share)
            .then(result => result.json())
            .then((resultJson) => {
                // console.log(resultJson);
                if(resultJson.status=="Success"){
                    alert("Appointment Booked Successfully");
                }
                else{
                    alert("Error booking");
                }
            })
            .catch(err => console.log(err))
        }
        else{
            alert("Please enter details correctly");
        }
    }

    selectDate = () => {
        this.setState({selectDate:true});
    }


    getDate = (event,date)=>
    {       
        console.log(date);
        let newDate = new Date(date);
        let day = newDate.getDate();
        let month = newDate.getMonth();
        let year = newDate.getFullYear();
        let updatedDate = day+'/'+month+'/'+year;
        this.setState({date:updatedDate,selectDate:false})     
    }
        
    
    render(){
        return(


            <ScrollView style={{flex:1}}>
                <View style={{backgroundColor:colors.themeColor,
                    paddingBottom:Layout.height*0.2,
                    borderBottomLeftRadius:Layout.width*0.1,
                    borderBottomRightRadius:Layout.width*0.1
                
                
                }}>
                </View>
                <View style={{
                    backgroundColor:Colors.white,
                    marginHorizontal:15,
                    padding:20,
                    borderRadius:20,
                    elevation:8,
                    marginBottom:16,
                    marginTop:-Layout.height *0.15
                }}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:8}}>
                        <Title >Book Appointment</Title>
                        <AntDesign name="book" size={20}/>
                    </View>
                
                    <View>
                    <TextInput placeholder="Doctor"
                    helperText="Doctor"
                    value={this.state.doctorName}
                    onChangeText={(text)=>{this.setState({name:text})}}
                    style={styles.input}/>

                    <TextInput placeholder="Patient Name"
                    value={this.state.name}
                    onChangeText={(text)=>{this.setState({name:text})}}
                    style={styles.input}/>
                    
                    <TextInput placeholder="Age"
                    value={this.state.age}
                    onChangeText={(text)=>{this.setState({age:text})}}
                    style={styles.input}/>

                    <TextInput placeholder="Gender - Male / Female / Other"
                    value={this.state.gender}
                    onChangeText={(text)=>{this.setState({gender:text})}}
                    style={styles.input}/>  

                    <TextInput placeholder="Blood Group"
                    value={this.state.blood_grp}
                    onChangeText={(text)=>{this.setState({blood_grp:text})}}
                    style={styles.input}/>

                    <TextInput placeholder="Address"
                    value={this.state.address}
                    onChangeText={(text)=>{this.setState({address:text})}}
                    style={styles.input}/>

                    <TextInput placeholder="Mobile"
                    value={this.state.mobile}
                    onChangeText={(text)=>{this.setState({mobile:text})}}
                    style={styles.input}/>



                    <TextInput placeholder="Reason for Appointment / Symptoms / Diseases"
                    onChangeText={(text)=>{this.setState({diseases:text})}}
                    multiline={true}
                    style={styles.input}/>
                    {
                        this.state.selectDate && 
                        (<DateTimePicker
                            value={date}
                            mode={"date"}
                            dateFormat="day month year"
                            minimumDate={new Date()}
                            maximumDate={new Date(new Date().setMonth(new Date().getMonth()+1))}
                            onChange={this.getDate}
                            onDismiss={()=>{this.setState({selectDate:false})}}
                          />)
                    }
                    <View style={{flexDirection:"row",width:"100%"}}>
                        <TextInput placeholder="Appointment Date"
                        value={this.state.date}
                        onChangeText={(text)=>{this.setState({name:text})}}
                        style={[styles.input,{width:"85%"}]}/>
                        <TouchableWithoutFeedback containerStyle={{marginTop:"13%"}} onPress={this.selectDate}>
                            <MaterialCommunityIcons name="calendar" size={26} color={colors.themeDark} />
                        </TouchableWithoutFeedback>
                    </View>
                    
                    <Text style={{marginTop:"5%",marginBottom:10}}>Time</Text>
                    <View style={{flexDirection:"row",width:"100%",flexWrap:"wrap"}}>
                    {chips.map((value, index) => (
                        <Chip key={index}  selected={this.state.activeIndex == index ? true : false} icon="clock" mode="outlined" onPress={() => this.setState({activeIndex:index,time:value})} selectedColor={colors.themeDark} style={{color:"white",margin:5}}  textStyle={{ fontSize: 15,padding:5 }}>{value}</Chip>
                    ))}
                        
                    </View>
                    </View> 
                    <View style={{marginTop:"5%"}}>
                        <View style={styles.buttonContainer}>
                            <Checkbox color={colors.themeDark} status={this.state.shareReport ? 'checked' : 'unchecked'} title="Share Reports" onPress={()=>{this.setState((prevState => ({shareReport:!prevState.shareReport})))}} styles={{borderRadius:50,}}/><Text style={{textAlignVertical:"center"}}>Share Reports</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Checkbox color={colors.themeDark} status={this.state.sensitiveInfo ? 'checked': 'unchecked'} title="Share Sensitive Data" onPress={()=>{this.setState((prevState => ({sensitiveInfo:!prevState.sensitiveInfo})))}} styles={{borderRadius:50,onTopMargin:20}} /><Text style={{textAlignVertical:"center"}}>Share Sensitive Data</Text>
                        </View>
                    </View>
                    
            
                    <View style={{elevation:10,marginBottom:"5%",width:"90%",marginTop:"5%",alignContent:"center",alignSelf:"center"}}>
                        <Button color={colors.themeDark} style={{marginBottom:"10%",width:"90%",alingSelf:"center",elevation:10}} title="Book" onPress={this.bookAppointment}/>
                    </View>
                </View>
                
                
            </ScrollView>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F5FCFF',
        flexDirection: 'row',
    },
    input:{
        flexDirection:'row',
            borderWidth:0.5,
            padding:10,
            borderRadius:10,
            marginHorizontal:"3%",
            marginTop:"10%"
    },
    button:{
        width:250,
        height:50,
        backgroundColor:'#330066',
        borderRadius:30,
        justifyContent:'center',
        marginTop:15
    },
    text:{
        fontSize:18,
        color:'white',
        textAlign:'center'
    },
    daboo:{
        flexDirection:'row',
        paddingHorizontal:32,
        marginVertical:36,
        alignItems:'center',
        justifyContent:'flex-start'
    },
    buttonContainer: {
      flex: 1,
      borderRadius:30,
      flexDirection:"row"
      
    }
    
});