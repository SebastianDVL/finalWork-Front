import * as React from 'react';
import axios from 'axios';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Pressable,
  Text,
  TextInput,
  Dimensions,
  Image,
  ImageBackground
} from 'react-native';

import Colors from '../assets/Colors';


const D = {
    height:Dimensions.get('screen').height,
    width: Dimensions.get('screen').width
}
function Rent({navigation,route}){

  const [plateNumber,setPlateNumber] = React.useState('')
  const [finalDate,setFinalDate] = React.useState("")
  const [rentDate,setRentDate] = React.useState(new Date().toDateString())  
  const [msg,setMsg] = React.useState('')
  const [color,setColor] = React.useState(Colors.success)


  const handleSubmit = async ()=>{   
    try {
        const res = await axios.get('http://localhost:4200/api/v1/turboRentaCar/cars') 
        const carFound = res.data.data.filter(car => car.platenumber ==plateNumber)
        if(carFound.length > 0){
            if(carFound[0].state){
                axios.post('http://localhost:4200/api/v1/turboRentaCar/rent', {
                    platenumber:plateNumber,
                    username:route.params.username,
                    initaldate:rentDate,
                    finalDate:finalDate,
                    status:false
                  })
                  .then(async function (response) {
                    await axios.put(`http://localhost:4200/api/v1/turboRentaCar/car/${carFound[0]._id}`,{
                    state:false
                    })
                    setColor(Colors.success)
                    setMsg(response.message)
                    clear()
                  })
                  .catch(function (error) {
                    console.log(error);
                  })  
            }else{
                setColor(Colors.red)
                setMsg("Car already rented!")
            }
        }else{

            setColor(Colors.red)
            setMsg("Car not found!")
           
        }
       
    } catch (error) {
        console.log(error)
        throw error
    }
  }
  
  const clear = ()=>{
    setPlateNumber("")
    setRentDate(new Date().toDateString())
    setFinalDate("")
}
  return (
    <SafeAreaView>
        <ScrollView>
            <View>
            <View style={styles.nav}>
                    <View onPress={(e)=>e.preventDefault()}  style={[styles.pressable,{backgroundColor:Colors.primaryPressed}]}>
                        <Text style={styles.menuBtn}>Rent</Text>
                    </View>
                </View>
                <View style={styles.user}>

                        <Image source={{uri:"https://www.pngkit.com/png/full/940-9406687_already-a-proact-user-employee-icon-white-png.png",width:75,height:75}} style={{resizeMode:'center'}}></Image>
                        <Text style={[styles.name]}>{route.params.name}</Text>
                </View>
                
                <ImageBackground resizeMode='stretch' style={styles.layout} source={{ uri: "https://p4.wallpaperbetter.com/wallpaper/452/849/118/textures-backgrounds-1920x1200-abstract-textures-hd-art-wallpaper-preview.jpg" }}>
    

                    <Text style={styles.label}>Plate Number</Text>
                    <TextInput autoCapitalize='words' value={plateNumber} style={styles.input} onChangeText={text=>setPlateNumber(text)}/>

                    <Text style={styles.label}>Rent Date</Text>
                    <TextInput value={rentDate} style={styles.input} editable={false}/>

                    <Text style={styles.label}>Rent Date</Text>
                    <TextInput value={finalDate} style={styles.input} onChangeText={text=>setFinalDate(text)}/>
                   
                    <Text style={[styles.msg,{color:color}]} >{msg}</Text>
                    <Pressable onPress={handleSubmit}>
                        <Text style={styles.btn}>Search / Save</Text>
                    </Pressable>
                </ImageBackground>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layout: {
    display: 'flex',
    justifyContent: 'center',
    padding: 30,
    height: D.height - 120,
},
nav:{
    display:'flex',
    flexDirection:'row',
    width:D.width,
},
pressable:{
    height:50,
    backgroundColor:Colors.primary,
    display:'flex',
    justifyContent: 'center',
    width:D.width,
},
menuBtn:{
    fontSize:15,
    fontWeight:'bold',
    textAlign:'center',       
    color:Colors.white,
},
btn:{
    padding:15,
    width:D.width-60,
    textAlign:'center',
    backgroundColor:Colors.btn,
    color:Colors.white,
    borderRadius:8,
}, 
input:{
    fontSize:16,
    height: 50,
    width:'100%',
    borderWidth: 1,
    borderColor:Colors.border,
    color:Colors.white,
    padding: 10,
    borderRadius:8,
    marginBottom:30,
    marginTop:10,
    backgroundColor:'#00838fb3'
},
label:{
    fontSize:20,
    fontWeight:'400',
    color: Colors.white
},
user:{
    backgroundColor: Colors.primaryPressed,
    padding: 30,
    display: 'flex',
    alignItems: 'center',
},
name:{
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center',       
    color:Colors.white,
}
});

export default Rent;