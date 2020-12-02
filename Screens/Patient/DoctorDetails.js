import * as React from 'react';
import {StyleSheet,AppRegistry,View,Text,Image,TouchableOpacity,StatusBar,ScrollView,Dimensions} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

//import moment from 'moment';
import {
    MaterialCommunityIcons,
    AntDesign,
    SimpleLineIcons
} from '@expo/vector-icons';
import { colors } from '../../extra/colors';
import { Button, Caption, Dialog, Portal ,} from 'react-native-paper';
import { Provider } from 'react-native-paper';
const Layout={
    height:Dimensions.get('window').height,
    width:Dimensions.get('window').width,
}
const Colors={
    theme:'#24685b',
    white:'#fff',
    greyish:'#a4a4a4'
}
export default class DoctorDetails extends React.Component{
    constructor(){
        super();
        this.state={
            dateShow:false,
            date:'',
            doctor:'',
            bookShow:false,
            doctorId:1,
        }
    }

    componentDidMount(){
        const doctor = this.props.route.params.doctor;
        this.setState({doctor:doctor})
    }

    bookAppointment=()=>{
        this.props.navigation.navigate('BookAppointment',{doctor:this.state.doctor})
        
    }
    render(){
        return(


            <View style={{flex:1,elevation:8}}>
            
                <View style={{backgroundColor:colors.themeDark,
                    paddingBottom:Layout.height*0.2,
                    borderBottomLeftRadius:Layout.width*0.1,
                    borderBottomRightRadius:Layout.width*0.1
                
                
                }}>
                    <View style={{alignItems:'flex-end',
                        paddingHorizontal:32,
                        marginVertical:20        
                    }}>
                    
                        <SimpleLineIcons name="equalizer" size={20} />
                    </View>
                    <View style={styles.daboo}>
                        {/* <Image
                        source={require("./assets/images/doctor.jpg")}
                        style={{width:50,height:50,marginRight:16,borderRadius:30,alignItems:'center',justifyContent:'center'}}/> */}
                        <View>
                            <Text style={{fontSize:20,color:"white"}}>{this.state.doctor['Name']}</Text>
                            <Text style={{color:colors.grey}}>Specialist</Text>
                        </View>
                    
                    </View>
                </View>
            <View style={{
                backgroundColor:colors.white,
                marginHorizontal:32,
                padding:20,
                borderRadius:20,
                elevation:8,
                marginBottom:16,
                marginTop:-Layout.height *0.15
            }}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:8,marginTop:0}}>
                    <Text>Bio</Text>
                    <AntDesign name="user" size={20}/>
                </View>
                
                <View>
                    <Text>
                        It deals with the diagnosis and treatment of such conditon
                        as congenital heart defects,coronary artery diseases,electrophysiology,
                        heart failure and valvular heart diseases
                    </Text>
                </View> 
            </View>
            <View style={{
                backgroundColor:Colors.white,
                marginHorizontal:32,
                padding:20,
                borderRadius:20,
                elevation:8,
                marginBottom:8,
                
            }}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:8}}>
                    <Text>Skills</Text>
                    <MaterialCommunityIcons name="pen" size={20}/>
                </View>
                <View>
                    <Text>
                        Specialist,over 30 years of experience ,
                    </Text>
                </View> 
            </View>
            
            
            <View style={[styles.container,{backgroundColor:null}]}>
                <Button mode="contained" color={colors.contrast} style={{borderRadius:10,width:"80%",justifyContent:"center",marginBottom:10}} onPress={this.bookAppointment}>Book Now</Button>
           
            
            </View>
            
            
        </View>
        
        
            
        
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.themeDark,
        position:"absolute",
        bottom:0,
        width:"100%"
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
        marginBottom:"5%",
        alignItems:'center',
        justifyContent:'flex-start'
    }
    
});