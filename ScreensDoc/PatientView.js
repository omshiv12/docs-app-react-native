import React, { useState } from 'react'
import { StyleSheet, TextInput,Text, View,Image } from 'react-native'
import { Card} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
export default function PatientView(props) {
    let infoFetched=props.route.params;
    let [iconColor,setIconColor]=useState('black');
    function favClicked()
    {
        if(iconColor=='black')
        {
            setIconColor('red');
        }
        else
        {
            setIconColor('black');
        }
        console.log(iconColor);
    }
    return (
        <ScrollView>
            <View style={{flex:1}}>
                <View style={{flex:4}}>
                    <Card style={{marginHorizontal:"2%",marginTop:"2%",borderRadius:50}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{padding:"5%",paddingLeft:"5%",flex:7,flexWrap:'wrap'}}>
                                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                                    <MaterialCommunityIcons name="information" size={26} color="black" />
                                    <Text style={{fontSize:20}}>Basic Information</Text>
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text>Name: </Text>
                                    <Text>{infoFetched.name}</Text>
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text>Age: </Text>
                                    <Text>{infoFetched.age}</Text>
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text>Blood Group: </Text>
                                    <Text>{infoFetched.blood}</Text>
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text>Address: </Text>
                                    <Text>{infoFetched.address}</Text>
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text>Mobile Number: </Text>
                                    <Text>{infoFetched.mobile}</Text>
                                </View>
                            </View>
                            <View style={{flex:4,flexWrap:'wrap'}}>
                            {infoFetched.gender=="Male"?<Image source={require('../assets/boyAvatar.jpeg')} style={{height:"50%",width:"80%",borderRadius:50,resizeMode:'contain'}}/>:
                                    <Image source={require('../assets/girlAvatar.jpg')} style={{height:"50%",width:"80%",borderRadius:50,resizeMode:'contain'}}/>}
                                    <MaterialIcons name="favorite" size={40} color={iconColor} style={{alignSelf:'center'}} onPress={favClicked}/>
                            </View>
                        </View>
                    </Card>
                </View>
                <View style={{flex:7}}>
                    <View style={{borderWidth:1,borderColor:'black',margin:"2%",borderRadius:50,padding:15,flex:5}}>
                        <TextInput multiline={true} placeholder='Enter Report Here......' style={{height:300}}/>
                    </View>
                    {/* <View style={{ flexDirection:'row',flex:5}}>
                    <MaterialCommunityIcons name="camera" size={30} color="#999999" />
                    <MaterialCommunityIcons name="text-to-speech" size={26} color="#999999" />
                    </View>    */}
                    <TouchableOpacity>
                        <View style={{backgroundColor:'#145263',width:'80%',padding:'2%',borderRadius:50,alignSelf:'center',alignItems:'center'}}>
                            <Text style={{fontSize:20,color:"white"}}>Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>          
            </View>
        </ScrollView>
    )
}



const styles = StyleSheet.create({})
