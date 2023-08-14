import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../ThemeContext';
import DarkTheme from '../DarkTheme';
import LightTheme from '../LightTheme';
import Header from '../components/Kategorije/Header';

import { KATEGORIJE } from '../data/Kategorije';
import Kategorija from '../components/Kategorije/Kategorija';
import AddKategorija from '../components/Kategorije/AddKategorija';
import Footer from '../components/Footer/Footer';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IP} from "@env"

const apiURL = 'http:'+process.env.IP+':5000' // Rok

//TODO kategorija podrobno
// button delete category
// Ce vredu vrne kategorije ko jih get
// edit category

const KategorijeScreen = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;

    const [isVisible, setIsVisible] = useState(false);

    const [kategorije, setKategorije] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                getCategories();
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    // get categories
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

    const handleAddKategorija = (data) => {
        console.log('New data:', data);
        setIsVisible(false);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Header navigation={navigation} onAddButtonPress={() => setIsVisible(true)} />
            <ScrollView>
                {kategorije.map((kategorija, index) => (
                    <Kategorija kategorija={kategorija} key={kategorija._id} />
                ))}
            </ScrollView>
            <AddKategorija 
                isVisible={isVisible}
                onClose={()=>setIsVisible(false)}
                onSubmit={handleAddKategorija}
            />
            <Footer navigation={navigation}/>
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