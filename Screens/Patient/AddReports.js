import React from 'react';
import {View,Button, Image, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; 

export default function AddReports(){

    const [image,setImage] = React.useState('');
    const [data,setText] = React.useState('');

    _pickImage = async (val) => {
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

    uploadPhoto = () => {
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

    addImage = async() => {
        await _pickImage();
    }

    return(
        <View style={{flex:1,alignContent:"center",justifyContent:"center",alignItems:"center",width:"100%"}}>
            <Button onPress ={addImage} title="Add Reports">
                {/* Add Reports */}
            </Button>
            <Image source={{ uri: image.uri}} style={{height:100,width:100,alignSelf:"center"}}/>
            <Text style={{alignSelf:"center"}}>{data}</Text> 
        </View>
    );
}