import React, { useState } from 'react';
import { StyleSheet,View,Text, Image,ActivityIndicator} from 'react-native';
import {uploadImage } from '../firebase/Firebase';
import ImagePicker from 'react-native-image-crop-picker';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { getsketch } from '../firebase/Runapi';
// import ImgToBase64 from 'react-native-image-base64';


const try1 = ({navigation}) => {
  const [ImageUrl, setImageUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState("https://firebasestorage.googleapis.com/v0/b/picameme-3c3a9.appspot.com/o/appassets%2FWhatsApp%20Image%202020-07-12%20at%2011.05.00%20PM.jpeg?alt=media&token=8db83fd4-cc31-4d6d-be5e-d419401af177");
  const [load,setload]=useState(false);

  checkPermission = async (imageur) => {
    
    //Function to check the platform
    //If iOS the start downloading
    //If Android then ask for runtime permission
  {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
         
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage(imageur);
        } else {
          //If permission denied then show alert 'Storage Permission Not Granted'
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        //To handle permission related issue
        console.warn(err);
      }
    }
  };
  
  
  
  
  const downloadImage = (imageur) => {
    setload(true);
    console.log(imageur)
    var date = new Date();
    var image_URL = imageur;
    var ext = ".png";
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: PictureDir + "/image_" + Math.floor(date.getTime()
          + date.getSeconds() / 2) + ext,
        description: 'Image'
      }
    }
    shareFile=(file_url)=> {
      let imagePath = null;
      setload(true);
      RNFetchBlob.config({
          fileCache: true
      })
      .fetch("GET", file_url)
      // the image is now dowloaded to device's storage
      .then(resp => {
          // the image path you can use it directly with Image component
          imagePath = resp.path();
          return resp.readFile("base64");
      })
      .then(async base64Data => {
          var base64Data = `data:image/png;base64,` + base64Data;
          // here's base64 encoded image
         try{ await Share.open({ url: base64Data });
          // remove the file from storage
          setload(false);
          return fs.unlink(imagePath);}catch(err){   setload(false); alert("You can share this to love ones")}
      });
  }
    
    config(options).fetch('GET', image_URL).then((resp) => {
      setload(false);
      alert("Your Image Is Downloaded")
    });
  }
  
  pickImageHandler = (uploadImage,setload) => {
    ImagePicker.openPicker({compressImageQuality:0.5,cropping: true })
      .then(response => {
        if (response.error) {
          alert('Please choose image from gallery')
        } else {
          if (response.path == null) {
            alert("Please select the image")
          } else {
            console.log("Image: " + response.path)
            setSelectedImage(response.path);
            const selectimage1 = (response.path)
            // ImgToBase64.getBase64String(`${selectimage1}`)
            // .then(base64String => {console.log(base64String); setImageUrl(base64String)})
            // .catch(err => doSomethingWith(err));
try{uploadImage(selectimage1,setImageUrl,setload);}
catch(err){alert('No Internet')};

          }
        }
      }
      ).catch((err) => { alert("you can select new image") })
  }

  clickImageHandler = () => {
    ImagePicker.openCamera({compressImageQuality:0.8,compressImageMaxWidth:800,compressImageMaxHeight:800, cropping: true })
      .then(response => {
        if (response.error) {
          alert('Please choose image from gallery')
        } else {
          if (response.path == null) {
            alert("Please select the image")
          } else {
            console.log("Image: " + response.path)
            setSelectedImage(response.path);
            const selectimage1 = (response.path)
            // ImgToBase64.getBase64String(`${selectimage1}`)
            // .then(base64String => {console.log(base64String); setImageUrl(base64String)})
            // .catch(err => doSomethingWith(err));
            try{uploadImage(selectimage1,setImageUrl,setload);}
            catch(err){alert('No Internet')};
          }
        }
      }
      ).catch((err) => { alert("you can select new image") })
  }
  // Local path to file on the device





  return (<View style= {{flex:1 , backgroundColor:"black"}}>
  {load ? <View style={{alignContent:"center",height:"100%", width:"100%",marginTop:"90%"}}>
<Text style={{textAlign:"center",fontSize:20,color:"white",marginLeft:15}}>loading...</Text> 
<ActivityIndicator  size="large" color="#00FFFF"/>
  </View>:
    <View style={{ textAlign: "center", flex: 1 }}>

<View style={{  height:"80%", width:"100%" ,flex:1,backgroundColor:"black" }}>
        <TouchableOpacity onPress={() => {pickImageHandler(uploadImage,setload) }} >
        <Image source={{ uri: `${selectedImage}` }} style={{ height:"100%", resizeMode:'contain',width:"100%" }} />
        </TouchableOpacity></View>

        <View style={{ position: "absolute", bottom:100, right:0 }}>
        <TouchableOpacity onPress={() => { clickImageHandler() }} >
          <Image style={{ height: 70, width: 70 }}
            source={require("../images/camera.png")} />
        </TouchableOpacity></View>

  
  </View>   
  }
  </View>
  );
};

const styles = StyleSheet.create({

});

export default try1;
