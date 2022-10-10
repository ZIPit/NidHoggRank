import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import {db} from "../firebase";
import {collection , getDocs, query,orderBy, limit} from "@firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";

Atourn2 = ({route, navigation}) => {
    
    let arrPlayers = new Array;
    
    let TName;
    TName = route.params.textInput;
    const tournRef = collection(db,"Tournaments/"+TName+"/Matches");
    const docRef = doc(db, "Tournaments", TName);
    
    const [Pl1_selected,setPl1] = useState('test'); 
    useEffect (()=> {
        const getTournData = async () => {
     
        
        const docSnap = await getDoc(docRef);
        let arr = docSnap.data().Participants;
        const b = docSnap.data().Coeff;
        arrPlayers=arr;
        Coeff=b;
       console.log(arrPlayers[0], arrPlayers[1],'test3');
       setPl1(arrPlayers[0]);
        };
       
        
     getTournData();  
     console.log(route.params.textInput);
     console.log(arrPlayers);

   
    },[]);
    
    return (
        <View>
        <Text> {Pl1_selected} </Text>
        </View>
    )

}

const Styles = StyleSheet.create(
  {
      testStyle: {
          color: "red"
      }
  }  
);

export default Atourn2 

