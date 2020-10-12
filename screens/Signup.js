import React, { Component } from 'react';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';


export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pass: ''
    }
  }
  
  render() {
    return (
      <View style={styles.cantainer}>
      
        <Text style={styles.headerTxt}>WELCOME</Text>
        <ScrollView style={styles.subView}>
          <Text style={styles.subTxt}>Signup</Text>
          
          <TextInput style={styles.nameInput} placeholder="Name" onChangeText={(name => { this.setState({ name }) })} />
          <TextInput style={styles.nameInput} placeholder="Age" onChangeText={(age => { this.setState({ age }) })} />
          
          <TextInput style={styles.nameInput} placeholder="Email"  onChangeText={(email => { this.setState({ email }) })} />
          <TextInput style={styles.nameInput} placeholder="Username" onChangeText={(username => { this.setState({ username }) })} />
          <TextInput style={styles.nameInput} placeholder="Password"  onChangeText={(pass => { this.setState({ pass }) })} />
          <TextInput style={styles.nameInput} placeholder="Confirm Password" onChangeText={(pass => { this.setState({ pass }) })} />
          <TextInput style={styles.nameInput} placeholder="Address"  />
          <TextInput style={styles.nameInput} placeholder="Phone"  />
          <TouchableOpacity>
            <View style={styles.btn}>
              <Text style={{alignSelf:'center',fontSize:20,color:"#555",marginTop:8,fontWeight:'bold'}}>Sign Up</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.endView}>
            <Text style={styles.endTxt}>Already have an account?</Text>
            
          </View>
        </ScrollView>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  cantainer: {
    backgroundColor: '#59f',
    height: hp('100%'),
  },
  subView: {
    backgroundColor: 'white',
    marginTop:hp('20%'),
    marginBottom:hp('5%'),
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  headerTxt: {
    fontSize: 40,
    marginLeft: 40,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    marginTop: hp('10%'),
  },
  subTxt: {
    color: 'black',
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 40,
  },
  nameInput: {
        flexDirection:'row',
        borderWidth:0.5,
        padding:10,
        borderRadius:20,
        marginHorizontal:"3%",
        marginTop:"8%"
  },
  btn: {
    marginTop:"10%",
      backgroundColor:"#58f",
      marginHorizontal:"4%",
      borderRadius:50,
      width:"90%",
      height:45,
  },
  btnTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  endView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  endTxt: {
    fontSize: 15,
    marginTop: 20,
    marginLeft: 40,
    fontWeight: 'bold',
  },
  endBtn: {
    marginRight: 80,
  },
  
});
