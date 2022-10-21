import { collection, collectionGroup, getDocs, query,where} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View,StyleSheet, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {db} from "../firebase";


const TournScreen = ({props, navigation}) => {
    const TournCollectionRef = collection(db,"Tournaments");   
    const [matchess, setMatches] = useState([]);
    const [tourns, setTourn] = useState([]);
    const [actTourns, addActTourn] = useState([]);
    
    
    useEffect ( ()=>{
        const getTourn= async()=>{
    
                const q = query(TournCollectionRef);
                const data = await getDocs(q);
 
             setTourn(data.docs.map((doc) => ({...doc.data(),  Tname: doc.id})));               
            }
    
        getTourn();
   
        },[]
    );
   
    
    let t=[];
   //t=tourns;
    tourns.forEach(item=>{
        if (item.Status==0) {
            t.push(item);
   //         addActTourn(prevArray=>({...prevArray,item}));
        }

     });
     
     //console.log(t, 'actTourns value');

//     console.log(actTourns, 'useState');
    // const activeTourn=tourns.map(item=>{ 
    //     let t  ;         
    //     if (item.Status==0) {
    //         t =item;
    //     }
    // return {t}
    // });
    // console.log(activeTourn, 'test');

    
    const renderItem = ({item}) => {
        let TName = item.Tname;
        return (
           
            <TouchableOpacity 
            style={[styles.SubFrameBorder, {padding:8, margin:5, flex: 1, alignSelf:'stretch', borderWidth:1 },{backgroundColor:item.StatusName==='Active'?'yellow':'aliceblue'} ]} 
            onPress={item.Status===0? (  ()=>{navigation.navigate('Atourn',{item})}):(()=>{navigation.navigate('Tres',{TName})})}>
                 <Text style={styles.GridRow}> Tournament: {item.Tname} </Text>
                 <View style={{ flexDirection: 'row'}}>
                 <View style={{ flex: 1, alignSelf: 'stretch', alignItems:'flex-start', marginLeft:20} }  >                                     
                    <Text> Date: {item.Date} </Text>
                    <Text style={{color:item.StatusName==='Active'?'red':'green'}}>  Status: {item.StatusName} </Text>         
                </View>
                 <View style={{ flex: 1.5, alignSelf:'stretch'}} >
                    <Text> Importancy: {item.Importancy} </Text>
                    <Text> Importancy Rate : {item.Coeff} </Text>                            
                 </View>
                 </View>
             </TouchableOpacity>
             
            );
            
    };
   
  

    return (    
        
        <SafeAreaView style={styles.Container}>
            <Text style={styles.titleStyle}> Tournaments history </Text>
            <View style={[styles.FrameBorder,{margin:10 }]}>  
            <FlatList data={tourns}
            renderItem={renderItem}
            keyExtractor={item=>item.Tname}
            />
            </View>
        </SafeAreaView>    
        
        
         


    
    );

};

const styles =  StyleSheet.create({
    Container:{
        flex: 1,
        padding: 20,
        borderWidth: 5,
        backgroundColor:"oldlace"
    
        },
    titleStyle:{
        color:"green",
        fontSize:30,
        textAlign: "center",
        margin:15

    },
    FrameBorder: {
        borderColor:'grey', 
        borderRadius:5, 
        backgroundColor:'powderblue',
        borderWidth:2
    },
    SubFrameBorder: {
        borderWidth:2, 
        borderColor:'grey', 
        margin:3, 
        backgroundColor:'aliceblue',
        borderRadius:5
    },
    GridRow:{
        fontSize:14,
        color: 'green',
        borderBottomWidth:1,
        borderColor:'grey',
        //borderTopEndRadius:5

    }
});



export default TournScreen;