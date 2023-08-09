import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../../ThemeContext';
import DarkTheme from '../../DarkTheme';
import LightTheme from '../../LightTheme';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';


const Racun = ({racun, activeAccount, onAccountPress, onDeletePress}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;

    const isActiveAccount = racun._id === activeAccount;
    // console.log('tukaj', isActiveAccount)

    const handlePress = async () => {
        // console.log(racun._id); 
        onAccountPress(racun._id)
        await AsyncStorage.setItem('activeAcc', racun._id);
    };

    const handleDelete = () => {
        if(racun._id === activeAccount){
            Alert.alert('Error', 'This is activated account!');
            return;
        }
        onDeletePress(racun._id)
        // console.log(racun._id); 
    }
    
    const {t, i18n} = useTranslation();
  
    return (
        <View style={[styles.container, 
                    { backgroundColor: theme.backgroundColor, 
                        borderBottomColor: theme.borderBottomColor, 
                        borderRightWidth: isActiveAccount ? 10 : 0,
                        borderRightColor: isActiveAccount ? 'green' : 'transparent', 
                        
                    }]}
        >
            <TouchableOpacity onPress={handlePress}>
                <Text style={[styles.imeRacuna,{color: theme.textColor}]}>{t("Ime računa")}: {racun.name}</Text>
                <Text style={{color: theme.textColor}}>{t("Stanje")}: {racun.balance}</Text>
                <Text style={{color: theme.textColor}}>ID: {racun._id}</Text>
                <Text style={{color: theme.textColor}}>{t("Lastnik")} ID:{racun.user_id}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
                <Image 
                    style={[styles.delete, {margin: isActiveAccount ? 10 : 20,}]} 
                    source={theme.deleteSource}
                />
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
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    imeRacuna:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    delete:{
        width: 30,
        height: 40,
        resizeMode: 'contain',
        paddingBottom: 10,
        marginTop: 20,
        marginBottom: 20
    },
})