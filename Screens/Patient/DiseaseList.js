import React from 'react';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StyleSheet, Text, View,AppRegistry,Dimensions,FlatList } from 'react-native';
import { Button, TextInput,Card, Searchbar, Title, Caption } from 'react-native-paper';
import { colors } from '../../extra/colors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const dataList=[{key:'Gynaecology'},{key:'Coronavirus related'},{key:'Dermatology'},{key:'Sexalogy'},{key:'Psychiatry'},{key:'Stomach and Digestion'},{key:'Pediatrics'},{key:'Kidney and urine'},{key:'Orthopedic'},{key:'Neurology'}
                                    ,{key:'Cardiology'},{key:'counselling'},{key:' General  Surgery'},{key:'Physiotherpy'},{key:'Breathing and Chest'},{key:'Dental'},{key:'Eye and Vision'},{key:'Diabetes '},{key:'Diet and Nutrition'},{key:'Some Other Problem'}]
                    
const numColumns=2

export default class DiseaseList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            list: dataList,
            updatedList : dataList,
            search:'',

        }
    }

    searchDisease = (text) => {
        //passing the inserted text in textinput
        const newData = this.state.list.filter(function(item) {
          //applying filter for the inserted text in search bar
          const disease = item.key ? item.key.toUpperCase() : ''.toUpperCase();
        //   const brandName = item.Brand_Name ? item.Brand_Name.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return(
            disease.indexOf(textData) > -1 
          )
        });
        this.setState({
          //setting the filtered newData on datasource
          //After setting the data it will automatically re-render the view
          updatedList: newData,
          search: text,
        });
      }


    renderItems=({item,index}) => {
        
        return(
            <View style={styles.itemStyle}>
                <TouchableWithoutFeedback style={{width:"100%",height:"100%",alignItems:"center",justifyContent:"center"}} onPress={()=>{this.props.navigation.navigate('DoctorsList',{category:item.key})}}>
                    
                        <Text style={styles.itemText} >{item.key } </Text>
                    
                </TouchableWithoutFeedback>
            </View>
            
        )
    }
    
    render(){
        return(
            <View style={styles.container}>
                <Title style={[styles.tim,{marginTop:0}]}>Search Health Problems</Title>
                <Searchbar style={styles.nameInput} placeholder="Eg. General Physician, Coronavirus Related " 
                onChangeText={text => this.searchDisease(text)}
                onClear={text => this.searchDisease('')} />
                {/* <Caption style={[styles.tim,{marginTop:20}]}>Know Speciality?</Caption> */}
                <Caption style={{fontSize:15,marginLeft:20,marginTop:10}}>Select from top specialities</Caption>
                <FlatList 
                    data={this.state.updatedList}
                    renderItem={this.renderItems}
                    keyExtractor={(key,index)=>index.toString()}
                    numColumns={numColumns}
                />
                
            
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container :{
        flex: 1,
        paddingTop:10,
        
    },
itemStyle:{
    backgroundColor:colors.themeDark,
     // backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    height:hp('10%'),
    margin:1,
    flex:1,
    fontSize:2,
    borderRadius:5,
    //height:WIDTH/numColumns
},
itemText:{
    fontSize:5,
    color:'#fff',
    fontSize:15,
    
},
nameInput: {
   // flexDirection:'row',
    borderWidth:0.5,
    padding:1,
    borderRadius:5,
    marginHorizontal:"2%",
    marginTop:"4%",
},
tim:{
    fontSize:18,
    alignSelf:"center"
},
kim:{
    fontSize:4,
    borderRadius:4,
}

})