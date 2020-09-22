import React from "react";
import{View,Text, Image} from "react-native";
import LinearGradient from 'react-native-linear-gradient';


const Headera=({navigation})=>{
    return(  <View style={{height:50,width:"100%",color:"black",backgroundColor:"purple",borderBottomRightRadius:100,alignContent:"center"}}>
   <LinearGradient colors={['#ee9617','#fe5858']} style={{
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  }}> 
  {/* <LinearGradient colors={["purple","black"]} style={{height:38,marginTop:6,marginBottom:6,alignContent:"center",width:150,marginLeft:"27%",borderRadius:30}}> */}
  <Text style={{
    fontSize: 30,
    fontWeight:"bold",
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    marginTop:5,
    color: '#ffffff',
    backgroundColor: 'transparent',
  }}>
    Face App
  </Text>
  {/* </LinearGradient> */}
  </LinearGradient>

    </View>
    );};

    export default Headera;