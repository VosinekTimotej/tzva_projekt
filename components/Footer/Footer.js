import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../../ThemeContext';
import DarkTheme from '../../DarkTheme';
import LightTheme from '../../LightTheme';
import { useRoute } from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';

const Footer = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    const route = useRoute();
    const {t, i18n} = useTranslation();

    const barvaT = (route.name === "TransakcijeScreen") ? "grey" : "white"
    const barvaS = (route.name === "StanjeScreen") ? "grey" : "white"
    const barvaK = (route.name === "KategorijeScreen") ? "grey" : "white"
    
    

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor  }]}>
            <View style={[styles.box, { backgroundColor: barvaS}]} >
            <TouchableOpacity onPress={() => navigation.push('SettingsScreen')}>
            <Text style={[styles.text, { color: theme.textColor }]}>{t("Stanje")}</Text>
            </TouchableOpacity>
            </View>
            <View style={[styles.box, { backgroundColor: barvaT}]}>
            <TouchableOpacity onPress={() => navigation.push('TransakcijeScreen')}>
            <Text style={[styles.text, { color: theme.textColor }]}>{t("Transakcije")}</Text>
            </TouchableOpacity>
            </View>
            <View style={[styles.box, { backgroundColor: barvaK}]}>
            <TouchableOpacity onPress={() => navigation.push('KategorijeScreen')}>
            <Text style={[styles.text, { color: theme.textColor}]}>{t("Kategorija")}</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 0,
        justifyContent:'space-evenly',
        
    },
    box:{
        width:"33%",
        alignItems: 'center',
        paddingBottom: 20 ,
        paddingTop: 20 ,
    },

    backLogo:{
        width: 30,
        height: 40,
        resizeMode: 'contain',
        paddingBottom: 10,
    },
    text:{
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: "center",
    },
})