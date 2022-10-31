import * as React from 'react';
//import {TouchableOpacity} from "react=native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import RankingScreen from './screens/RankingScreen';
import PlayerScreen from './screens/PlayerScreen';
import TournScreen from './screens/TournScreen';
import NewTournScreen from './screens/NewTournScreen';
import ActiveTournScreen from './screens/ActiveTournScreen';
import TournResultScreen from './screens/TournResultScreen';
import LoginScreen from './screens/LoginScreen';
import { LogBox, Button, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import 'expo-dev-client';


const Stack = createStackNavigator();

function App() {

  LogBox.ignoreLogs([
    'Setting a timer'
  ]);


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}
          options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen}/>         
        <Stack.Screen name="Ranking" component={RankingScreen} options={(props)=>({
          // Add a placeholder button without the `onPress` to avoid flicker
          headerLeft: () => 
          <TouchableOpacity 
            onPress={()=> props.navigation.navigate("Home")}
            style={{height:20, width: 20}}

          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          
        
        })} />
        <Stack.Screen name="Player" component={PlayerScreen}/>
        <Stack.Screen name="Tourn" component={TournScreen} options={{title: null}}/>
        <Stack.Screen name="Newtourn" component={NewTournScreen} options={{title: null}}/>
        <Stack.Screen name="Atourn" component={ActiveTournScreen} options={{title: null}}/>
        <Stack.Screen name="Tres" component={TournResultScreen} options={{title: null}}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}
  

export default App;
