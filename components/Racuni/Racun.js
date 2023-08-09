import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../../ThemeContext';
import DarkTheme from '../../DarkTheme';
import LightTheme from '../../LightTheme';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';

const Racun = ({racun}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    const {t, i18n} = useTranslation();
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
            <Text style={[styles.imeRacuna,{color: theme.textColor}]}>{t("Ime računa")}: {racun.name}</Text>
            <Text style={{color: theme.textColor}}>{t("Stanje")}: {racun.stanje}</Text>
            <Text style={{color: theme.textColor}}>ID: {racun.id}</Text>
            <Text style={{color: theme.textColor}}>{t("Lastnik")} ID:{racun.lastnik_id}</Text>
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