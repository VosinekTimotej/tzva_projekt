import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { TRANSAKCIJE } from '../data/Transakcije'
import Header from '../components/Dohodki/Header'
import Transakcija from '../components/Transakcije/Transakcija'
import ThemeContext from '../ThemeContext'
import DarkTheme from '../DarkTheme'
import LightTheme from '../LightTheme'
import DohodkiGraf from '../components/Dohodki/DohodkiGraf'
import {useTranslation} from 'react-i18next';
import '../assets/i18n/i18n';
import * as ScreenOrientation from "expo-screen-orientation";

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IP} from "@env"
const apiURL = 'http:'+process.env.IP+':5000' 
const DohodkiScreen = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    const {t, i18n} = useTranslation();

    let dohodki = 0;
    TRANSAKCIJE.forEach((tr)=>{
        if(tr.type === "income"){
            dohodki = dohodki + tr.value
        }
    })

    const [transakcije, setTransakcije] = useState([]);
    const [kategorije, setKategorije] = useState([]);
    const [value, setValue] = useState(0)



    // se pozene ko se nalozi screen
    useEffect(() => {
        const fetchTransakcije = async () => {
            try {
                getTransakcije()
            } catch (error) {
                console.error('Error fetching transakcije:', error);
            }
        };
        const fetchCategories = async () => {
            try {
                getCategories();
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchTransakcije();
        fetchCategories();
    }, []);

    const getTransakcije = async () =>{
        try {
            const token = await AsyncStorage.getItem('userToken');
            const acc = await AsyncStorage.getItem('activeAcc');
            const headers = {
                Authorization: `${token}`, 
                // Account: `${acc}`
            };

            // const response = await axios.get(`${apiURL}/transactions`, { headers });
            const response = await axios.get(`${apiURL}/transactions/acc/${acc}`, { headers });
            setTransakcije(response.data.transakcije)
            let dohodki = 0;
            response.data.transakcije.forEach((tr)=>{
            if(tr.type === "income"){
                dohodki = dohodki + tr.value
            }
            setValue(dohodki)
            console.log(dohodki)
    })
        } catch (error) {
            console.log('Error: ', error)
            
        }
    }

    const getCategories = async () =>{
        try {
            const token = await AsyncStorage.getItem('userToken');
            const headers = {
                Authorization: `${token}` 
            };
            const response = await axios.get(`${apiURL}/users/category`, { headers });

            const cats = response.data
            setKategorije(cats)
        } catch (error) {
            console.log('Error: ', error)
            Alert.alert('Error', 'Something went wrong with getting categories!');
        }
        
    }


    const [orientation, setOrientation] = useState(null);
    useEffect(() => {
      checkOrientation();
      const subscription = ScreenOrientation.addOrientationChangeListener(
        handleOrientationChange
      );
      return () => {
        ScreenOrientation.removeOrientationChangeListeners(subscription);
      };
    }, []);
    const checkOrientation = async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();
      setOrientation(orientation);
    };
    const changeOrientation = async (newOrientation) => {
      console.log("newOrientation: ", newOrientation);
      await ScreenOrientation.lockAsync(newOrientation);
    };
    const handleOrientationChange = (o) => {
      setOrientation(o.orientationInfo.orientation);
    };


    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.backgroundColor}]}>
            <Header navigation={navigation}/>
            <Text style={[styles.heading, { color: theme.textColor }]} >{t("Dohodki")}</Text>
            <Text style={[styles.text, { color: theme.textColor }]} >{t("Skupni dohodki")}: {value}</Text>
            
            
            <TouchableOpacity
                style={[styles.container, { marginTop: 15 }]}
                onPress={() =>
                changeOrientation(ScreenOrientation.OrientationLock.PORTRAIT_UP)
                }
            >
                <Text style={styles.text}>{t("Spremeni orientacijo v portret.")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.container}
                onPress={() =>
                changeOrientation(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
                }
            >
                <Text style={styles.text}>{t("Spremeni orientacijo v pokrajina.")}</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

export default DohodkiScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading:{
        paddingTop: 10,
        paddingLeft: 5,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text:{
        paddingTop: 40,
        paddingLeft: 5,
        fontSize: 20,
        //fontWeight: 'bold',
        textAlign: 'center',
    },
})