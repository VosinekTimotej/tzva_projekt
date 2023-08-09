import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../../ThemeContext';
import LightTheme from '../../LightTheme';
import DarkTheme from '../../DarkTheme';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';

const Meja = ({meja}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    const barva = (meja.max - meja.curr)< 10 ? "red": ((meja.max - meja.curr)< 100 ? "orange": "green");
    const {t, i18n} = useTranslation();
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor, borderRightColor:  barva, borderRightWidth: 10 }]}>
            <Text style={{color: theme.textColor}}>ID: {meja.id}</Text>
            <Text style={[styles.ime,{color: theme.textColor}]}>{t("Ime")}: {meja.name}</Text>
            <Text style={{color: theme.textColor}}>{t("Max")}: {meja.max}</Text>
            <Text style={{color: theme.textColor}}>{t("Trenutno")}: {meja.curr}</Text>
            <Text style={{color: theme.textColor}}>{t("Razlika")}: {meja.max - meja.curr}</Text>
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