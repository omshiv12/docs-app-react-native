import React from 'react';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Base64} from '../../Base64';
import { AuthContext } from '../../auth/AuthContext';
import { colors } from '../../extra/colors';



export default class SignUpDoctor extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name:'',
      mobile:'',
      conPass:'',
      pass: '',
      address:'',
      // department:'',
      // workingExp:'',
      loader:false,
    }
    this.signUp = this.signUp.bind(this);
  }



  abortController = new AbortController;

  signUp = async () => {
    
    if(this.state.pass != this.state.conPass){
      alert("Entered Passwords do not match");
    }
    else{
      this.setState({loader:true});
    const pass = this.state.pass;
    let sign = {
      Name: this.state.name,
      Age:this.state.age,
      Mobile:this.state.mobile,
      Password:pass,
      Address:this.state.address,
      // Department:this.state.department,
      // Working_Experience:this.state.workingExp,
    }
    let signUp = Base64.encode(JSON.stringify(sign));
    console.log('http://192.168.43.121:5000/insert/doctors/'+signUp);
    fetch('http://192.168.43.121:5000/insert/doctors/'+signUp,{signal:this.abortController.signal})
    .then(result => result.json())
    .then((resultJson) => {
      if(resultJson.status=="Success"){
        alert("Sign Up Successful");
        this.setState({loader:false});

        this.props.navigation.navigate('Login')
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
    <ScrollView style={styles.cantainer}>
      <KeyboardAvoidingView>
        <Text style={styles.headerTxt}>Doctor</Text>

      </KeyboardAvoidingView>
        <View style={styles.subView}>
          <Text style={styles.subTxt}>Signup</Text>
          
          <TextInput style={styles.nameInput} placeholder="Name" onChangeText={(name => { this.setState({ name }) })} />
          <TextInput style={styles.nameInput} placeholder="Age" onChangeText={(age => { this.setState({ age }) })} />
          <TextInput style={styles.nameInput} placeholder="Mobile"  onChangeText={(mobile => { this.setState({ mobile }) })} />
          <TextInput style={styles.nameInput} secureTextEntry placeholder="Password"  onChangeText={(pass => { this.setState({ pass }) })} />
          <TextInput style={styles.nameInput} secureTextEntry placeholder="Confirm Password" onChangeText={(conPass => { this.setState({ conPass }) })} />
          <TextInput style={styles.nameInput} placeholder="Address"  />
          <TouchableOpacity onPress={this.signUp}>
            <View style={styles.btn}>
              <Text style={{width:"100%",textAlign:"center",fontSize:20,color:"white",marginTop:8,fontWeight:'bold'}}>Sign Up</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Login')}}>          
            <View style={styles.endView}>
              <Text style={styles.endTxt}>Already have an account?</Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
      
    );
  }
}


const styles = StyleSheet.create({
  cantainer: {
    backgroundColor: colors.themeColor,
    height: hp('100%'),
  },
  subView: {
    backgroundColor: 'white',
    marginTop:hp('5%'),
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  headerTxt: {
    fontSize: 40,
    width:"100%",
    fontWeight: 'bold',
    textAlign:"center",
    color: 'white',
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
        paddingLeft:20,
        borderRadius:20,
        marginHorizontal:"3%",
        marginTop:"8%"
  },
  btn: {
    marginTop:"10%",
      backgroundColor:colors.themeDark,
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
    marginBottom:10,
    width:"100%"
  },
  endBtn: {
    marginRight: 80,
  },
  
});

// PJ - Sign Up Successful - Connection to the insert API Successful