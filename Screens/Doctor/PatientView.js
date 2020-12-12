import React, { useState } from 'react'
import { StyleSheet, TextInput,Text, View,Image } from 'react-native'
import { Button, Card} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker'; 
import { colors } from '../../extra/colors';
import { Base64 } from '../../Base64';
import AsyncStorage from '@react-native-community/async-storage';
export default function PatientView(props) {
    let patientData = props.route.params.patient;
    console.log(patientData);
    let [iconColor,setIconColor] = useState('white');
    
    function favClicked()
    {
        if(iconColor=='white')
        {
            setIconColor(colors.contrast);
            setFavorite(true);
        }
        else
        {
            setIconColor('white');
            setFavorite(false);

        }
    }
    // Start

    const [image,setImage] = React.useState('');
    const [text,setText] = React.useState('Text is being fetched from the image. Please wait..');
    const [path,setPath] = React.useState('');
    const [doctorData, setDoctorData] = React.useState({});
    const [notes,setNotes] = React.useState();
    const [fav,setFav] = React.useState('');

    

    React.useEffect(()=>{
        getDoctorData();
    },[]);
    


    const setFavorite = (value) => {
        let f = 0;
            if(value == true){
                f = 1;
            }
            else{
                f = 0;
            }
            let fav = {
                Favorite : f,
            }
            let where = {
                Doctor_Id: doctorData['_id'],
                Patient_Id : patientData['Patient_Id'],
            }
            where = Base64.encode(JSON.stringify(where));
            fav = Base64.encode(JSON.stringify(fav));
            fetch('http://192.168.1.11:5000/update/favorites/'+fav+'/'+where)
            .then(res => res.json())
            .then((resultJson) => {
                if(resultJson.status == "Success"){
                    console.log("Added / Removed to/from favorites");
                }
            })
            .catch(err => console.log(err))
    }

    const getDoctorData = async() => {
        let doctor = await AsyncStorage.getItem('doctor');
        doctor = JSON.parse(doctor);
        setDoctorData(doctor);
        let data = {
            Doctor_Id : patientData['Doctor_Id'],
            Patient_Id : patientData['Patient_Id'],
        }
        fetch('http://192.168.1.11:5000/retrieve/favorites/'+data)
        .then(res => res.json())
        .then((resultJson) => {
            if(resultJson.status == "Success"){
                let obj = {};
                resultJson.data.forEach(ele => obj = ele);
                setFav(obj.Favorite);
                if(fav == 1){
                    setIconColor(colors.contrast);
                }
            }
        })
        .catch(err => console.log(err))
    }

    const saveData = () => {
        if(!notes){
            alert("Please enter atleast treatment details to continue.");
        }
        else{
            let d = new Date();
            let dateParsed = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();
            let data = {
                Patient_Id : patientData['Patient_Id'],
                Doctor_Id : doctorData['_id'],
                Doctor_Name : doctorData['Name'],
                Name: patientData.Name,
                Age:patientData.Age,
                Image_Path : path,
                Image_Text : text,
                Notes: notes,
                Sensitive: 0,
                Date : dateParsed
            }
            data = Base64.encode(JSON.stringify(data));
            fetch('http://192.168.1.11:5000/insert/reports/'+data)
            .then(res => res.json())
            .then(resultJson => {
                if(resultJson.status=="Success"){
                    alert("Data Saved Successfully");
                }
            })
            .catch(err=>console.log(err));
        }
    }

    const _pickImage = async (val) => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 0.7,
          });
          
          if (!result.cancelled) {
            setImage(result);
            if(result)
                uploadPhoto();
          }
    
        } catch (E) {
          console.log(E);
        }
    };

    const uploadPhoto = () => {
        const xhr = new XMLHttpRequest();
        // 2. open request
        xhr.open('POST', "http://192.168.1.11:5000/ocr")
        // 3. set up callback for request
        xhr.onload = () => {
            const response = JSON.parse(xhr.response);
            if(response.status == "Done"){
                setText(response.OcrText);
                setPath(response.Path);
            }


            // ... do something with the successful response
        };
        // 4. catch for request error
        xhr.onerror = e => {
            console.log(e, 'upload failed');
        };  
        // 4. catch for request timeout
        xhr.ontimeout = e => {
            console.log(e, 'upload timeout');
        };
        // 4. create formData to upload
        
        const formData = new FormData();
        if(image!=''){    
            let localUri1 = image.uri;
            let filename1 = localUri1.split('/').pop();
          
            // Infer the type of the image
            let match1 = /\.(\w+)$/.exec(filename1);
            let type1 = match1 ? `image/${match1[1]}` : `image`;

            formData.append('image', {
                uri: image.uri, 					// this is the path to your file. see Expo ImagePicker or React Native ImagePicker
                type: `${type1}`,  // example: image/jpg
                name: `${filename1}`    // example: upload.jpg
            });
        }
        xhr.send(formData);
        // 7. track upload progress
        if (xhr.upload) {
            // track the upload progress
            xhr.upload.onprogress = ({ total, loaded }) => {
                const uploadProgress = (loaded / total);
                console.log(uploadProgress);
            };
        }
    }

    const addImage = async() => {
        await _pickImage();
    }
    return (
        <ScrollView >
            <View style={{flex:1,backgroundColor:"white",height:"100%"}}>
                <View style={{flex:5}}>
                    <Card style={{marginHorizontal:"2%",marginTop:"2%",borderRadius:10,backgroundColor:colors.themeColor}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{padding:"5%",paddingLeft:"5%",flex:7,flexWrap:'wrap'}}>
                                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                                    <MaterialCommunityIcons name="information" size={26} color="white" style={{marginRight:10}} />
                                    <Text style={{fontSize:20,color:"white"}}>Basic Information</Text>
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text style={{color:"white"}}>Name: </Text>
                                    <Text style={{color:"white"}}>{patientData.Name}</Text>
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text style={{color:"white"}}>Age: </Text>
                                    <Text style={{color:"white"}}>{patientData.Age}</Text>
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text style={{color:"white"}}>Blood Group: </Text>
                                    <Text style={{color:"white"}}>{patientData.Blood_Group}</Text>
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text style={{color:"white"}}>Address: </Text>
                                    <Text style={{color:"white"}}>{patientData.Address}</Text>
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text style={{color:"white"}}>Mobile Number: </Text>
                                    <Text style={{color:"white"}}>{patientData.Mobile}</Text>
                                </View>
                            </View>
                            <View style={{flex:4,flexWrap:'wrap'}}>
                            {patientData.Gender=="Male" ? <Image source={require('../../assets/boyAvatar.jpeg')} style={{height:"50%",width:"80%",resizeMode:'contain'}}/>:
                                    <Image source={require('../../assets/girlAvatar.jpg')} style={{height:"50%",width:"80%",borderRadius:20,resizeMode:'contain'}}/>}
                                    <MaterialIcons name="favorite" size={40} color={iconColor} style={{alignSelf:'flex-end',position:"absolute",bottom:0,margin:10,marginRight:10,right:10}} onPress={favClicked}/>
                            </View>
                        </View>
                    </Card>
                </View>
                <View style={{flex:7}}>
                    <View style={{borderWidth:1,borderColor:'black',margin:"2%",borderRadius:10,padding:15,flex:5}}>
                        <TextInput multiline={true} onChangeText={(notes)=>{setNotes(notes)}} placeholder='Prescription / Treatment Details' style={{height:300,textAlignVertical:"top"}}/>
                    </View>
                    {/* <View style={{ flexDirection:'row',flex:5}}>
                    <MaterialCommunityIcons name="camera" size={30} color="#999999" />
                    <MaterialCommunityIcons name="text-to-speech" size={26} color="#999999" />
                    </View>    */}
                        <Button icon="camera" mode="text" style={{width:"95%",alignSelf:"center",borderRadius:20}} color={colors.themeColor} onPress={addImage}>
                            Add Report
                        </Button>
                    {image ? (
                    <View>
                        <Image source={{ uri: image.uri}} style={{height:100,width:100,alignSelf:"center"}}/>
                        <Text style={{alignSelf:"center"}}>RETRIEVED TEXT FROM IMAGE: {"\n\n"}{text}</Text> 
                    </View>
                    ) : null}    
                </View>  
                         
            </View>
            <Button mode="contained" color={colors.themeDark} style={{width:'100%',marginTop:5,marginBottom:0,padding:'2%',borderRadius:10,alignSelf:'center'}}
            onPress={()=>{saveData()}}>
                    Save
                </Button>  
        </ScrollView>
    )
}



const styles = StyleSheet.create({})
