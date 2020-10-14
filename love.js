import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput,Appbar,Button } from 'react-native-paper';
import Display from './components/Display';

class App extends React.Component {

   state={

	fname:'',
	sname:'',
	result:"loading"
   }    
	     submitit(){
		fetch('https://love-calculator.p.rapidapi.com/getPercentage?fname=${this.state.fname}&sname=${this.state.sname}',{
		headers:{
		"x-rapidapi-host": "love-calculator.p.rapidapi.com",
		 "x-rapidapi-key": "f9c452f7aamsh83a8ead0e1c7dfdp1fc6cfjsnf09b43e95e6d"
		
}
})		.then(data=>data.json())
		.then(data2=>{
			console.log(data2);
			this.setState({
			result:data2
})
	})
}

    render() {
        return (

            
            <View style = { styles.container } >
	   <Appbar.Header>
	   <Appbar.Content title="Love % Calculator"  style={{alignItems:"center"}}/>
 	   </Appbar.Header>
            
            <TextInput label = 'person1(male)' value={this.state.fname} onChangeText = { text => this.setState({fname: text }) } />
	    <TextInput label = 'person2(female)' value={this.state.sname} onChangeText = { text => this.setState({ sname:text }) } />
            <Button  mode="contained"  style={{marginTop:10}} onPress={this.submitit.bind(this)}>
		Calculate
	   </Button>

            
           <Display  data={this.state.result}/>  
             
            </View >
        );
    }
}
export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
    },
})