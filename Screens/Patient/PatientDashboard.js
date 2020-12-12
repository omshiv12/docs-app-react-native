import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { colors } from '../../extra/colors';
import { AuthContext } from '../../auth/AuthContext';

export default function FirstPage(props) {

    const {signOut} = React.useContext(AuthContext);
    return (
        <ScrollView>
        <View>
            <TouchableOpacity onPress={()=>props.navigation.navigate("Consultation")}>
            <View style={styles.card}>
            <View style={{flex:4}}>
            <Text style={{fontSize:14,color:"#ffffff",marginTop:20,marginLeft:10}}>Good Bye Doubts</Text>
            <Text style={styles.cardText}>Say Hello To Doctor!</Text>
            <View style={{borderBottomWidth:1.5,marginTop:9,width:200,marginLeft:10,borderBottomColor:"#ffffff"}}></View>
            <Text style={{fontSize:25,color:"#85ff88",marginTop:10,marginLeft:10}}>50% OFF</Text>
            <Text style={{fontSize:14,color:"#85ff88",marginLeft:10}}>On Your First Consultation.</Text>
            <Text 
            style={{fontSize:15,
            color:"#224D80",
            marginTop:10,
            marginLeft:10,
            backgroundColor:'#ffffff',
            width:150,
            borderRadius:8,
            paddingLeft:5
            }}>
            Use Code:MMG50
            </Text>
            </View>
            <View style={{flex:2,marginRight: 30,}}>
                <Image source={require("../../assets/helloDoctor.png")} style={styles.helloDoctor}/>
            </View>
            </View>
            </TouchableOpacity>
            
            <View style={{flexDirection:'row',flex:1}}>
                <View style={styles.optCard1}>
                <TouchableOpacity onPress={()=>props.navigation.navigate("MyAppointments")}>
                    <View style={{alignItems:'center'}}>
                    <Text style={{color:"#ffffff",fontSize:15,marginTop:30}}>My Appointments</Text>
                    <FontAwesome5 name="clipboard-list" size={60} color="#ffffff"  />
                    </View>
                </TouchableOpacity>
                </View>
                <View style={styles.optCard2}> 
                    <TouchableOpacity onPress={()=>props.navigation.navigate("DiseaseList")}>
                        <View style={{alignItems:'center'}}>
                            <Text style={{color:"#ffffff",fontSize:15,marginTop:30}}>Book Your Appointment</Text>
                            <MaterialIcons name="laptop-chromebook" size={60} color="#ffffff"  />
                        </View>
                    </TouchableOpacity>
                </View>
               
            </View>
               
            <View style={{flexDirection:'row',flex:1}}>
                <View style={styles.optCard1}>
                    <TouchableOpacity onPress={()=>props.navigation.navigate("records")}>
                        <View style={{alignItems:'center'}}>
                        <Text style={{color:"#ffffff",fontSize:15,marginTop:30}}>Medical Records</Text>
                        <Octicons name="file-directory" size={60} color="#ffffff"  />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.optCard2}> 
                    <TouchableOpacity onPress={()=>signOut()}>
                        <View style={{alignItems:'center'}}>
                            <Text style={{color:"#ffffff",fontSize:15,marginTop:30}}>SignOut</Text>
                            <MaterialIcons name="laptop-chromebook" size={60} color="#ffffff"  />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card:{
        backgroundColor:colors.themeDark,
        height:200,
        width:"95%",
        marginHorizontal:10,
        borderRadius:10,
        marginVertical:20,
        flexDirection: 'row',
    },
    cardText:{
        color:"#ffffff",
        fontSize:20,
        marginLeft: 10,
    },
    helloDoctor:{
        height:"100%",
        width:"100%",
        resizeMode:'contain',
    },
    optCard1:{
        height:150,
        borderRadius:30,
        marginHorizontal:5,
        marginLeft:10,
        backgroundColor:colors.themeDark,
        flex:2,
        },
    optCard2:{
        height:150,
        borderRadius:30,
        marginHorizontal:5,
        marginBottom:10,
        backgroundColor:colors.themeDark,
        flex:2,
        }
});