import React from 'react';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Base64 from '../../Base64';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AuthContext } from '../../auth/AuthContext';


export default class SignUpPatient extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name:'',
      age:'',
      mobile:'',
      conPass:'',
      pass: '',
      address:'',
      loader:false,
    }
    this.signUp = this.signUp.bind(this);
  }

  abortController = new AbortController;

  signUp = () => {
    
    if(this.state.pass != this.state.conPass){
      alert("Entered Passwords do not match");
    }
    else{
      console.log("AAya");
      this.setState({loader:true});
      const sign = {
        Name: this.state.name,
        Age: this.state.age,
        Mobile: this.state.mobile,
        Email: this.state.email,
        Password: this.state.pass,
        Address: this.state.address,
      }
      let signIn = Base64.encode(JSON.stringify(sign));
      fetch('http://192.168.43.250:5000/insert/patients/'+signIn,{signal:this.abortController.signal})
      .then(result => result.json())
      .then((resultJson) =>{
        if(resultJson.type=="Success"){
          alert("Sign Up Successful");
          this.setState({loader:false});
        }
        else{
          alert("Oops! There was a problem signing up");
          this.setState({loader:false});

        }
      })
      .catch(err => {
        console.log(err);
        this.setState({loader:false});
      })
      }
  }
  
  render() {
    return (
      <View style={styles.cantainer}>
      
        <Text style={styles.headerTxt}>Patient</Text>
        <ScrollView style={styles.subView}>
          <Text style={styles.subTxt}>Signup</Text>
          
          <TextInput style={styles.nameInput} placeholder="Name" onChangeText={(name => { this.setState({ name }) })} />
          <TextInput style={styles.nameInput} placeholder="Age" onChangeText={(age => { this.setState({ age }) })} />
          <TextInput style={styles.nameInput} placeholder="Mobile"  onChangeText={(mobile => { this.setState({ mobile }) })} />
          <TextInput style={styles.nameInput} secureTextEntry placeholder="Password"  onChangeText={(pass => { this.setState({ pass }) })} />
          <TextInput style={styles.nameInput} secureTextEntry placeholder="Confirm Password" onChangeText={(conPass => { this.setState({ conPass }) })} />
          <TextInput style={styles.nameInput} placeholder="Address"  />
          <TouchableWithoutFeedback onPress={()=>{this.signUp()}}>
            <View style={styles.btn}>
              <Text style={{width:"100%",textAlign:"center",fontSize:20,color:"#555",marginTop:8,fontWeight:'bold'}}>Sign Up</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Login')}}>          
            <View style={styles.endView}>
              <Text style={styles.endTxt}>Already have an account?</Text>
            </View>
          </TouchableOpacity>

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
    marginTop:hp('5%'),
    marginBottom:hp('5%'),
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  headerTxt: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    width:"100%",
    textAlign:"center",
    marginTop: hp('5%'),
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


// PJ - Sign Up Successful - Connection to the insert API Successful