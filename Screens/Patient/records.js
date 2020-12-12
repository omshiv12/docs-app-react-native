import React from 'react'
import { Image,StyleSheet, Text, View,RefreshControl } from 'react-native';
import { Card, Switch } from 'react-native-paper';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { Base64 } from '../../Base64';
import { colors } from '../../extra/colors';
export default function Reports() {
//   let reportsList=[{id:'1',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15'},
//                    {id:'2',name:'Punit Jain',condition:'Serious Heart Disease Due To Anwesha Singh', time:'11:50-12:15'},
//                    {id:'3',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15'},
//                    {id:'4',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15'},
//                    {id:'5',name:'Punit Jain',condition:'Serious Heart Disease Due To Anwesha Singh', time:'11:50-12:15'},
//                    {id:'6',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15'},
//                    {id:'7',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15'},
//                    {id:'8',name:'Punit Jain',condition:'Serious Heart Disease Due To Anwesha Singh', time:'11:50-12:15'},
//                    {id:'9',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15'},
//                    {id:'10',name:'Mukund Madhav Goyal',condition:'No problem', time:'10:50-11:15'},
//                    {id:'11',name:'Punit Jain',condition:'Serious Heart Disease Due To Anwesha Singh', time:'11:50-12:15'},
//                    {id:'12',name:'Shivam Singhal',condition:'Serious Kidney Problem', time:'12:50-13:15'},
//                   ];
    const [patientData,setPatientData] = React.useState({});
    const [reportsList,setReportsList] = React.useState([]);
    const [sensitive, setSensitive] = React.useState('');
    const [refresh,setRefresh] = React.useState(false);
    
    const onRefresh = () => {
        setRefresh(true)
        getData();
        setRefresh(false)
    }

    React.useEffect(() => {
        getData()
    },[])
    
    const getData  = async() => {
        let patient = await AsyncStorage.getItem('patient');
        patient = JSON.parse(patient);
        setPatientData(patient);
        let get = {
            Patient_Id : patient['_id'],
        }
        console.log(patient['_id']);
        get = Base64.encode(JSON.stringify(get));
        fetch('http://192.168.1.11:5000/retrieve/reports/'+get)
        .then(re => re.json())
        .then(resultJson => {
            if(resultJson.status == "Success"){
                console.log(resultJson)
                setReportsList(resultJson.data);
                if(resultJson.data.length==0){
                    alert("There no medical records");
                }
            }

        })
        .catch(err=>console.log(err))
    }

    const changeSensitive = (id) => {
        let s ;
        let sen = {};
        if(sensitive){
            s = false;
            sen = {
                Sensitive: 0,
            }
        }
        else{
            s = true; 
            sen = {
                Sensitive : 1,
            }
        }
        let where = {
            _id : id,
        }
        where = Base64.encode(JSON.stringify(where));
        sen = Base64.encode(JSON.stringify(sen));
        fetch('http://192.168.1.11:5000/update/reports/'+sen+'/'+where)
        .then(res => res.json())
        .then(resultJson => {
            if(resultJson.status == "Success"){
                setSensitive(s);
                onRefresh();
            }
        })
    }

  return (
    <View>
        <FlatList
            data={reportsList}
            refreshControl = {
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={()=>{onRefresh()}}
                />
              }
            keyExtractor={(item,index) => index.toString()}
            renderItem={({item})=>
            <Card style={styles.cardStyle}>
                <TouchableOpacity>
                        < View style={{flex:5,paddingVertical:20}}>
                            <Text style={{color:'#ffffff',fontSize:15}}>Doctor Name: {item.Name}</Text>
                            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            <Text style={{color:'#ffffff',fontSize:15}}>Condition: {item.Notes}</Text>
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            <Text style={{color:colors.contrast,fontSize:15}}>Date: {item.Date}</Text>
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap',width:"100%"}}>
                                <Text style={{color:colors.contrast,fontSize:15,width:"50%"}}>Sensitive: {item.Sensitive}</Text>
                                
                                
                            </View>
                            

                           
                    </View>
                </TouchableOpacity>
                <Switch 
                                style={{backgroundColor:colors.grey,color:colors.grey,width:"12%",alignSelf:"flex-end",marginRight:30,marginTop:0}}
                                onValueChange={()=>
                                    {if(sensitive){
                                            setSensitive(false);
                                        }                                    
                                        else{
                                            setSensitive(true)
                                        }
                                        changeSensitive(item['_id']);
                                    }}
                                    value={sensitive}
                                />
                
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
        paddingTop:2,
        backgroundColor:colors.themeDark,
        margin:3,
        paddingLeft:5,
        borderColor:'#000000',
        borderWidth:3,
        borderRadius:10
    }
})
