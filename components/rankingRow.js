import { isReactNative } from "@firebase/util";
import React from "react";
import { Text, View, StyleSheet } from 'react-native';

const  Row = ({item}) => { 
return ( <View>
       <Text style={styles.TextStyle}>   {item.Rank} {item.Name} {item.Score} {item.LastChange}</Text>
</View>
    
);
}
// <Text style= {[styles.TextStyle, { padding: 15 }, {alignSelf: 'stretch'}, {textAlign:'center'}] }> {item.Rank}  {item.Name}  {item.Score} {item.LastChange};</Text>
const styles = StyleSheet.create(
    {
        TextStyle:{
            color: 'blue',
            fontSize: 14,
            padding: 16
        }
    }
)
export default Row;
