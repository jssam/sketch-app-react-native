import React, { useState} from "react";
import{Text,StyleSheet,View, Image, ActivityIndicator,PermissionsAndroid,} from "react-native";
import Share from "react-native-share";
import RNFetchBlob from 'rn-fetch-blob';
import { TouchableOpacity } from "react-native-gesture-handler";


const sketch =  ({route,navigation})=>{

  const [load,setload]=useState(false);

const sketchurl = route.params;
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
 config(options).fetch('GET', image_URL).then((resp) => {
    setload(false);
    alert("Your Image Is Downloaded")
  });
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
      var base64Data1 = `data:image/jpg;base64,` + base64Data;
      console.log(base64Data1);
      // here's base64 encoded image
     try{ await Share.open({url: base64Data1});
      // remove the file from storage
      setload(false);
      return  RNFetchBlob.fs.unlink(imagePath);}catch(err){   setload(false); alert("You can share this to love ones")}
  });
}

    console.log("sketchurl "+sketchurl);
    return(<View style= {{flex:1 , backgroundColor:"black"}}>
    {load ?  <View style={{alignContent:"center",height:"100%", width:"100%",marginTop:"90%"}}>
<Text style={{textAlign:"center",fontSize:20,color:"white",marginLeft:15}}>loading...</Text> 
<ActivityIndicator  size="large" color="#00FFFF"/>
  </View> : 
      <View style={{ flex: 1, backgroundColor: "#2D2D2D", flexDirection: "row" }}>
            <View style={styles.imageContainer}>
            <Image source={{uri: `${sketchurl.sketchi}`}} style={styles.previewImage} />
        {/* <Image source={{uri: `data:image/gif;base64,${sketchurl.sketchi}`}} style={styles.previewImage} />  */}
        <View style={{ position: "absolute", bottom:100, right:4 }}>
      <TouchableOpacity onPress={()=>this.checkPermission(`${sketchurl.sketchi}`)} >
      <Image style={{ height: 60, width: 60 }}
              source={require("../images/Download.png")} />
      </TouchableOpacity>

    </View>
    <View style={{ position: "absolute", bottom:30, right:4 }}>
    <TouchableOpacity onPress={()=>this.shareFile(`${sketchurl.sketchi}`)} >
      <Image style={{ height: 60, width: 60 }}
              source={require("../images/share.png")} />
      </TouchableOpacity>
  
    </View>

      </View>
    </View>}
    </View>

    );
};


const styles = StyleSheet.create({
    imageContainer: {
      overflow: 'hidden',
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '100%',
        height: "100%",
        alignItems: 'center',
        flexDirection:"column"
      },  previewImage: {
        flex:1,
        resizeMode:'contain',
        width: "100%",
        height: "100%",
        backgroundColor:"black"
      },
});
export default sketch;