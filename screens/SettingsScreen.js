import { StyleSheet, Text, View, Switch, TouchableOpacity, Alert  } from 'react-native'
import React, { useContext } from 'react';
import ThemeContext from '../ThemeContext';
import Header from '../components/Settings/Header';
import LightTheme from '../LightTheme';
import DarkTheme from '../DarkTheme';

import AsyncStorage from '@react-native-async-storage/async-storage';


import {useTranslation} from 'react-i18next';
import '../assets/i18n/i18n';


//TODO Footer 

const SettingsScreen = ({navigation}) => {

    const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    const {t, i18n} = useTranslation();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
        
            navigation.navigate('LoginScreen');
        } catch (error) {
            console.error('Error during logout:', error);
            Alert.alert('Error', 'Something went wrong with logging out!');
        }
    };

    return (
        <View style={[{flex: 1, backgroundColor: theme.backgroundColor}]}>
            <Header navigation={navigation} />
            <View style={[{ backgroundColor: theme.backgroundColor }]}>
            <TouchableOpacity onPress={()=>{ navigation.push('UserInfoScreen')}} style={[{ backgroundColor: theme.backgroundColor }]}>
                <View style={[styles.settingContainer, {backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
                    <Text style={[styles.text, { color: theme.textColor }]}>{t("Uporabnikovi podatki")}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{ navigation.push('PasswordChangeScreen')}}>
                <View style={[styles.settingContainer, {backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
                    <Text style={[styles.text, { color: theme.textColor }]}>{t("Spremeni geslo")}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.push('RacuniScreen')}>
                <View style={[styles.settingContainer, {backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
                    <Text style={[styles.text, { color: theme.textColor }]}>{t("Računi")}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{ navigation.push('MejeScreen')}}>
                <View style={[styles.settingContainer, {backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
                    <Text style={[styles.text, { color: theme.textColor }]}>{t("Nastavljanje mej")}</Text>
                </View>
            </TouchableOpacity>

            

            <TouchableOpacity onPress={toggleTheme}>
                <View style={[styles.settingContainer, {backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
                    { isDarkTheme? 
                        <Text style={[styles.text, { color: theme.textColor }]}>{t("Temen način")}</Text>: 
                        <Text style={[styles.text, { color: theme.textColor }]}>{t("Svetel način")}</Text>
                    }
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{ navigation.push('InfoScreen')}}>
                <View style={[styles.settingContainer, {backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
                    <Text style={[styles.text, { color: theme.textColor }]}>{t("Informacije")}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{ navigation.push('DohodkiScreen')}}>
                <View style={[styles.settingContainer, {backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
                    <Text style={[styles.text, { color: theme.textColor }]}>{t("Dohodki")}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{ navigation.push('OdhodkiScreen')}}>
                <View style={[styles.settingContainer, {backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
                    <Text style={[styles.text, { color: theme.textColor }]}>{t("Odhodki")}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{ navigation.push('JezikScreen')}}>
                <View style={[styles.settingContainer, {backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
                    <Text style={[styles.text, { color: theme.textColor }]}>{t("Jezik")}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout}>
                <View style={[styles.settingContainer, {backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
                    <Text style={[styles.text, { color: theme.textColor }]}>{t("Odjava")}</Text>
                </View>
            </TouchableOpacity>
            </View>            
        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    settingContainer:{
        paddingTop: 15,
        paddingBottom:15,
        borderBottomWidth: 1,
        paddingLeft: 10,
    },
    text:{
        fontSize: 16,
    },
})