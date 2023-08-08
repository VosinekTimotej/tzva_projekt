import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../../ThemeContext';
import DarkTheme from '../../DarkTheme';
import LightTheme from '../../LightTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Racun = ({racun, activeAccount, onAccountPress}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    const isActiveAccount = racun._id === activeAccount;
    // console.log('tukaj', isActiveAccount)

    const handlePress = async () => {
        
        // console.log(racun._id); 
        onAccountPress(racun._id)
        await AsyncStorage.setItem('activeAcc', racun._id);
    };

    return (
        <View style={[styles.container, 
                    { backgroundColor: theme.backgroundColor, 
                        borderBottomColor: theme.borderBottomColor, 
                        borderRightWidth: isActiveAccount ? 10 : 0,
                        borderRightColor: isActiveAccount ? 'green' : 'transparent', }]}
        >
            <TouchableOpacity onPress={handlePress}>
                <Text style={[styles.imeRacuna,{color: theme.textColor}]}>Ime racuna: {racun.name}</Text>
                <Text style={{color: theme.textColor}}>Stanje: {racun.balance}</Text>
                <Text style={{color: theme.textColor}}>ID: {racun._id}</Text>
                <Text style={{color: theme.textColor}}>Lastnik ID:{racun.user_id}</Text>
            </TouchableOpacity>
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