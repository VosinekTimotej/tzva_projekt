import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { TRANSAKCIJE } from '../data/Transakcije'
import Header from '../components/Odhodki/Header'
import Transakcija from '../components/Transakcije/Transakcija'
import ThemeContext from '../ThemeContext'
import DarkTheme from '../DarkTheme'
import LightTheme from '../LightTheme'
import {useTranslation} from 'react-i18next';
import '../assets/i18n/i18n';

const OdhodkiScreen = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    const {t, i18n} = useTranslation();

    let dohodki = 0;
    TRANSAKCIJE.forEach((tr)=>{
        if(tr.type === "cost"){
            dohodki = dohodki + tr.value
        }
    })

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.backgroundColor}]}>
            <Header navigation={navigation}/>
            <Text style={[styles.heading, { color: theme.textColor }]} >{t("Odhodki")}</Text>
            <Text style={[styles.text, { color: theme.textColor }]} >{t("Skupni odhodki")}: {dohodki}</Text>
            
        </ScrollView>
    )
}

export default OdhodkiScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading:{
        paddingTop: 10,
        paddingLeft: 5,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text:{
        paddingTop: 40,
        paddingLeft: 5,
        fontSize: 20,
        //fontWeight: 'bold',
        textAlign: 'center',
    },
})