import { StyleSheet, Text, View, Switch, TouchableOpacity  } from 'react-native'
import React, { useContext } from 'react';
import ThemeContext from '../ThemeContext';
import Header from '../components/Settings/Header';
import LightTheme from '../LightTheme';
import DarkTheme from '../DarkTheme';

//TODO Footer 

const SettingsScreen = ({navigation}) => {

    const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;

    return (
        <View style={[{flex: 1, backgroundColor: theme.backgroundColor}]}>
            <Header navigation={navigation} />
            <View style={[{ backgroundColor: theme.backgroundColor }]}>
            <TouchableOpacity onPress={()=>{ console.log('Spremeni osebne podatke')}} style={[{ backgroundColor: theme.backgroundColor }]}>
                <View style={[styles.settingContainer, {backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
                    <Text style={[styles.text, { color: theme.textColor }]}>Uporabnikovi podatki</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{ console.log('Spremeni geslo')}}>
                <View style={[styles.settingContainer, {backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
                    <Text style={[styles.text, { color: theme.textColor }]}>Spremeni geslo</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{ console.log('Racuni')}}>
                <View style={[styles.settingContainer, {backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
                    <Text style={[styles.text, { color: theme.textColor }]}>Racuni</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{ console.log('Nastavi meje')}}>
                <View style={[styles.settingContainer, {backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
                    <Text style={[styles.text, { color: theme.textColor }]}>Nastavljanje mej</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{ console.log('Nastavi valuto')}}>
                <View style={[styles.settingContainer, {backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
                    <Text style={[styles.text, { color: theme.textColor }]}>Spreminjanje valute</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleTheme}>
                <View style={[styles.settingContainer, {backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
                    { isDarkTheme? 
                        <Text style={[styles.text, { color: theme.textColor }]}>Dark Theme</Text>: 
                        <Text style={[styles.text, { color: theme.textColor }]}>Light Theme</Text>
                    }
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{ console.log('Informacije')}}>
                <View style={[styles.settingContainer, {backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
                    <Text style={[styles.text, { color: theme.textColor }]}>Informacije</Text>
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