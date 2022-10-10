import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import RankingScreen from './screens/RankingScreen';
import PlayerScreen from './screens/PlayerScreen';
import TournScreen from './screens/TournScreen';
import NewTournScreen from './screens/NewTournScreen';
import ActiveTournScreen from './screens/ActiveTournScreen';
import TournResultScreen from './screens/TournResultScreen';
import { LogBox } from 'react-native';


const Stack = createStackNavigator();

function App() {

  LogBox.ignoreLogs([
    'Setting a timer'
  ]);


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/> 
        <Stack.Screen name="Ranking" component={RankingScreen}/>
        <Stack.Screen name="Player" component={PlayerScreen}/>
        <Stack.Screen name="Tourn" component={TournScreen}/>
        <Stack.Screen name="Newtourn" component={NewTournScreen}/>
        <Stack.Screen name="Atourn" component={ActiveTournScreen}/>
        <Stack.Screen name="Tres" component={TournResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
  

export default App;
