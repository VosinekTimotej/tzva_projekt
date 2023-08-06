import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../../ThemeContext';
import DarkTheme from '../../DarkTheme';
import LightTheme from '../../LightTheme';

const Racun = ({racun}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
            <Text style={[styles.imeRacuna,{color: theme.textColor}]}>Ime racuna: {racun.name}</Text>
            <Text style={{color: theme.textColor}}>Stanje: {racun.balance}</Text>
            <Text style={{color: theme.textColor}}>ID: {racun._id}</Text>
            <Text style={{color: theme.textColor}}>Lastnik ID:{racun.user_id}</Text>
        </View>
    )
}

export default Racun

const styles = StyleSheet.create({
    container:{
        borderBottomWidth: 1,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
    },
    imeRacuna:{
        fontSize: 16,
        fontWeight: 'bold'
    },
})