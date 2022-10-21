import React, {useState,useEffect } from "react";
import { FlatList, TouchableOpacity, Text, View, StyleSheet, SafeAreaView, BackHandler, Alert } from "react-native";
import {db} from "../firebase";
import {collection , getDocs, query,orderBy, limit} from "@firebase/firestore";
import Row from '../components/rankingRow';


        

const Item = ({itemC}) => (
       <Row item={itemC} />           
    );


const Ranking = (props) => {
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db,"Players");
    
    useEffect(()=>{
        console.log('back button flow has started..');
        const backAction = () => {
            Alert.alert("Hold on!","Are you sure you want to go back?",[
                {
                    text: "Cancel",
                    onPress: ()=>null,
                    style: "cancel"
                },
                {
                    text: "Yes", onPress:()=> BackHandler.exitApp()}

            ]);
        return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
        return () => backHandler.remove();
    },[]);
    

    useEffect(()=>{
        

        const getUsers = async () => {
        const q = query(usersCollectionRef, orderBy("Rank"));
        const data = await getDocs(q);
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));    
        };
        getUsers();
      
    },[]);
    console.log(users);

    const renderItem = ({item}) => (   
    <TouchableOpacity onPress={()=>{props.navigation.navigate('Player',{item})}} >
        <View style={[{flexDirection: 'row', borderWidth: 1,  borderRadius:5}]}>
           
           {/* <Text style={styles.TextStyle}>   {item.Rank} {item.Name} {item.Score} {item.LastChange}</Text> */}
           <Text style={[styles.GridText,{flex:1 }]}>   {item.Rank} </Text>
           <Text style={[styles.GridText,{flex:2}]}>   {item.Name} </Text>
           <Text style={[styles.GridText,{flex:1}]}>   {item.Score}</Text>
           <Text style={[styles.GridText,{flex:1}]}>   {item.LastChange}</Text>
        
        </View>
   
    
    </TouchableOpacity>
    );   
    

    return (     
        <View style={styles.Container}>

        <View style={{padding:10,alignItems:'center', marginBottom:15}}>
            <Text style={styles.PageTitle}> Ranking Table</Text>
        </View>

        <View style={[{flexDirection: 'row', borderWidth: 1, borderRadius:5}]}>           
        
           {/* <Text style={styles.TextStyle}>   {item.Rank} {item.Name} {item.Score} {item.LastChange}</Text> */}
           <Text style={[styles.TitleGrid,{flex:1}]}> Rank </Text>
           <Text style={[styles.TitleGrid,{flex:2}]}> Player </Text>
           <Text style={[styles.TitleGrid,{flex:1}]}> Score</Text>
           <Text style={[styles.TitleGrid,{flex:1}]}> Last Change</Text>
        
        </View>            
        <SafeAreaView>        
                <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={item=>item.id}
                numColumns={1}            
                />            
        </SafeAreaView>
        </View>
        
    );
    
}

const styles = StyleSheet.create(
    {
        Container:{
            flex: 1,
            padding: 20,
            borderWidth: 5,
            backgroundColor:"oldlace"

        },
        
        GridText:{
            color: 'blue',
            fontSize: 14,
            backgroundColor:'aliceblue',
            textAlign:'left'
        },
        TitleGrid:{
            color: 'black',
            fontSize: 14,
            textAlign:'left',
            fontWeight:'bold',
            backgroundColor:'powderblue'
        },
        PageTitle:{
            color: 'black',
            fontSize: 24,
            textAlign:'left',
            fontWeight:'bold'
            
        },
        
    }
)

export default Ranking;