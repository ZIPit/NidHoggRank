import React, {useEffect, useState} from "react";
import {FlatList, TouchableOpacity, TextInput, Alert, Button, StyleSheet, Text, View, StatusBar, ScrollView, SafeAreaView} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {db} from "../firebase";
import {collection , getDocs, query,orderBy, limit} from "@firebase/firestore";
import { doc, setDoc } from "firebase/firestore";





const Importancy = ['Easy-peasy', 'Medium', 'World Class']; 
let imp;


const NewTournScreen = (props) => {
    
    const usersCollectionRef = collection(db,"Players");

    const [Playerslist,setPlayer] = useState([]);
    const [users, setUsers] = useState([]);
    
    const [selectedImpVal,setImpValue] = useState(Importancy[0]);
    
    const [textInput, onChangeText] = React.useState("");

    const [textInput2, onChangeText2] = React.useState("");

    const [selectedValue,setSelValue] = useState();

    const [isValidated,setValid] = useState(false);
      
    useEffect(()=>{    
        const getUsers = async () => {
            try{
        const q = query(usersCollectionRef, orderBy("Rank"));
        const data = await getDocs(q);
        setUsers(data.docs.map((doc) => ({...doc.data()} )));    
   console.log('yahoo');
    
            } catch (err) {
                console.error(err.message);
            } 
    };
        getUsers();
              
    },[]);    

useEffect(()=>{    
    if (users.length !== 0) {
        console.log('Users Array have been set. Can be used now');     
        setSelValue(users[0].Name);

    }
    
},[users]);  
    

const addPlayer= () => {
        
    if (!Playerslist.includes(selectedValue) )  {        
            setPlayer([...Playerslist,selectedValue]);        
    }
    else {
        Alert.alert('oops',selectedValue +' is already in list');
    }
        
} 

const remPlayer= (item) =>{
    const newPeople = Playerslist.filter((person) => person !== item);
    setPlayer(newPeople);
}

useEffect(()=>{
    const inputvalidate = () => {
        if (textInput && textInput!=="" && Playerslist.length>=2){
            setValid(true);
            console.log('TRUE',Playerslist);
        }
        else {
            console.log('FALSE',Playerslist);
            setValid(false);
        }
    
    
    }    
inputvalidate();
},[textInput, Playerslist])

let today = new Date().toLocaleDateString();
const createTournament = async () => {
  
   switch (selectedImpVal)  {
       case 'Easy-peasy': 
            imp=0.4;
             break;
       case 'Medium':
            imp=0.5;
            break;
        case 'World Class':
            imp=0.6;
            break;
   }

   try {
   // Add a new document in collection
  await  setDoc(doc(db, "Tournaments", textInput), {
    Participants: Playerslist,
    Name: textInput,
    Status: 0, 
    Date: today,
    Coeff: imp,
    Importancy: selectedImpVal ,
    StatusName: 'Active'
  });
   } catch (err) {
       console.error(err.message);
   } finally {
       console.log('New Doc has been Added');
   };
  props.navigation.navigate('Atourn',{textInput,imp,Playerslist}); 
   
}

const renderItem = ({item})=>{
    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            padding:5
            }} > 
            <Text style={Styles.TextStyle}> {item} </Text>
            <TouchableOpacity style={Styles.Button} onPress={()=>{remPlayer(item)}}>
                <Text>Remove</Text>
            </TouchableOpacity>
            
        </View>
    );
}

const ContentThatGoesAboveTheFlatList = () =>(
    <View>
    <Text style={Styles.TitleStyle}> Select Players </Text>
    <View style={{
        flexDirection: "row",
        alignItems: "center",
        padding:5
        }} > 
        
        <Picker  style={{ flex: 1 }}
        selectedValue={selectedValue}
        onValueChange={(Item)=>(setSelValue(Item))}> 
        {users.map((users,idx)=>(
            <Picker.Item 
            key={idx}
            label={users.Name}
            value={users.Name}/>
            ))}
        </Picker>
        <TouchableOpacity style={Styles.Button}  onPress={addPlayer}>
                <Text style={Styles.AddRemBtnStyle}>Add to List</Text>
        </TouchableOpacity>


    </View>
    <Text style={Styles.TitleStyle}>  List Of Players</Text>
    </View>
);

const ContentThatGoesBelowTheFlatList = () => (
    <View>
       <Text style={Styles.TitleStyle}> Choose Importancy</Text>

<Picker 
    selectedValue={selectedImpVal}
    onValueChange={(Item)=>(setImpValue(Item))}> 
    {Importancy.map((items,idx)=>(
        <Picker.Item 
        key={idx}
        label={items}
        value={items}/>
        ))}
    </Picker>
<SafeAreaView>
<TextInput
style={Styles.input}
placeholder='Enter Name oF the Tournament'
onChangeText={onChangeText}
value={textInput}
/>
<TextInput
placeholder="Entersmth"
onChangeText={onChangeText2}
value={textInput2}
/>
</SafeAreaView>

<TouchableOpacity style={Styles.Button} disabled={isValidated ? false : true } onPress= {createTournament} >
        <Text style={Styles.AddRemBtnStyle}> Start Tournament</Text>
        </TouchableOpacity>    

    </View>

);

    return  (
        <View style={Styles.container}> 
            <SafeAreaView style={{ flex: 1 }}>
           
           
            <FlatList style={Styles.FlatListStyle}
            data={Playerslist}
            ListHeaderComponent={ContentThatGoesAboveTheFlatList}
            ListFooterComponent={ContentThatGoesBelowTheFlatList}
            renderItem={renderItem}
            keyExtractor={item=>item}/>
            
            


            </SafeAreaView>

        </View>
    );

}

const Styles = StyleSheet.create(
   

    {   container: {
        flex: 1,
        justifyContent:'center',
     //   backgroundColor:"#01A080",
        borderWidth:5,
        borderColor:"black"
       // alignItems:'center'
    },
        TextStyle:{
            flex:1,
            fontSize:14,
            fontWeight:'bold',
          //  margin:10,
            padding:10,
            backgroundColor:'lightskyblue',
            textAlign:'center'
        },
        Button: {
            alignItems: "center",
            backgroundColor: "#DDDDDD",
            padding: 10,
         //   height: 20,
            marginLeft:5,
            borderRadius:5
          },
        AddRemBtnStyle:{
            fontSize:14,
            fontWeight:"bold",
            color:"blue"
        },
        TitleStyle:{
            fontSize:18,
            alignItems:'center',
            color:'red',
            fontWeight:'bold',
            backgroundColor:'ivory',
            textAlign:'center'

        },
        FlatListStyle:{
            margin:15,
            
        },
        input: {
            height: 40,
            marginLeft: 5,
            marginBottom: 20,
            borderWidth: 1,
            padding: 10,
          },
        

        
        
        
    }
)

export default NewTournScreen