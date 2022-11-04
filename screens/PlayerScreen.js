import React, { useEffect, useState } from "react";
import { SafeAreaView,Text, View,StyleSheet,FlatList } from "react-native";
import firestore from '@react-native-firebase/firestore';


const PlayerScreen = ({route})=> {
        const [matchess1, setMatches] = useState([]);
        const [matchess2, setMatches2] = useState([]);
        const arr = route.params.item;

        useEffect ( ()=>{

            const getMatches = async()=>{
                
                const querySnapshot = await firestore().collectionGroup("Matches").where('Player1', '==', arr.Name).get();     


                setMatches(querySnapshot.docs.map((doc) => ({...doc.data()})));                  
                const querySnapshot2 = await firestore().collectionGroup("Matches").where('Player2', '==', arr.Name).get();  

                 console.log(querySnapshot.docs); 
                setMatches2(querySnapshot2.docs.map((doc) => ({...doc.data()})));               
            }
    
            getMatches();
            
            

        },[]);
        const matchess = matchess1.concat(matchess2);
        const renderItem = ({item}) => {
            return ( <View style={[styles.SubFrameBorder,{marginBottom:5}]}>                
                
                <Text style={styles.GridRow}> Tournamnet Name : {item.Tourn} </Text>
                <Text> Player1: {item.Player1} </Text>
                <Text> Player2: {item.Player2}</Text> 
                <Text> Match Winner: {item.Winner} </Text> 
                <Text> WinnerProfit: {item.WinnerProfit} </Text>
                <Text> LoserLoss: {item.LoserLoss}</Text>
                
                </View>
            );
        };
    

   

        
             console.log({arr});
        return ( 
             <View style={styles.Container}>   
                <View style={[styles.FrameBorder, { margin:2, marginBottom:10 }]}>
                    <Text style={styles.TextTitle}> Stats of the  {arr.Name} </Text>                    
                    <View style={{backgroundColor:'aliceblue', borderTopWidth:1, padding:5}}>
                    <Text style={styles.TextStyle}> Current Rank is : {arr.Rank}  </Text>
                    <Text style={styles.TextStyle}> Total Score: {arr.Score}  </Text>
                    </View>
                    </View>
                                    
            <SafeAreaView style={[ styles.FrameBorder, {padding:10 }]}>                  
            <Text style={styles.TextTitle}> Matches Played by {arr.Name} </Text>
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
        Container:{
        flex: 1,
        padding: 20,
        borderWidth: 5,
        backgroundColor:"oldlace"

    },
        TextStyle:{
            color: 'green',
            fontSize: 14
        },
        TextStyle2:{            
            color: 'black',
            fontSize: 14,
            padding: 4,
             textAlign:'center'
        },
        TextTitle:{            
            color: 'black',
            fontSize: 14,
            padding: 10,
            textAlign:'center',
            fontWeight:'bold'
        },
        GridRow:{
            fontSize:14,
            color: 'green',
            borderBottomWidth:1,
            borderColor:'grey',
            //borderTopEndRadius:5

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
        }
    }
)

export default PlayerScreen;