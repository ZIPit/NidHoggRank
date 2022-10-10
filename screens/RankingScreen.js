import React, {useState,useEffect } from "react";
import { FlatList, TouchableOpacity, Text, View, StyleSheet, SafeAreaView } from "react-native";
import {db} from "../firebase";
import {collection , getDocs, query,orderBy, limit} from "@firebase/firestore";
import Row from '../components/rankingRow';


// onSnapshot(collection(db,"Players"), (snapshot)=>{console.log(snapshot)});
        
const Players = [
    {Rank: '1', Name: 'Ivan', Score:'123', LastChange:'+5'},
    {Rank: '2', Name: 'Andrey', Score:'111', LastChange:'+2'},
    {Rank: '3', Name: 'Alex', Score:'90', LastChange:'-2'},
    {Rank: '4', Name: 'Vladimir', Score:'80', LastChange:'-6'},
    ];
    


const Item = ({itemC}) => (
       <Row item={itemC} />           
    );

/*
<View>
    <Text style={styles.TextStyle}> {itemC.Rank} {itemC.Name} {itemC.Score} {itemC.LastChange} </Text>                  
    </View>

*/

const Ranking = (props) => {
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db,"Players");
      
    useEffect(()=>{
        const getUsers = async () => {
        const q = query(usersCollectionRef, orderBy("Rank"));
        //const q = query(usersCollectionRef,orderBy("Rank"));
        const data = await getDocs(q);
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));    
        };
        getUsers();
        
    },[])
    console.log(users);
      //  console.log(Players);
   //  <Item itemC = {item}  />
    const renderItem = ({item}) => (   
    <TouchableOpacity onPress={()=>{props.navigation.navigate('Player',{item})}} >
           <Text style={styles.TextStyle}>   {item.Rank} {item.Name} {item.Score} {item.LastChange}</Text>
       
   
    
    </TouchableOpacity>
    );   
    
    // console.log(PlayersRef);


    return (     
        <SafeAreaView>
            <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={item=>item.id}
            numColumns={1}            
            />

        </SafeAreaView>
        
    );
    
}

const styles = StyleSheet.create(
    {
        TextStyle:{
            color: 'blue',
            fontSize: 14
        }
    }
)

export default Ranking;