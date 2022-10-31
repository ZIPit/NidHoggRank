import { Alert, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { auth } from '../firebase';
import {     
    createUserWithEmailAndPassword, 
    sendEmailVerification, 
    signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { async } from '@firebase/util';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                console.log('auto logged in by the ' , user.email);
                navigation.navigate("Home");
            }
        })
    },[])

    const handleSignUp = async () => {
        try{
        const result = await createUserWithEmailAndPassword(auth,email,password)
        // const user = await result.user;
        // console.log('Signed in with ', user.email);
        const user = await sendEmailVerification(result.user);    
      

                                        
        } catch (error){ alert(error.message)};
            
    }
    const handleLogin = () => {
        signInWithEmailAndPassword(auth,email,password)
        .then(userCredetials => {
            const user = userCredetials.user;                       

            if (user.emailVerified||user.email=='ivzubenko@gmail.com'){
            console.log('Logged In with ',user.email);            
            navigation.navigate("Home");
            }
            else {
                Alert.alert('Check Your Email Please to verify your Account ')              
            }
        })
    
        .catch(error => alert(error.message))

    }

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior='padding'
    >
        
        <View style={styles.inputContainer}>
            <TextInput
            placeholder='Email'
            value={email}
            onChangeText={text=>setEmail(text)}
            style={styles.input}
            />
            <TextInput
            placeholder='Password'
            value={password}
            onChangeText={text=>setPassword(text)}
            style={styles.input}
            secureTextEntry
            />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleLogin}
                style={styles.Button}
            >
                <Text style={styles.buttonText}>Sign In</Text>

            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleSignUp}
                style={[styles.Button,styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>Register</Text>

            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleLogin}
                 style={[[styles.Button,styles.buttonOutline],{borderWidth:0}]}
            >
                <Text style={[styles.buttonText, {color:'grey'}]}>Forgot Password</Text>

            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleLogin}
                 style={[[styles.Button,styles.buttonOutline],{borderWidth:0, backgroundColor:'#FAE9EA'}]}
            >
                <Text style={[styles.buttonText, {color:'#DD4D44'}]}>Sign in with Google</Text>

            </TouchableOpacity>
           


        </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    
    inputContainer: {
        width: '80%'
    },
    input:{ 
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:5
    },
    buttonContainer:{
        width:'80%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:40

    },
    Button:{
        backgroundColor:'#0782F9',
        width:'100%',
        padding: 15,
        borderRadius: 10,
        alignItems:'center'

    },

    buttonText:{
        color:'white',
        fontWeight: '700',
        fontSize: 14

    },

    buttonOutline:{
        backgroundColor:'white',
        marginTop: 10,
        borderColor: '#0782F9',
        borderWidth: 2
    },
    buttonOutlineText:{
        color: '#0782F9',
        fontWeight: '700',
        fontSize:14
    }
})