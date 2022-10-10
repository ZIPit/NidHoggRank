import React, { useState, useEffect, useLayoutEffect } from "react";
import {Text, View, StyleSheet, Button, ScrollView, Alert, SafeAreaView, FlatList} from "react-native";
import {Picker} from '@react-native-picker/picker';
import Checkbox from "expo-checkbox";
import {db} from "../firebase";
import {collection , getDocs, query,orderBy, limit} from "@firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";




const Atourn = ({route, navigation}) => {
   
    let TName;
    if (typeof route.params.textInput !== 'undefined') {
         TName = route.params.textInput;
    }
    else 
    {
        TName = route.params.item.Tname;
    }

    console.log(TName,'test');

    

    const tournRef = collection(db,"Tournaments/"+TName+"/Matches");
    const docRef = doc(db, "Tournaments", TName);


 
    const usersCollectionRef = collection(db,"Players");

    const [arrPlayers, setArrPl]= useState([]);
    const [Coeff, setCoeff] = useState(0.0)


    const [Pl1_selected,setPl1] = useState();
    const [Pl2_selected,setPl2] = useState();
    const [Win_selected,setWin] = useState();
    const [isChecked, setChecked] = useState(false);

    const [matches, setMatches] = useState([]);
    const [MatchNo,setNewMatch] = useState(0);
    let [lastMatchData, getLastMatchNum] = useState([]);
   

    
    const [users, setUsers] = useState([]);





    
    useEffect (()=> {
    // Getting data about Tournament Participants from the FB DB    
    const getTournData = async () => {
        const docSnap = await getDoc(docRef);
        let arr = docSnap.data().Participants;
        const b = docSnap.data().Coeff;
        setArrPl(arr);
        setCoeff(b);
        console.log(arrPlayers[0], arrPlayers[1],'test3');
        setPl1(arr[0]);
        setPl2(arr[1]);
        setWin(arr[1]);
        };
    
    // Getting Matches list
    const getMatchStats = async () => {
        const q = query(tournRef, orderBy("MatchNo"));        
        const data = await getDocs(q);
        setMatches(data.docs.map((doc) => ({...doc.data()})));       
        };
    
    // -- Getting Ranking Stats
    const getUsers = async () => {
        const q = query(usersCollectionRef, orderBy("Rank"));        
        const data = await getDocs(q);
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));    
    };
    // Getting last Match Number and  defining number for the next match
    const getMatchNum = async () => {
        const q = query(tournRef, orderBy("MatchNo","desc"), limit(1));        
        const data = await getDocs(q);
        getLastMatchNum(data.docs.map((doc) => ({...doc.data()})));  

       
        // if (lastMatchData.length!=0) {    
        //     console.log('LastMatchFound:',lastMatchData[0].MatchNo);
            
        //         setNewMatch(lastMatchData[0].MatchNo+1);
        //     }
        //   else {console.log('No Matches'); setNewMatch(1)};
        };

    getTournData();   
    getUsers();
    getMatchStats();
    getMatchNum();
    },[TName]);

   
  
    useEffect(()=>{
        const setNewMatchNum = () => {
                if (lastMatchData.length!=0) {    
                    console.log('LastMatchFound:',lastMatchData[0].MatchNo);
                    
                        setNewMatch(lastMatchData[0].MatchNo+1);
                    }
                    else {console.log('No Matches'); setNewMatch(1)}
    
            }
        setNewMatchNum();
    
        },[lastMatchData]);



       
        useEffect(()=>{
            // Getting Matches list
        const getMatchStats = async () => {
        const q = query(tournRef, orderBy("MatchNo"));        
        const data = await getDocs(q);
        setMatches(data.docs.map((doc) => ({...doc.data()})));       
        };
        getMatchStats();

        },[MatchNo]);


    function getUsrRating(Item) {
        let Rank;
        let val = users.map(function(num){
            if (num.Name==Item) {            
                Rank=num.Score                    
            }
            
        });        
        return Rank;
    };
    

    function calcProfit(winner,loser, koeff) {
        let Profit;
        let wScore = getUsrRating(winner);
        let lScore = getUsrRating(loser);
        
        return Math.abs( Math.round((((100 - (wScore-lScore))/10 )*koeff + Number.EPSILON)*100 )/100);
    }
    
 
    const Player2Val =(Item) =>{
       if (Item!==Pl1_selected) {
        setPl2(Item);
        setWin(Item)
       }
       else Alert.alert('oops', Item+' cant play against Himself ;/');
    }
    const Player1Val =(Item) =>{
        if (Item!==Pl2_selected) {
         setPl1(Item)
         setWin(Item)
        }
        else Alert.alert('oops', Item+' cant play against Himself ;/');
     }

 
        
     const SumbitMatchRes = async() => {
         try {
        let lsr;
        let today = new Date().toLocaleDateString();
        let datetime = new Date();
        if (Win_selected==Pl1_selected) {lsr= Pl2_selected}
        else {lsr = Pl1_selected}       
        let Profit = calcProfit(Win_selected,lsr,Coeff);
        console.log('submitMatches Log', MatchNo, TName,Coeff,Pl1_selected,Pl1_selected,Win_selected,lsr,Profit,isChecked);
         await setDoc(doc(tournRef,MatchNo+Pl1_selected+Pl2_selected),{
                 Date: today,
                 MatchNo: MatchNo,
                 Tourn: TName,
                 Coeff: Coeff,
                 Player1: Pl1_selected,
                 Player2: Pl2_selected,
                 Winner: Win_selected,
                 Loser: lsr,
                 WinnerProfit: Profit,
                 LoserLoss: Profit*(-1),
                 FlawlessVictory: isChecked,
                 DateTime: datetime
             });
         
            } catch (err) {
                console.error('outer', err.message);
                throw err;

            } finally {
                setNewMatch(MatchNo+1);          

                console.log ('sub Collection has been added',MatchNo);
            }

            Alert.alert('Done', " Completed");

     }






   

    // useEffect(()=>{

    //     try {
    //     const getMatchNum = async () => {
    //     const q = query(tournRef, orderBy("MatchNo","desc"), limit(1));        
    //     const data = await getDocs(q);
    //     getLastMatchNum(data.docs.map((doc) => ({...doc.data()})));     
        

    //     };
    //     getMatchNum();
    // } catch (err) {
    //     console.error('outer', err.message);
    //     throw err;

    // }


    // },[TName]);

    // useEffect(()=>{
    // const setNewMatchNum = () => {

    //         if (lastMatchData.length!=0) {    
    //             console.log('LastMatchFound:',lastMatchData[0].MatchNo);
                
    //                 setNewMatch(lastMatchData[0].MatchNo+1);
    //             }
    //             else {console.log('No Matches'); setNewMatch(1)}

    //     }
    // setNewMatchNum();

    // },[getLastMatchNum]);

    

    const renderItem = ({item}) => (   
            <View  style={Styles.TextStyle}>
               <Text> {item.MatchNo} {item.Player1} {item.Player2}  </Text>
               <Text>Winner: {item.Winner} Winner Profit: {item.WinnerProfit} </Text>                  
            </View>
        );   
    const ContentThatGoesAboveTheFlatList = () =>(
        <View>
            <Text style={Styles.TextStyle}>This is an active Tournament Board Screen</Text>            
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding:5
                    }}>
                    <Text> Set Player 1: </Text>
                    <Picker style={{ flex: 1 }}
                        selectedValue={Pl1_selected}
                        onValueChange={(Item)=>(Player1Val(Item))}
                        > 
                        {arrPlayers.map((items,idx)=>(
                            <Picker.Item 
                            key={idx}
                            label={items}
                            value={items}/>
                            ))}
                    </Picker>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding:5
                    }}>
                    <Text> Set Player 2: </Text>
                    <Picker style={{ flex: 1 }}
                        selectedValue={Pl2_selected}
                        onValueChange={(Item)=>( Player2Val(Item) )}> 
                        {arrPlayers.map((items,idx)=>(
                            <Picker.Item 
                            key={idx}
                            label={items}
                            value={items}/>
                            ))}
                    </Picker>                
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding:5
                    }}>
                    <Text> Choose Winner: </Text>
                    <Picker style={{ flex: 1 }}
                        selectedValue={Win_selected}
                        onValueChange={(Item)=>(setWin(Item))}> 
                        {[Pl1_selected,Pl2_selected].map((items,idx)=>(
                            <Picker.Item 
                            key={idx}
                            label={items}
                            value={items}/>
                            ))}
                    </Picker>                
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding:5
                }}>


                    <Text> Flawless Victory: </Text>
                    
                    <Checkbox
                        style={Styles.checkbox}
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#4630EB' : undefined}
                    />
            </View>

            <View>
                <Button title='Submit Match Result' onPress={SumbitMatchRes}> </Button>
                <Text> Played Matches </Text>

            
            </View>  
        </View>

    );

    const ContentThatGoesBelowTheFlatList = () => (
        <View>
            <Button title="See Tournament Results" onPress={()=>navigation.navigate('Tres',{TName})}/>
        </View>

    );

    return ( 
        <View>
         <SafeAreaView >                            
            <FlatList 
            data={matches}
            ListHeaderComponent={ContentThatGoesAboveTheFlatList}
            ListFooterComponent={ContentThatGoesBelowTheFlatList}
            renderItem={renderItem}
            keyExtractor={item=>item.MatchNo}
            numColumns={1}            
            />                                         
         </SafeAreaView>
         </View>       

        
    )
}

const Styles = StyleSheet.create(
    {
        TextStyle:{
            fontSize: 16,
            color: 'red'

        },
        checkbox: {
            margin: 8,
          }
    }

)

export default Atourn