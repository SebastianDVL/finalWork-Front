import * as React from 'react';
import axios from 'axios';
import {
    StyleSheet,
    SafeAreaView,
    View,
    ScrollView,
    Pressable,
    Text,
    Dimensions,
    ImageBackground,
    TextInput
} from 'react-native';

import Colors from '../assets/Colors';

const D = {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width
}
function LogIn({ navigation }) {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [msg, setMsg] = React.useState('')

    const handleSubmit = async  () => {
        try {
            const res = await axios.get('http://localhost:4200/api/v1/turboRentaCar/users')
            const userFound =res.data.data.filter(user => user.username == username)
            if(userFound.length >0){
    
                if(userFound[0].password == password){

                    userFound[0].role == "admin" ? navigation.navigate('Cars',{name:userFound[0].name,role:userFound[0].role}):navigation.navigate('Rent',{name:userFound[0].name,role:userFound[0].role,username:userFound[0].username})
                }else{
                    setMsg("Incorrect password!")
                }
            }else{
                setMsg("User does not exist!")
            }         
        } catch (error) {
            console.log(error)
            throw error
        }

    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <View style={styles.nav}>
                        <Pressable onPress={(e) => e.preventDefault()} style={[styles.pressable, { backgroundColor: Colors.primaryPressed }]}>
                            <Text style={[styles.menuBtn]}>LOGIN</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('Signin')} style={styles.pressable}>
                            <Text style={styles.menuBtn}>SIGNIN</Text>
                        </Pressable>
                    </View>       
                <ImageBackground resizeMode='stretch' style={styles.layout} source={{ uri: "https://p4.wallpaperbetter.com/wallpaper/452/849/118/textures-backgrounds-1920x1200-abstract-textures-hd-art-wallpaper-preview.jpg" }}>
             
                  

                    <Text style={styles.label}>Username</Text>
                    <TextInput value={username} style={styles.input} onChangeText={text=>setUsername(text)}/>

                    <Text style={styles.label}>Password</Text>
                    <TextInput value={password} style={styles.input} onChangeText={text=>setPassword(text)}/>
                        <Text style={styles.msg} >{msg}</Text>

                        <Pressable onPress={handleSubmit}>
                            <Text style={styles.btn}>Log In</Text>
                        </Pressable>
                        
                        <Pressable onPress={()=>navigation.navigate('PasswordRecovery')}>
                            <Text style={{color:Colors.white}}>Forgot password</Text>
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
        height: D.height -  120,
    },
    nav: {
        display: 'flex',
        flexDirection: 'row',
        width: D.width,
    },
    pressable: {
        height: 50,
        backgroundColor: Colors.primary,
        display: 'flex',
        justifyContent: 'center',
        width: D.width / 2,
    },
    menuBtn: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.white,
    },
    btn: {
        padding: 15,
        width: D.width -60,
        textAlign: 'center',
        backgroundColor: Colors.primary,
        color: Colors.white,
        borderRadius: 8,
    },
    input: {
        fontSize: 16,
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.border,
        color: Colors.white,
        padding: 10,
        borderRadius: 8,
        marginBottom: 30,
        marginTop: 10,
        backgroundColor:'#00838fb3'
    },
    label: {
        fontSize: 20,
        fontWeight: '400',
        color: Colors.white
    }, msg: {
        fontSize: 20,
        marginBottom: 30,
        color: Colors.red
    }
});

export default LogIn;