import React, { useState } from 'react'
import { StyleSheet, TextInput,Text, View,Image } from 'react-native'
import { Button, Card} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker'; 
import { colors } from '../../extra/colors';
import { Base64 } from '../../Base64';
import AsyncStorage from '@react-native-community/async-storage';
import { useRoute } from '@react-navigation/native';
export default class ShowReport extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            recordData : {
                Doctor_Name : "Dr. Joey Hannigan",
                Patient_Name : "Mukund Madhav Goyal",
                Age: 19,
                Image_Text: "Log 1 of 1\nReact Native version mismatch",
                Date : "12/12/2020",
                Notes: "X-Ray Required",
            


            },
        }
    }
    componentDidMount() {
        const recordData = this.props.route.params;
        console.log(recordData);
        if(recordData){
            let record  = this.props.route.params.record;
            this.setState({recordData : record});
        }
    }
    render(){   
    return (
        <ScrollView >
            <View style={{flex:1,backgroundColor:"white",height:"100%"}}>
                <View style={{flex:5}}>
                    <Card style={{marginHorizontal:"2%",marginTop:"2%",borderRadius:10,backgroundColor:colors.themeColor}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{padding:"5%",paddingLeft:"5%",flex:7,flexWrap:'wrap',flexDirection:"column"}}>
                                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                                    {/* <MaterialCommunityIcons name="information" size={26} color="white" style={{marginRight:10}} /> */}
                                    {/* <Text style={{fontSize:20,color:"white"}}>Basic Information</Text> */}
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text style={{color:"white"}}>Doctor Name: </Text>
                                    <Text style={{color:"white"}}>{this.state.recordData.Doctor_Name}</Text>
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text style={{color:"white"}}>Name: </Text>
                                    <Text style={{color:"white"}}>{this.state.recordData.Name}</Text>
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text style={{color:"white"}}>Age: </Text>
                                    <Text style={{color:"white"}}>{this.state.recordData.Age}</Text>
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text style={{color:"white"}}>Treatment Details/Prescription : </Text>
                                    <Text style={{color:"white"}}>{this.state.recordData.Notes}</Text>
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text style={{color:"white"}}>Date: </Text>
                                    <Text style={{color:"white"}}>{this.state.recordData.Date}</Text>
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text style={{color:"white"}}>Text Retrieved From Image: </Text>
                                    <Text style={{color:"white"}}>{this.state.recordData.Image_Text}</Text>
                                </View>
                            </View>
                            <View style={{flex:4,flexWrap:'wrap'}}>
                            <Image source={require('../../assets/boyAvatar.jpeg')} style={{height:"50%",width:"80%",resizeMode:'contain'}}/>
                                    {/* <Image source={require('../../assets/girlAvatar.jpg')} style={{height:"50%",width:"80%",borderRadius:20,resizeMode:'contain'}}/>} */}
                                    {/* <MaterialIcons name="favorite" size={40} color={iconColor} style={{alignSelf:'flex-end',position:"absolute",bottom:0,margin:10,marginRight:10,right:10}} onPress={favClicked}/> */}
                            </View>
                        </View>

                        {/* <Image source = {require(`${recordData.Image_Path}`)}/> */}
                    </Card>
                </View>
                </View>
                {/* <View style={{flex:7}}>
                    <View style={{borderWidth:1,borderColor:'black',margin:"2%",borderRadius:10,padding:15,flex:5}}>
                        <TextInput multiline={true} onChangeText={(notes)=>{setNotes(notes)}} placeholder='Prescription / Treatment Details' style={{height:300,textAlignVertical:"top"}}/>
                    </View> */}
                    {/* <View style={{ flexDirection:'row',flex:5}}>
                    <MaterialCommunityIcons name="camera" size={30} color="#999999" />
                    <MaterialCommunityIcons name="text-to-speech" size={26} color="#999999" />
                    </View>    */}
                        {/* <Button icon="camera" mode="text" style={{width:"95%",alignSelf:"center",borderRadius:20}} color={colors.themeColor} onPress={addImage}> */}
                            {/* Add Report
                        </Button>
                    {image ? (
                    <View>
                        <Image source={{ uri: image.uri}} style={{height:100,width:100,alignSelf:"center"}}/>
                        <Text style={{alignSelf:"center"}}>RETRIEVED TEXT FROM IMAGE: {"\n\n"}{text}</Text> 
                    </View>
                    ) : null}    
                </View>  
                         
            </View>
            <Button mode="contained" color={colors.themeDark} style={{width:'100%',marginTop:5,marginBottom:0,padding:'2%',borderRadius:10,alignSelf:'center'}}
            onPress={()=>{saveData()}}>
                    Save
                </Button>   */}
        </ScrollView>
    )
}
}



