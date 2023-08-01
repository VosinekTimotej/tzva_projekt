import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../../ThemeContext';
import LightTheme from '../../LightTheme';
import DarkTheme from '../../DarkTheme';

const Meja = ({meja}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    const barva = (meja.max - meja.curr)< 10 ? "red": ((meja.max - meja.curr)< 100 ? "orange": "green");
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor, borderRightColor:  barva, borderRightWidth: 10 }]}>
            <Text style={{color: theme.textColor}}>ID: {meja.id}</Text>
            <Text style={[styles.ime,{color: theme.textColor}]}>Name: {meja.name}</Text>
            <Text style={{color: theme.textColor}}>Max: {meja.max}</Text>
            <Text style={{color: theme.textColor}}>Curr: {meja.curr}</Text>
            <Text style={{color: theme.textColor}}>Diff: {meja.max - meja.curr}</Text>
        </View>
    )
}

export default Meja

const styles = StyleSheet.create({
    container:{
        borderBottomWidth: 1,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
    },
    ime:{
        fontSize: 16,
        fontWeight: 'bold'
    },
})