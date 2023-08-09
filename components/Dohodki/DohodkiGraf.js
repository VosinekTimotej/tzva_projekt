import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../../ThemeContext';
import DarkTheme from '../../DarkTheme';
import LightTheme from '../../LightTheme';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'
import { TRANSAKCIJE } from '../../data/Transakcije'
import { date } from 'yup';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';





const DohodkiGraf = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    const {t, i18n} = useTranslation();
    
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor}]}>
            <Text style={[styles.text, { color: theme.textColor }]} >{t("Graf Dohodkov")}</Text>
            
        </View>
    )
}

export default DohodkiGraf

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text:{
        paddingTop: 10,
        paddingLeft: 5,
    },
})