import React, { useState } from 'react'
import { StyleSheet, TextInput,Text, View,Image } from 'react-native'
import { Card} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker'; 
export default function PatientView(props) {
    let infoFetched=props.route.params;
    let [iconColor,setIconColor]=useState('black');
    function favClicked()
    {
        if(iconColor=='black')
        {
            setIconColor('red');
        }
        else
        {
            setIconColor('black');
        }
        console.log(iconColor);
    }
    // Start

    const [image,setImage] = React.useState('');
    const [data,setText] = React.useState('');

    const _pickImage = async (val) => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 0.7,
          });
          
          if (!result.cancelled) {
            setImage(result);
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
    //end
    return (
        <ScrollView>
            <View style={{flex:1}}>
                <View style={{flex:4}}>
                    <Card style={{marginHorizontal:"2%",marginTop:"2%",borderRadius:50}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{padding:"5%",paddingLeft:"5%",flex:7,flexWrap:'wrap'}}>
                                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                                    <MaterialCommunityIcons name="information" size={26} color="black" />
                                    <Text style={{fontSize:20}}>Basic Information</Text>
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text>Name: </Text>
                                    <Text>{infoFetched.name}</Text>
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text>Age: </Text>
                                    <Text>{infoFetched.age}</Text>
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text>Blood Group: </Text>
                                    <Text>{infoFetched.blood}</Text>
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text>Address: </Text>
                                    <Text>{infoFetched.address}</Text>
                                </View>
                                <View style={{marginLeft:25,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text>Mobile Number: </Text>
                                    <Text>{infoFetched.mobile}</Text>
                                </View>
                            </View>
                            <View style={{flex:4,flexWrap:'wrap'}}>
                            {infoFetched.gender=="Male"?<Image source={require('../../assets/boyAvatar.jpeg')} style={{height:"50%",width:"80%",borderRadius:50,resizeMode:'contain'}}/>:
                                    <Image source={require('../../assets/girlAvatar.jpg')} style={{height:"50%",width:"80%",borderRadius:50,resizeMode:'contain'}}/>}
                                    <MaterialIcons name="favorite" size={40} color={iconColor} style={{alignSelf:'center'}} onPress={favClicked}/>
                            </View>
                        </View>
                    </Card>
                </View>
                <View style={{flex:7}}>
                    <View style={{borderWidth:1,borderColor:'black',margin:"2%",borderRadius:50,padding:15,flex:5}}>
                        <TextInput multiline={true} placeholder='Enter Report Here......' style={{height:300}}/>
                    </View>
                    {/* <View style={{ flexDirection:'row',flex:5}}>
                    <MaterialCommunityIcons name="camera" size={30} color="#999999" />
                    <MaterialCommunityIcons name="text-to-speech" size={26} color="#999999" />
                    </View>    */}
                    <View style={{flexDirection:'row',alignSelf:'center'}}>
                    <MaterialIcons name="camera-enhance" size={40} color="#145263" onPress ={addImage}/>
                    <Image source={{ uri: image.uri}} style={{height:50,width:50,alignSelf:"center"}}/>
                    </View>
                    <Text style={{alignSelf:"center"}}>{data}</Text> 
                    <TouchableOpacity>
                        <View style={{backgroundColor:'#145263',width:'80%',padding:'2%',borderRadius:50,alignSelf:'center',alignItems:'center'}}>
                            <Text style={{fontSize:20,color:"white"}}>Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>          
            </View>
        </ScrollView>
    )
}



const styles = StyleSheet.create({})
