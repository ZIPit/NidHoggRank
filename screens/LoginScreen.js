import { Alert, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Button, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useTheme } from 'react-navigation';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  

    const navigation = useNavigation();

 // Handle user state changes
 function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }    

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

 



    const handleSignUp = async () => {
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
          }
      
          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          }
      
          console.error(error);
        });
            
    }
    const handleLogin = () => {
        auth()
        .signInWithEmailAndPassword(email,password)
        .then((userCredetials) => {
            const user = userCredetials.user;                       
            // if (user.emailVerified||user.email=='ivzubenko@gmail.com'){
            console.log('Logged In with ',user.email);            
            navigation.navigate("Home");
            })
        .catch(error=>{ Alert.alert(error.code)});
    }
    
        

    GoogleSignin.configure({
        webClientId: '336679069459-iomet9b1jg5gfklabbaev3f3j383797m.apps.googleusercontent.com',
      });

    



    const onGoogleButtonPress =  async () => {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
       // return auth().signInWithCredential(googleCredential);
       const user_sign_in = auth().signInWithCredential(googleCredential);
       user_sign_in.then((user)=>{
        console.log(user);
       })
       .catch((error)=>{
            console.log(error);
       })
      }

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await auth().signOut();
        
        }   catch (error) {
            console.error(error);
        }
    }

    const logOut = () =>{
        auth()
        .signOut()
        .then(() => console.log('User signed out!'))
        .catch((error)=>{ console.error(error)});
    }
    
    if (initializing) return null;
   
   
  if (!user) {
    console.log(user,'all empty');
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
            
            <GoogleSigninButton
                style={{width:300, height:65, marginTop:10}}
                onPress={onGoogleButtonPress}
            
            />

            
            
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
            
           


        </View>
    </KeyboardAvoidingView>
  );
  }
  if (user){
    const t =user.providerData[0];
    console.log(t.providerId);
    
    if (t.providerId=='google.com') {
    
    
        return (
            
            <View style={{alignItems:'center'}}>
                <Text> Welcome {user.displayName} </Text>
                <Image 
                    source={{uri: user.photoURL}}
                    style={{height:80, width: 80, borderRadius:150, marginTop:30, alignItems:'center'}}
                />
           
                <Button onPress={signOut} title='Sign Out'/>
                <Button onPress={()=>{navigation.navigate("Home")}} title='Go to Home Page'/>                
            </View>
        );
    }
    else {return (
                <View>
                        <Text> Welcome {user.email} </Text>
                        <Button title='logOut' onPress={logOut}/>
                    </View>
                  );
    }
  }
  
  
    
  
    
   
  
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