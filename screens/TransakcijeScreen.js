import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { TRANSAKCIJE } from '../data/Transakcije'
import Header from '../components/Transakcije/Header'
import Transakcija from '../components/Transakcije/Transakcija'
import ThemeContext from '../ThemeContext'
import DarkTheme from '../DarkTheme'
import LightTheme from '../LightTheme'

//TODO Footer 

const TransakcijeScreen = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}> 
            <Header navigation={navigation}/>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {TRANSAKCIJE.map((transakcija, index) => (
                    <Transakcija transakcija={transakcija} key={transakcija.id}  />
                ))}
            </ScrollView>
        </View>
    )
}

export default TransakcijeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
})