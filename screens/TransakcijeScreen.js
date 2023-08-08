import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { TRANSAKCIJE } from '../data/Transakcije'
import Header from '../components/Transakcije/Header'
import Transakcija from '../components/Transakcije/Transakcija'
import ThemeContext from '../ThemeContext'
import DarkTheme from '../DarkTheme'
import LightTheme from '../LightTheme'
import PodrobnoTransakcija from '../components/Transakcije/PodrobnoTransakcija'
import AddTransakcijo from '../components/Transakcije/AddTransakcijo'

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiURL = 'http:192.168.1.12:5000' // Rok 

const TransakcijeScreen = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;

    // podrobno screen
    const [selected, setSelected] = useState(null);
    const [isVisiable, setIsVisible] = useState(false);

    // add modal
    const [isAddVisiable, setIsAddVisiable] = useState(false);

    const [transakcije, setTransakcije] = useState([]);

    // se pozene ko se nalozi screen
    useEffect(() => {
        const fetchTransakcije = async () => {
            try {
                getTransakcije()
            } catch (error) {
                console.error('Error fetching transakcije:', error);
            }
        };

        fetchTransakcije();
    }, []);

    const getTransakcije = async () =>{
        try {
            const token = await AsyncStorage.getItem('userToken');
            const acc = await AsyncStorage.getItem('activeAcc');
            const headers = {
                Authorization: `${token}`, 
                Account: `${acc}`
            };

            const response = await axios.get(`${apiURL}/transactions`, { headers });
            setTransakcije(response.data.transakcije)
        } catch (error) {
            console.log('Error: ', error)
            Alert.alert('Error', 'Something went wrong with getting transactions data!');
        }
    }

    const createTransakcijo = async (data) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const acc = await AsyncStorage.getItem('activeAcc');
            const headers = {
                Authorization: `${token}`
            };
            const body = {
                acc_id: acc,
                comment: data.comment,
                value: data.value,
                type: data.type,
                category: data.category,
                date: data.date
            }

            const response = await axios.post(`${apiURL}/transactions`, body, { headers });
            // console.log(response.data.transakcija)

            const newTransakcija = response.data.transakcija;
            setTransakcije([...transakcije, newTransakcija])
        } catch (error) {
            console.log('Error: ', error)
            Alert.alert('Error', 'Something went wrong with adding new transaction!');
        }
    }

    const handlePress = (transakcija) => {
        console.log(transakcija)
        setSelected(transakcija);
        setIsVisible(true);
    };

    const handleAdd = (data) => {
        createTransakcijo(data)
        setIsAddVisiable(true);
    };
    

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}> 
            <Header navigation={navigation} addPress={()=> setIsAddVisiable(true)}/>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {transakcije.length === 0 ? (
                    <Text style={[styles.noTransactionsText, {color: theme.textColor} ]}>Ni transakcij</Text>
                ) : (
                    transakcije.map((transakcija) => (
                        <Transakcija transakcija={transakcija} key={transakcija._id} handlePress={handlePress} />
                    ))
                )}
            </ScrollView>

            {selected? (
                <>
                    <PodrobnoTransakcija 
                        isVisiable={isVisiable}
                        onClose={()=>setIsVisible(false)}
                        transakcija={selected}
                        theme={theme}
                    />
                </>
            ):(
                <></>
            )}

            <AddTransakcijo 
                isVisible={isAddVisiable}
                onClose={()=> setIsAddVisiable(false)}
                onSubmit={handleAdd}
                theme={theme}
            />
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
    noTransactionsText: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20, 
    },
})