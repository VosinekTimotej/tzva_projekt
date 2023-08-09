import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../../ThemeContext';
import DarkTheme from '../../DarkTheme';
import LightTheme from '../../LightTheme';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';

const Header = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    const {t, i18n} = useTranslation();
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor  }]}>
            <View style={styles.backContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image 
                        style={styles.backLogo} 
                        source={theme.backSource}
                    />
                </TouchableOpacity>
            </View>
            <Text style={[styles.text, { color: theme.textColor }]}>{t("Dohodki")}</Text>
            <View></View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container:{
        paddingTop: 5,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 0,
        justifyContent:'space-between',
        borderBottomWidth: 1,
    },
    backLogo:{
        width: 30,
        height: 40,
        resizeMode: 'contain',
        paddingBottom: 10,
    },
    text:{
        fontSize: 16,
        fontWeight: 'bold'
    },
})