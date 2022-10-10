import { collection, collectionGroup, getDocs, query,where} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { SafeAreaView,Text, View,StyleSheet,FlatList } from "react-native";
import {db} from "../firebase";


const PlayerScreen = ({route})=> {
        const [matchess1, setMatches] = useState([]);
        const [matchess2, setMatches2] = useState([]);
        const arr = route.params.item;
        // console.log(arr.Name);
        useEffect ( ()=>{

            const getMatches = async()=>{
                // const matches = query(collectionGroup(db, 'Matches'), where('Player1', '==', 'Ivan'));
                const matches = query(collectionGroup(db, 'Matches'), where('Player1', '==', arr.Name));
                const querySnapshot = await getDocs(matches);
                //console.log(querySnapshot);
                //process.stdout.write(JSON.stringify(querySnapshot) + '\n');
                
                setMatches(querySnapshot.docs.map((doc) => ({...doc.data()})));   
               
                const matches2 = query(collectionGroup(db, 'Matches'), where('Player2', '==', arr.Name));
                const querySnapshot2 = await getDocs(matches2);
                 console.log(querySnapshot.docs); 
                setMatches2(querySnapshot2.docs.map((doc) => ({...doc.data()})));
            }
    
            getMatches();
            
            


        },[]);
        const matchess = matchess1.concat(matchess2);
        const renderItem = ({item}) => {
            return ( <View>
                <Text/>
                <Text> Tournamnet Name : {item.Tourn} </Text>
                <Text> Player1: {item.Player1} </Text>
                <Text> Player2: {item.Player2}</Text> 
                <Text> Match Winner: {item.Winner} </Text> 
                <Text> WinnerProfit: {item.WinnerProfit} </Text>
                <Text> LoserLoss: {item.LoserLoss}</Text>
                <Text>----------------------------</Text>
                </View>
            );
        };
    
            // console.log({arr});
        return ( 
             <View>   
                <SafeAreaView> 
                <Text style={styles.TextStyle2}> Stats of the  {arr.Name} </Text>                    
                <Text style={styles.TextStyle}> Current Rank is : {arr.Rank}  </Text>
                <Text style={styles.TextStyle}> Total Score: {arr.Score}  </Text>
                <Text style={styles.TextStyle2}> Matches Played by {arr.Name} </Text>     
                
            <FlatList data={matchess}
            renderItem={renderItem} keyExtractor={item=>item.DateTime}
            />
           </SafeAreaView>
            </View>


            
        );

    //<Text style={styles.TextStyle}> this is Player screen </Text>
}
const styles = StyleSheet.create(
    {
        TextStyle:{
            color: 'grey',
            fontSize: 14
        },
        TextStyle2:{            
            color: 'red',
            fontSize: 14,
            padding: 4
        }
    }
)

export default PlayerScreen;