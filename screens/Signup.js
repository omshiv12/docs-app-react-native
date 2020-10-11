import React, { Component } from 'react';
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
      <ScrollView>
        <Text style={styles.headerTxt}>WELCOME</Text>
        <View style={styles.subView}>
          <Text style={styles.subTxt}>Signup</Text>
          <TextInput style={styles.nameInput} placeholder="Username"  />
          <TextInput style={styles.nameInput} placeholder="Name"  />
          <TextInput style={styles.nameInput} placeholder="Age"  />
          
          <TextInput style={styles.nameInput} placeholder="Email"  onChangeText={(email => { this.setState({ email }) })} />
          <TextInput style={styles.nameInput} placeholder="Password"  onChangeText={(pass => { this.setState({ pass }) })} />
          <TextInput style={styles.nameInput} placeholder="Confirm Password" onChangeText={(pass => { this.setState({ pass }) })} />
          <TextInput style={styles.nameInput} placeholder="Address"  />
          <TextInput style={styles.nameInput} placeholder="Phone"  />
          <TouchableOpacity style={styles.btn} onPress={this.signUp}>
            <Text style={styles.btnTxt}>SignUp</Text>
          </TouchableOpacity>
          <View style={styles.endView}>
            <Text style={styles.endTxt}>Already have an account?</Text>
            
          </View>
        </View>
        </ScrollView>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  cantainer: {
    backgroundColor: '#521be3',
    height: 700,
  },
  subView: {
    backgroundColor: 'white',
    height: 430,
    marginTop: 240,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  headerTxt: {
    fontSize: 40,
    marginLeft: 40,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    marginTop: 140,
  },
  subTxt: {
    color: 'black',
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 40,
  },
  nameInput: {
    height: 40,
    width: 270,
    marginLeft: 40,
    borderBottomWidth: 1,
    marginTop: 30,
  },
  btn: {
    height: 50,
    width: 200,
    backgroundColor: 'blue',
    borderRadius: 80,
    borderWidth: 2,
    marginLeft: 70,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
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