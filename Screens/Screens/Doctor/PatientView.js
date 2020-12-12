import React from 'react'
import { StyleSheet, TextInput,Text, View,Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Card} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function PatientView(props) {
    let infoFetched=props.route.params;
    return (
        <ScrollView>
            <Card style={{margin:"2%",borderRadius:50}}>
            <View style={{flexDirection:'row'}}>
                <View style={{padding:"5%",paddingLeft:"5%",flex:3,flexWrap:'wrap'}}>
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
                <View style={{marginTop:"5%",paddingLeft:"15%",flex:2,flexWrap:'wrap'}}>
                {infoFetched.gender=="Male"?<Image source={require('../../assets/boyAvatar.jpeg')} style={{height:"50%",width:"50%",borderRadius:50,resizeMode:'contain'}}/>:
                        <Image source={require('../../assets/girlAvatar.jpg')} style={{height:"100%",width:"100",borderRadius:50}}/>}
                </View>
            </View>
            </Card>
            <View style={{borderWidth:1,borderColor:'black',marginHorizontal:10,borderRadius:50,padding:15}}>
            <TextInput multiline={true} placeholder='Enter Your Report Here......'/>
            </View>
        </ScrollView>
    )
}



const styles = StyleSheet.create({})
