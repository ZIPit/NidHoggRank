import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = (props) => {    
    console.log(props);
return <View style={styles.container}>
        <Text style={styles.titleStyle} > Welcome to Hogg World</Text>
        <Pressable  style={styles.btn2Style} onPress={ () => props.navigation.navigate('Ranking') }>
             <LinearGradient colors={["#000000", "#4C4848","#000000"]} start={[0.95, 0.3]} style={styles.buttonContainer}  >
                 <Text style={styles.btnTitleStyle}> See Ranking stats</Text>
              </LinearGradient> 
        </Pressable>        
                                           
        <Pressable style={styles.btn2Style} onPress={ () => props.navigation.navigate('Tourn') }>
            <LinearGradient colors={["#000000", "#4C4848","#000000"]} start={[0.95, 0.3]} style={styles.buttonContainer}  >
                <Text style={styles.btnTitleStyle}> Tournaments and Matches </Text>  
            </LinearGradient> 
        </Pressable>              
        <Pressable style={styles.btn2Style} onPress={()=>props.navigation.navigate('Newtourn')}>
            <LinearGradient colors={["#000000", "#4C4848","#000000"]} start={[0.95, 0.3]} style={styles.buttonContainer}  >
                 <Text style={styles.btnTitleStyle}>Set New Tournament</Text>
            </LinearGradient> 
        </Pressable>                     
    </View>

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:"center",
        backgroundColor:"steelblue",
        borderWidth:5,
        borderColor:"black"

    },
    
    titleStyle: {
        color:'white',
        fontSize:24,
        textAlign:'center',
        fontWeight:'bold',
        marginTop:0
        

    },
    btnStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        marginTop:15,
        marginHorizontal:50   
      },
      btn2Style: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderRadius: 4,
        elevation: 3,
        marginTop:30,
        marginHorizontal:50   
      },  
    btnTitleStyle: {
        color:'white',
        fontWeight:"600",
        fontStyle:"normal"


    },
    buttonContainer: { 
     
        alignItems:"center", 
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: 'black',
        width:'100%'
        
      }
}
)

export default HomeScreen