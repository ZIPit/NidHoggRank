import React, {useState,useEffect }  from "react";
import {Text, StyleSheet, View, SafeAreaView, FlatList, Button, Alert, TouchableOpacity} from "react-native";
import {db} from "../firebase";
import {collection , getDocs, query,orderBy, limit, updateDoc} from "@firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Tres=({route,navigation})=>
{
// const players = route.params.arrPlayers;
//const matches = route.params.matches;
const TName = route.params.TName;
//console.log(route.params.arrPlayers);

const textInput=TName; 
const usersCollectionRef = collection(db,"Players");
const [users, setUsers] = useState([]);

//-----------

const tournRef = collection(db,"Tournaments/"+TName+"/Matches");
const docRef = doc(db, "Tournaments", TName);
const [players, setArrPl]= useState([]);
const [Coeff, setCoeff] = useState(0.0);
const [status, setStatus] = useState(0)

const [matches, setMatches] = useState([]);
 // Getting data about Tournament Participants from the FB DB
 useEffect (()=> {
    const getTournData = async () => {
 
    
    const docSnap = await getDoc(docRef);
    let arr = docSnap.data().Participants;
    const b = docSnap.data().Coeff;
    const statusTmp = docSnap.data().Status;
   setArrPl(arr);
   setCoeff(b);
   setStatus(statusTmp);
    };
   
    
 getTournData(); 
 
},[TName]);
//

useEffect(()=>{
    const getMatchStats = async () => {
    const q = query(tournRef, orderBy("MatchNo"));        
    const data = await getDocs(q);
    setMatches(data.docs.map((doc) => ({...doc.data()})));       
    };
    getMatchStats();
   // console.log(matches);
},[TName]);


//-----------




useEffect(()=>{
    const getUsers = async () => {
    const q = query(usersCollectionRef, orderBy("Rank"));
    //const q = query(usersCollectionRef,orderBy("Rank"));
    const data = await getDocs(q);
    setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));    
    };
    getUsers();
    
},[])
//console.log(users);



//----- ResultArr - Calculating Summarized Toutnament Palyers resutls and assign it to the Array
 const resultArr = players.map(player=>{
    let profitdelta = 0;
    let win_count=0;
    let los_count=0;
    let flw_count=0;
    let place=0;
    matches.forEach(element => {
        if (player==element.Winner) {


                profitdelta=Math.round(((profitdelta+element.WinnerProfit) + Number.EPSILON) * 100) / 100;
                win_count++;
                if (element.FlawlessVictory) {flw_count++}
            }
        if (player==element.Loser) {            
                profitdelta=Math.round(((profitdelta+element.LoserLoss) + Number.EPSILON) * 100) / 100;
                los_count++;
            }
      
  });

 return {player,profitdelta,win_count,los_count,flw_count,place}
 } );


console.log(resultArr);

// define the Tournament winners
function compare2 (a,b) {
    if (a.win_count<b.win_count) {
        return 1;
    }
    if (a.win_count > b.win_count){
        return -1;
    }
    return 0;
} 
resultArr.sort(compare2);




console.log(resultArr);

//---- Updating  Players Score Data in Users Array
resultArr.forEach((user,index) => {
    user.place = index+1; // assign winners places

    let idx = users.findIndex(x => x.Name === user.player );
    if (idx!=-1){
        console.log(idx);
        users[idx].LastChange=user.profitdelta;
        users[idx].Score=Math.round(((users[idx].Score + user.profitdelta) + Number.EPSILON) * 100) / 100; 
        //users[idx].Score + user.profitdelta        
        //console.log(users[idx]);
    }
    

});

// Sorting "Users" Array , based on Players Score ------
function compare( a, b ) {
    if ( a.Score < b.Score ){
      return 1;
    }
    if ( a.Score > b.Score ){
      return -1;
    }
    return 0;
  }
  
  users.sort( compare );   

//--- Assigning Rank to the "Users" Array element 
  
  users.forEach((user,idx)=>{user.Rank = idx+1});  
  console.log(users);




const renderItem = ({item}) => (   
    <View  style={Styles.TextStyle}>
       <Text> {item.player} {item.win_count} {item.los_count} {item.flw_count} {item.profitdelta} </Text>
    </View>
);   




const submitChanges = async ()=> {
    const tournRef = doc(db,'Tournaments',TName);

    


    try {

    

    users.forEach((item)=>{
        const PlayerRef = doc(db,"Players",item.Name);
        const res2 =  updateDoc(PlayerRef, {
            "Rank": item.Rank,
            "Score": item.Score,
            "LastChange": item.LastChange
        });

    })

    const res = await updateDoc(tournRef,{
        Status: 1,
        StatusName: 'Completed',
        Results: resultArr
    });
    
    } catch (err) {
        console.error('outer', err.message);
                throw err;
    } finally{
        
        Alert.alert('OK', 'Ranking Changes to be applied now');
        navigation.navigate('Ranking');
    }
    
   // 
    
}
  
 return (
   
<View>
<Text> Result screen</Text>
<Text> Tournament name: {TName}</Text>
<Text> Tournament satus: {status===0?("Active"):("Completed")}</Text>
    <SafeAreaView >                            
            <FlatList 
            data={resultArr}            
            renderItem={renderItem}
            keyExtractor={item=>item.player}
            numColumns={1}            
            />                                         
    </SafeAreaView>

    <TouchableOpacity style={Styles.btn2Style} onPress={status===0?(submitChanges):(()=>navigation.goBack())} >
           <Text > {status===0?('Submit Tournament & Ranking changes'):('Daxi Kala')} </Text>
    
    </TouchableOpacity>

    

</View>
);
}
const Styles = StyleSheet.create({
    TextStyle: {
        color:"red"
    },

    btn2Style: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        elevation: 5,
        marginTop:30,
        marginHorizontal:50   
      },  
});

export default Tres;