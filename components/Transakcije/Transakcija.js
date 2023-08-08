import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import ThemeContext from '../../ThemeContext';
import DarkTheme from '../../DarkTheme';
import LightTheme from '../../LightTheme';

const Transakcija = ({transakcija, handlePress}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? DarkTheme : LightTheme;
  const formattedDate = new Date(transakcija.date).toLocaleDateString('en-GB');
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
        <TouchableOpacity key={transakcija.id} onPress={() => handlePress(transakcija)}>
          <Text style={{color: theme.textColor}}>Date: {formattedDate}</Text>
          {/* <Text style={{color: theme.textColor}}>Id: {transakcija.id}</Text> */}
          <Text style={{color: theme.textColor}}>Value: {transakcija.value}</Text>
          {/* <Text style={{color: theme.textColor}}>Type: {transakcija.type}</Text> */}
          <Text style={{color: theme.textColor}}>Category: {transakcija.category}</Text>
          {/* <Text style={{color: theme.textColor}}>Comment: {transakcija.comment}</Text> */}
        </TouchableOpacity>
        
    </View>
  )
}

export default Transakcija

const styles = StyleSheet.create({
    container:{
        // marginBottom: 10,
        // marginTop: 10,
        borderBottomWidth: 1,
        // borderBottomColor: '#000',
    },
})