import React, { useContext, useState } from 'react'
import DarkTheme from '../DarkTheme';
import LightTheme from '../LightTheme';
import Header from '../components/Kategorije/Header';
import { SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import ThemeContext, { ThemeProvider } from '../ThemeContext';
import {useTranslation} from 'react-i18next';
import '../assets/i18n/i18n';



//temporary screen za testiranje

const JezikScreen = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;

    const {t, i18n} = useTranslation();
  
    const [currentLanguage,setLanguage] =useState(i18n.language);
    
    const changeLanguage = value => {
      i18n
        .changeLanguage(value)
        .then(() => setLanguage(value))
        .catch(err => console.log(err));
    };

  

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Header navigation={navigation}></Header>
            <View>
        
        <Pressable
            onPress={() => changeLanguage('en')}
            style={{
              backgroundColor:
                currentLanguage === 'en' ? '#33A850' : '#d3d3d3',
              padding: 20,
            }}>
            <Text>English</Text>
          </Pressable>
          <Pressable
            onPress={() => changeLanguage('si')}
            style={{
              backgroundColor:
                currentLanguage === 'si' ? '#33A850' : '#d3d3d3',
              padding: 20,
            }}>
            <Text>Slovenščina</Text>
          </Pressable>
        </View>
        </View>
    )
}

export default JezikScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
})