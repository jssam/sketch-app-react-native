import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';
import { uploadImage } from '../firebase/Firebase';
import ImagePicker from 'react-native-image-crop-picker';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { getsketch,getselector } from '../firebase/Runapi';
// import ImgToBase64 from 'react-native-image-base64';
import LinearGradient from 'react-native-linear-gradient';


const home = ({ navigation }) => {
  const [ImageUrl, setImageUrl] = useState("");
  const [sketchi, setsketch] = useState(true);
  const [cartooni, setcartoon] = useState(true);
  const [selectorni, setselector] = useState(false);
  const [paintingi, setpainting] = useState(true);
  const [selectedImage, setSelectedImage] = useState(require("../images/background.jpg"));
  const [load, setload] = useState(false);
  ///selector at base
  const stylesofselector=[
    { number: "12", name: "Sketch",  image: require("../images/Darksketch.jpg") },
    { number: "32", name: "Cartoon", image: require("../images/Cinematiccartoon.jpg")},
    { number: "38" , name: "Paintings",  image: require("../images/Oilpainting.jpg")},
  ];
  const stylesofimage = [
    { number: "011", name: "", subname: "", sigma: 10, image: require("../images/close.png"), url: "/close" },
    { number: "1", name: "light", subname: "sketch", sigma: 10, image: require("../images/lightsketch.jpg"), url: "/img2sketch" },
    { number: "2", name: "dark", subname: "sketch", sigma: 35, image: require("../images/Darksketch.jpg"), url: "/img2sketch" },
    { number: "4", name: "darker", subname: "sketch", sigma: 70, image: require("../images/Darkersketch.jpg"), url: "/img2sketch" },
    { number: "5", name: "darkest", subname: "sketch", sigma: 100, image: require("../images/Darkestsketch.jpg"), url: "/img2sketch" },
    { number: '12', name: "pencil", subname: "sketch", sigma: 50, image: require("../images/Pencil.jpg"), url: "/pencil_sketch_bw" },

  ];
  const stylesofcartoon=[
    { number: "011", name: "", subname: "", sigma: 10, image: require("../images/close.png"), url: "/close" },
    { number: "6", name: "light", subname: "cartoon", sigma: 50, image: require("../images/Lightcartoon.jpg"), url: "/cartoon1" },
    { number: "7", name: "cinematic", subname: "cartoon", sigma: 50, image: require("../images/Cinematiccartoon.jpg"), url: "/cartoon2" },
    { number: "8", name: "Darker", subname: "cartoon", sigma: 50, image: require("../images/Darkercartoon.jpg"), url: "/cartoon3" },
    { number: "9", name: "Childish", subname: "cartoon", sigma: 50, image: require("../images/Childishcartoon.jpg"), url: "/cartoon4" },
  ];
  const stylesofpainting=[
    { number: "011", name: "", subname: "", sigma: 10, image: require("../images/close.png"), url: "/close" },
    { number: "3", name: "color pencil", subname: "Painting", sigma: 50, image: require("../images/Colorpencil.jpg"), url: "/pencil_sketch_c" },
    { number: '10', name: "oil", subname: "Painting", sigma: 50, image: require("../images/Oilpainting.jpg"), url: "/oil-paint" },
    { number: '11', name: "water color", subname: "sketch", sigma: 50, image: require("../images/Watercolor.jpg"), url: "/watercolor_painting" },
  ];
  pickImageHandler = (uploadImage, setload) => {
    ImagePicker.openPicker({ compressImageQuality: 0.6, compressImageMaxWidth: 1000, compressImageMaxHeight: 1000, cropping: true })
      .then(response => {
        if (response.error) {
          alert('Please choose image from gallery')
        } else {
          if (response.path == null) {
            alert("Please select the image")
          } else {
            console.log("Image: " + response.path)
            setSelectedImage({ uri: `${response.path}` });
            const selectimage1 = (response.path)
            // ImgToBase64.getBase64String(`${selectimage1}`)
            // .then(base64String => {console.log(base64String); setImageUrl(base64String)})
            // .catch(err => doSomethingWith(err));
            try { uploadImage(selectimage1, setImageUrl, setload); }
            catch (err) { alert('No Internet') };

          }
        }
      }
      ).catch((err) => { alert("you can select new image") })
  }

  clickImageHandler = () => {
    ImagePicker.openCamera({ compressImageQuality: 0.6, compressImageMaxWidth: 1000, compressImageMaxHeight: 1000, cropping: true })
      .then(response => {
        if (response.error) {
          alert('Please choose image from gallery')
        } else {
          if (response.path == null) {
            alert("Please select the image")
          } else {
            console.log("Image: " + response.path)
            setSelectedImage({ uri: `${response.path}` });
            const selectimage1 = (response.path)
            // ImgToBase64.getBase64String(`${selectimage1}`)
            // .then(base64String => {console.log(base64String); setImageUrl(base64String)})
            // .catch(err => doSomethingWith(err));
            try { uploadImage(selectimage1, setImageUrl, setload); }
            catch (err) { alert('No Internet') };
          }
        }
      }
      ).catch((err) => { alert("you can select new image") })
  }
  // Local path to file on the device
 const sketch = () => {
  setcartoon(true);
  setpainting(true);
  setsketch(false);
}

const cartoon = () => {
  setsketch(true);
  setpainting(true);
  setcartoon(false);
}

const Painting = () => {
  setsketch(true);
  setcartoon(true);
  setpainting(false);
}



  return (<View style={{ flex: 1, backgroundColor: "black" }}>
    {load ? <View style={{ alignContent: "center", height: "100%", width: "100%", marginTop: "90%" }}>
      <Text style={{ textAlign: "center", fontSize: 20, color: "white", marginLeft: 15 }}>loading...</Text>
      <ActivityIndicator size="large" color="#00FFFF" />
    </View> :
      <View style={{ textAlign: "center", flex: 1}}>
        {/* ////anmsn/// */}
{/* <View style={{ width:65,height:"100%" ,backgroundColor:"#fe5858"}}>

    <View style={{width:61,height:"100%" ,backgroundColor:"#2D2D2D", borderTopRightRadius:20,borderBottomRightRadius:20}}>
    <LinearGradient colors={["black","black","purple"]} style={{
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  }}>
    <View style={{position:"absolute" ,top:20}}>
   <TouchableOpacity onPress={()=>sketch()} >
   <Image style={{height:55,width:55,borderRadius:20}}
     source={require("../images/Darksketch.jpg") } /> 
       <Text style={{color:"white",textAlign:"center",fontWeight:"bold",fontSize:12 }}>Sketch</Text>
   </TouchableOpacity></View>
   <View style={{position:"absolute" ,top:140}}>
   <TouchableOpacity onPress={()=>cartoon()}>
   <Image style={{height:55,width:55,borderRadius:20}}
     source={require("../images/Cinematiccartoon.jpg") } /> 
       <Text style={{color:"white",textAlign:"center",fontWeight:"bold",fontSize:12}}>Cartoon</Text>
   </TouchableOpacity></View>
   <View style={{position:"absolute" ,top:260}}>
   <TouchableOpacity onPress={()=>Painting()}>
   <Image style={{height:55,width:55,borderRadius:20}}
     source={require("../images/Oilpainting.jpg") } /> 
       <Text style={{color:"white",textAlign:"center",fontWeight:"bold",fontSize:12 }}>Paintings</Text>
   </TouchableOpacity></View>
   </LinearGradient>
    </View>
    </View> */}



  
<LinearGradient colors={['#63a4ff','#83eaf1']} style={{
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  }}> 
<View style={{ textAlign: "center", flex: 1 }}>

<View style={{  height:"100%", width:"100%" ,flex:1,backgroundColor:"#00ccff" }}>
        <TouchableOpacity onPress={() => {pickImageHandler(uploadImage,setload) }} >
        <Image source={selectedImage} style={{ height:"100%", resizeMode:'contain',width:"100%" }} />
        </TouchableOpacity></View>
        </View>

        <View style={{ position: "absolute", bottom: 150, right: 20 }}>
          <TouchableOpacity onPress={() => { clickImageHandler() }} >
            <Image style={{ height: 70, width: 70 }}
              source={require("../images/camera.png")} />
          </TouchableOpacity></View>
          {selectorni?<></>:

<View style={{ textAlign: "center", alignContent: "center", color: "white", height: 110,marginTop:20, width: "100%" }}>
  <FlatList
    horizontal={true}
    showsHorizontalScrollIndicator={true}
    keyExtractor={(ram) => ram.number}
    data={stylesofselector}
    renderItem={
      ({ item }) => {
        return <>
          <View>
            <TouchableOpacity onPress={() => getselector(`${item.name}`, setselector,setsketch,setcartoon,setpainting)} >
              <Image style={{ height: 60, width: 60, alignContent: "center", marginLeft: 20,borderRadius:20 }}
                source={item.image} />
              <Text style={{ textAlign: "center", alignContent: "center", color: "black", marginLeft: 10 }}>
                {item.name}
              </Text>
            </TouchableOpacity>
      
          </View>
        </>
      }
    }
      /></View>}
{sketchi?<></>:

        <View style={{ textAlign: "center", alignContent: "center", color: "white", height: 110,marginTop:20, width: "100%" }}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            keyExtractor={(ram) => ram.number}
            data={stylesofimage}
            renderItem={
              ({ item }) => {
                return <>
                  <View>
                    <TouchableOpacity onPress={() => getsketch(setload, ImageUrl, `${item.url}`, item.sigma, (sketchurl) => { navigation.navigate("Sketch", { sketchi: sketchurl })},setselector,setsketch,setcartoon,setpainting)} >
                      <Image style={{ height: 60, width: 60, alignContent: "center", marginLeft: 20,borderRadius:20 }}
                        source={item.image} />
                      <Text style={{ textAlign: "center", alignContent: "center", color: "white", marginLeft: 10 }}>
                        {item.name}
                      </Text>
                      <Text style={{ textAlign: "center", alignContent: "center", color: "white", marginLeft: 10 }}>
                        {item.subname}
                      </Text>
                    </TouchableOpacity>
              
                  </View>
                </>
              }
            }
              /></View>}
    {cartooni?<></>:

<View style={{ textAlign: "center", alignContent: "center", color: "white",height: 110,marginTop:20, width: "100%" }}>
  <FlatList
    horizontal={true}
    showsHorizontalScrollIndicator={true}
    keyExtractor={(ram) => ram.number}
    data={stylesofcartoon}
    renderItem={
      ({ item }) => {
        return <>
          <View>
            <TouchableOpacity onPress={() => getsketch(setload, ImageUrl, `${item.url}`, item.sigma, (sketchurl) => { navigation.navigate("Sketch", { sketchi: sketchurl })},setselector,setsketch,setcartoon,setpainting  )} >
              <Image style={{ height: 60, width: 60, alignContent: "center", marginLeft: 20,borderRadius:20 }}
                source={item.image} />
              <Text style={{ textAlign: "center", alignContent: "center", color: "white", marginLeft: 10 }}>
                {item.name}
              </Text>
              <Text style={{ textAlign: "center", alignContent: "center", color: "white", marginLeft: 10 }}>
                {item.subname}
              </Text>
            </TouchableOpacity>
      
          </View>
        </>
      }
    }
      /></View>}
       {paintingi?<></>:

<View style={{ textAlign: "center", alignContent: "center", color: "white",height: 110,marginTop:20, width: "100%" }}>
  <FlatList
    horizontal={true}
    showsHorizontalScrollIndicator={true}
    keyExtractor={(ram) => ram.number}
    data={stylesofpainting}
    renderItem={
      ({ item }) => {
        return <>
          <View>
            <TouchableOpacity onPress={() => getsketch(setload, ImageUrl, `${item.url}`, item.sigma, (sketchurl) => { navigation.navigate("Sketch", { sketchi: sketchurl }) },setselector,setsketch,setcartoon,setpainting )} >
              <Image style={{ height: 60, width: 60, alignContent: "center", marginLeft: 20,borderRadius:20 }}
                source={item.image} />
              <Text style={{ textAlign: "center", alignContent: "center", color: "white", marginLeft: 10 }}>
                {item.name}
              </Text>
              <Text style={{ textAlign: "center", alignContent: "center", color: "white", marginLeft: 10 }}>
                {item.subname}
              </Text>
            </TouchableOpacity>
      
          </View>
        </>
      }
    }
      /></View>}</LinearGradient>
      </View>   

    }
  


  
  </View>
  );
};

const styles = StyleSheet.create({

});

export default home;
