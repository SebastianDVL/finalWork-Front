import * as React from 'react';

import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Text,
  Dimensions,
  ImageBackground,
} from 'react-native';

import Colors from '../assets/Colors';
import axios from 'axios';

const D = {
    height:Dimensions.get('window').height,
    width: Dimensions.get('window').width
}
function SignIn({navigation}){
    const [name,setName] = React.useState('')
    const [password,setPassword] = React.useState('')
    const [username,setUsername] = React.useState('')  
    const [role, setRole] = React.useState('')
    const [reservedWord, setReservedWord] = React.useState('')
    const [msg,setMsg] = React.useState('')
    const [color,setColor] = React.useState(Colors.success)

    const handleSubmit = ()=>{
        try {
            axios.post('http://localhost:4200/api/v1/turboRentaCar/user', {
                username: username,
                name: name,
                password: password,
                role:role,
                reservword:reservedWord,
              })
              .then(function (response) {
                setColor(Colors.success)
                setMsg(response.message)
                clear()
              })
              .catch(function (error) {
                console.log(error);
              })    
        } catch (error) {
            console.log(error)
            throw error
        }
     
    }

    const clear = ()=>{
        setName("")
        setUsername("")
        setPassword("")
        setRole("")
        setReservedWord("")
    }
    
  return (
    <SafeAreaView>
        <ScrollView>
            <View>
                <View style={styles.nav}>
                    <Pressable onPress={()=>navigation.navigate('Login')} style={styles.pressable}>
                        <Text style={styles.menuBtn}>LOGIN</Text>
                    </Pressable>
                    <Pressable onPress={(e)=>e.preventDefault()} style={[styles.pressable,{backgroundColor:Colors.primaryPressed}]}>
                        <Text style={styles.menuBtn}>SIGNIN</Text> 
                    </Pressable>
                </View>
                <ImageBackground resizeMode='stretch' style={styles.layout} source={{ uri: "https://p4.wallpaperbetter.com/wallpaper/452/849/118/textures-backgrounds-1920x1200-abstract-textures-hd-art-wallpaper-preview.jpg" }}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput value={name} style={styles.input} onChangeText={text=>setName(text)}/>

                    <Text style={styles.label}>Username</Text>
                    <TextInput value={username} style={styles.input} onChangeText={text=>setUsername(text)}/>

                    <Text style={styles.label}>Role</Text>
                    <TextInput value={role} style={styles.input} onChangeText={text=>setRole(text)}/>

                    <Text style={styles.label}>Password</Text>
                    <TextInput value={password} secureTextEntry={true} style={styles.input} textContentType='password' onChangeText={text=>setPassword(text)}/>

                    
                    <Text style={styles.label}>Reserved Word</Text>
                    <TextInput value={reservedWord} style={styles.input} onChangeText={text=>setReservedWord(text)}/>

                    <Text style={[styles.msg,{color:color}]} >{msg}</Text>
                    <Pressable onPress={handleSubmit}>
                        <Text style={styles.btn}>Sign Up</Text>
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
        width:D.width/2,
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
        backgroundColor:Colors.primary,
        color:Colors.white,
        borderRadius:8,
    }, 
    input:{
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
    msg:{
        fontSize:20,
        marginBottom:30
    }
});

export default SignIn;