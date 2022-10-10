import { collection, collectionGroup, getDocs, query,where} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View,StyleSheet, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {db} from "../firebase";





const TournScreen = ({props, navigation}) => {
    const TournCollectionRef = collection(db,"Tournaments");   
    const [matchess, setMatches] = useState([]);
    const [tourns, setTourn] = useState([]);
    useEffect ( ()=>{
        const getTourn= async()=>{
    
                const q = query(TournCollectionRef);
                const data = await getDocs(q);
 
             setTourn(data.docs.map((doc) => ({...doc.data(),  Tname: doc.id})));  
            }
    
        getTourn();
   
        },[]
    );

    const renderItem = ({item}) => {
        let TName = item.Tname;
        return (
            <TouchableOpacity style={{ flex: 1, alignSelf:'stretch', flexDirection: 'row' }} onPress={item.Status===0? (  ()=>{navigation.navigate('Atourn',{item})}):(()=>{navigation.navigate('Tres',{TName})})}>
                 <View style={{ flex: 1, alignSelf: 'stretch', alignItems:'flex-start', marginLeft:20} }  >                 
                    <Text> Tournament: {item.Tname} </Text>
                    <Text> Date: {item.Date} </Text>
                    <Text> Status: {item.StatusName} </Text>         
                </View>
                 <View style={{ flex: 1.5, alignSelf:'stretch'}} >
                    <Text> Importancy: {item.Importancy} </Text>
                    <Text> Importancy Rate : {item.Coeff} </Text>
                  
            
                 </View>
             </TouchableOpacity>
            );
    };
   
  

    return (      
        <SafeAreaView>
            <Text style={styles.titleStyle}> Tournaments history </Text>
            <FlatList data={tourns}
            renderItem={renderItem}
            keyExtractor={item=>item.Tname}
            />

        </SafeAreaView>    
        
         


    
    );

};

const styles =  StyleSheet.create({
    titleStyle:{
        color:"red",
        fontSize:30,
        textAlign: "center",
        margin:15

    }
});



export default TournScreen;