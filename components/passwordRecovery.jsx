import * as React from 'react';

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
import axios from 'axios';

const D = {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width
}
function PasswordRecovery({ navigation }) {


    const [username, setUsername] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')
    const [reservedWord, setReservedWord] = React.useState('')
    const [msg, setMsg] = React.useState('')

    const handleSubmit = async () => {
        try {
            const res = await axios.get('http://localhost:4200/api/v1/turboRentaCar/users')
            const userFound =res.data.data.filter(user => user.username == username)
            console.log(userFound[0])
            if(userFound.length >0){
                if(userFound[0].reservword == reservedWord){
                   await axios.put(`http://localhost:4200/api/v1/turboRentaCar/user/${userFound[0]._id}`,{
                        password:newPassword
                   })
                   setMsg('Password updted!')
                }else{
                    setMsg("Wrong reserved word!")
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
        
                <ImageBackground resizeMode='stretch' style={styles.layout} source={{ uri: "https://p4.wallpaperbetter.com/wallpaper/452/849/118/textures-backgrounds-1920x1200-abstract-textures-hd-art-wallpaper-preview.jpg" }}>
             
                    <Text style={styles.label}>Username</Text>
                    <TextInput value={username} style={styles.input} onChangeText={text=>setUsername(text)}/>

                    <Text style={styles.label}>Reserved Word</Text>
                    <TextInput value={reservedWord} style={styles.input} onChangeText={text=>setReservedWord(text)}/>

                    <Text style={styles.label}>New Password</Text>
                    <TextInput value={newPassword} style={styles.input} onChangeText={text=>setNewPassword(text)}/>
                   
                        <Text style={styles.msg} >{msg}</Text>

                        <Pressable onPress={handleSubmit}>
                            <Text style={styles.btn}>Reset Password</Text>
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

export default PasswordRecovery;