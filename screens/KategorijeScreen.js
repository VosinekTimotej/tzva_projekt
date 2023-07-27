import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../ThemeContext';
import DarkTheme from '../DarkTheme';
import LightTheme from '../LightTheme';
import Header from '../components/Kategorije/Header';

import { KATEGORIJE } from '../data/Kategorije';
import Kategorija from '../components/Kategorije/Kategorija';


//TODO Footer 

const KategorijeScreen = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Header navigation={navigation} />
            <ScrollView>
                {KATEGORIJE.map((kategorija, index) => (
                    <Kategorija kategorija={kategorija} key={kategorija.id} />
                ))}
            </ScrollView>
        </View>
    )
}

export default KategorijeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
})