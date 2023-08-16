import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext , useState, useEffect} from 'react'
import { TRANSAKCIJE } from '../data/Transakcije'
import Header from '../components/Odhodki/Header'
import Transakcija from '../components/Transakcije/Transakcija'
import ThemeContext from '../ThemeContext'
import DarkTheme from '../DarkTheme'
import LightTheme from '../LightTheme'
import {useTranslation} from 'react-i18next';
import '../assets/i18n/i18n';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IP} from "@env"
const apiURL = 'http:'+process.env.IP+':5000' 

const OdhodkiScreen = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    const {t, i18n} = useTranslation();

    let dohodki = 0;
    TRANSAKCIJE.forEach((tr)=>{
        if(tr.type === "cost"){
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
            if(tr.type === "cost"){
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

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.backgroundColor}]}>
            <Header navigation={navigation}/>
            <Text style={[styles.heading, { color: theme.textColor }]} >{t("Odhodki")}</Text>
            <Text style={[styles.text, { color: theme.textColor }]} >{t("Skupni odhodki")}: {value}</Text>
            
        </ScrollView>
    )
}

export default OdhodkiScreen

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