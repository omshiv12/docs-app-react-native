import React from 'react';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StyleSheet, Text, View,AppRegistry,Dimensions,FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
const dataList=[{key:'Gynaecology'},{key:'Coronavirus related'},{key:'Dermatology'},{key:'Sexalogy'},{key:'Psychiatry'},{key:'Stomach and Digestion'},{key:'Pediatrics'},{key:'Kidney and urine'},{key:'Orthopedic'},{key:'Neurology'}
                                    ,{key:'Cardiology'},{key:'counselling'},{key:' General  Surgery'},{key:'Physiotherpy'},{key:'Breathing and Chest'},{key:'Dental'},{key:'Eye and Vision'},{key:'Diabetes '},{key:'Diet and Nutrition'},{key:'Some Other Problem'}]
                    
const numColumns=2

export default class list extends React.Component{


    renderItems=({item,index}) => {
        
        return(
            <View style={styles.itemStyle}>
            <Text style={styles.itemText}>{item.key}</Text>
            
            </View>
        )
    }
    render(){
        return(
            <View style={styles.container}>
            <Text style={styles.tim}>Search Health Problem/ Symptoms</Text>
            <TextInput style={styles.nameInput} placeholder="Eg.  Cold, cough, Fever " onChangeText={(name => { this.setState({ name }) })} />
            <Text style={styles.tim}>Know Speciality?</Text>
            <Text>Select from top specialities</Text>
            <FlatList 
            data={dataList}
            renderItem={this.renderItems}
            keyExtractor={(key,index)=>index.toString()}
            numColumns={numColumns}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container :{
        flex: 1,
        paddingTop:40,
        
    },
itemStyle:{
    backgroundColor:'#33D6',
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
},
kim:{
    fontSize:4,
    borderRadius:4,
}

})