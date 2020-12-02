import * as React from 'react';
import {View,Text,StatusBar} from 'react-native';
import {MaterialCommunityIcons,AntDesign} from '@expo/vector-icons';
//import CalendarIcon from 'react-calendar-icon';
import {FlatList, ScrollView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {colors} from '../../extra/colors';
import { Button, Caption, Searchbar, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const tasks=[
    {
        Name:'Dr.Ernest Lopez',
        _id:"5f9a9633348079137570f8f3",
    },

    {
        Name:'Dr.Samrat ',
        _id:"5f9a9633348079137570f8f4",
    },

    {
        Name:'Dr.Ravi Jackson',
        _id:"5f9a9633348079137570f8f5",
    },
    
    {
        Name:'Dr.vivek Ivan',
        _id:"5f9a9633348079137570f8f6",
    },
];





export default function App(props){

    const Task = ({item}) =>{
        return (
            <TouchableWithoutFeedback onPress={()=>{props.navigation.navigate('DoctorDetails',{doctor:item})}}>
            <View style={{
              backgroundColor:colors.themeDark,
              flexDirection:'row',
              marginHorizontal:16,
              marginVertical:4,
              borderRadius:20,
              paddingVertical:20,
              paddingHorizontal:20 ,
              width:"95%",
              alignSelf:"center",
              alignItems:'center',
              justifyContent:'space-between'
            }}>
                <View style={{flexDirection:'row'}}>
                    <MaterialCommunityIcons 
                        name="doctor"
                        size={30}
                        color="white"
                        style={{marginRight:10,marginTop:5}}
                    />
                    <View>
                        <Text style={{fontSize:16,color:"white"}}>{item.Name}</Text>
                        <Text style={{color:colors.grey}}>{item.location}</Text>
                    </View>
                </View>
                <Button mode="contained" color={colors.contrast}>Show</Button>
            </View>
            </TouchableWithoutFeedback>
        )
    }
   
    return (
        <View style={{flex:1,backgroundColor:colors.white}}>
            <StatusBar barStyle="light-content" backgroundColor={colors.themeColor} />
            
            <View style={{backgroundColor:colors.white}}>
               
                <View style={{padding:2}} >
                    <Title style={{alignSelf:"center",marginTop:10}}>{"Schedule an appointment"}</Title>
                    <Searchbar style={{padding:1,marginTop:5,borderColor:"black",borderWidth:1,width:"95%",borderRadius:10,alignSelf:"center"}}/>
                </View>
            </View>
            {/* <Caption style={{fontSize:20,margin:10,fontWeight:"bold",marginTop:20}}>Book a Doctor</Caption> */}
            <FlatList 
                initialNumToRender={8}
                data={tasks}
                style={{marginTop:20}}
                renderItem = {Task}
                keyExtractor={item => item['_id']}
            />
        </View>
        
    );
}
