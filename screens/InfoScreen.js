import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Header from '../components/Info/Header'
import ThemeContext from '../ThemeContext';
import LightTheme from '../LightTheme';
import DarkTheme from '../DarkTheme';

const InfoScreen = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor}]}>
            <Header navigation={navigation}/>
            <Text style={[styles.text, { color: theme.textColor }]} >Aplikacija je namenjena za spremljanje osebnih financ.</Text>
        </View>
    )
}

export default InfoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text:{
        paddingTop: 10,
        paddingLeft: 5,
    },
})