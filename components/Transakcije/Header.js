import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import ThemeContext from '../../ThemeContext';
import DarkTheme from '../../DarkTheme';
import LightTheme from '../../LightTheme';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';

const Header = ({navigation, addPress}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    const {t, i18n} = useTranslation();
  
 
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={addPress}>
                    <Image
                            style={styles.logoImg} 
                            source={theme.logoSource}
                        />
                </TouchableOpacity>
            </View>
            <Text style={[styles.text, { color: theme.textColor }]}>{t("Transakcije")}</Text>
            <View>
                <TouchableOpacity onPress={() => navigation.push('SettingsScreen')}>
                    <Image 
                        style={styles.logoImg}
                        source={theme.settingsSource}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container:{
        // paddingTop: StatusBar.currentHeight || 0,
        paddingTop: 5,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 0,
        justifyContent:'space-between',
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    logoImg:{
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    text:{
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
})