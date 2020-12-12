import * as React from 'react';
import {View,Text,StatusBar} from 'react-native';
import {MaterialCommunityIcons,AntDesign} from '@expo/vector-icons';
//import CalendarIcon from 'react-calendar-icon';
import {FlatList, ScrollView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {colors} from '../../extra/colors';
import { Button, Caption, Searchbar, Title } from 'react-native-paper';
import { Base64 } from '../../Base64';
import {useNavigation} from '@react-navigation/native';


const tasks=[
    {
        Name:'Dr.Ernest Lopez',
        Location:"Sector 63",
        _id:"5f9a9633348079137570f8f3",
    },

    {
        Name:'Dr.Samrat ',
        Location:"Sector 62",
        _id:"5f9a9633348079137570f8f4",
    },

    {
        Name:'Dr.Ravi Jackson',
        _id:"5f9a9633348079137570f8f5",
        Location:"Greater Noida"
    },
    
    {
        Name:'Dr.vivek Ivan',
        _id:"5f9a9633348079137570f8f6",
        Location:"Gurugram"
    },
];







export default class DoctorList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            doctors:[],
            updatedList:[],
            category:'',
            patient:'',
        }
        this.getDoctors = this.getDoctors.bind(this);
    }
    
    componentDidMount(){
        this.getDoctors();
    }

    

    getDoctors = () => {
        if(this.props.route.params){
            let cat = "";
            cat = Base64.encode(JSON.stringify(cat));
            fetch('http://192.168.1.11:5000/retrieve/doctors/'+cat)
            .then(res => res.json())
            .then((resJson) => {
                console.log(resJson)
                if(resJson!="No Data Found"){
                    this.setState({doctors:resJson.data,updatedList:resJson.data})
                }
            })
        }
    }

    searchDoctor = (text) => {
        //passing the inserted text in textinput
        const newData = this.state.doctors.filter(function(item) {
          //applying filter for the inserted text in search bar
          const doctorName = item.Name ? item.Name.toUpperCase() : ''.toUpperCase();
          const location = item.Location ? item.Location.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return(
            doctorName.indexOf(textData) > -1 || location.indexOf(textData) > -1 
          )
        });
        this.setState({
          //setting the filtered newData on datasource
          //After setting the data it will automatically re-render the view
          updatedList: newData,
          search: text,
        });
    }

    
   render(){
    return (
        <View style={{flex:1,backgroundColor:colors.white}}>
            <StatusBar barStyle="light-content" backgroundColor={colors.themeColor} />
            
            <View style={{backgroundColor:colors.white}}>
               
                <View style={{padding:2}} >
                    <Title style={{alignSelf:"center",marginTop:10}}>{"Schedule an appointment"}</Title>
                    <Searchbar 
                    style={{padding:1,marginTop:5,borderColor:"black",borderWidth:1,width:"95%",borderRadius:10,alignSelf:"center"}}
                    onChangeText={text => this.searchDoctor(text)}
                    onClear={text => this.searchDoctor('')} />
                </View>
            </View>
            {/* <Caption style={{fontSize:20,margin:10,fontWeight:"bold",marginTop:20}}>Book a Doctor</Caption> */}
            <FlatList 
                initialNumToRender={8}
                data={this.state.updatedList}
                style={{marginTop:20}}
                renderItem = {({item})=>{
                    return(
                
                    <TouchableWithoutFeedback >
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
                                    <Text style={{color:colors.grey}}>{item.Speciality}</Text>
                                    <Text style={{color:colors.grey}}>{item.Address}</Text>
                                </View>
                            </View>
                            <Button onPress={()=>{this.props.navigation.navigate('DoctorDetails',{doctor:item})}} mode="contained" color={colors.contrast}>Show</Button>
                        </View>
                    </TouchableWithoutFeedback>
                    )
                }}
                keyExtractor={item => item['_id']}
            />
        </View>
        
    );
   }
}
