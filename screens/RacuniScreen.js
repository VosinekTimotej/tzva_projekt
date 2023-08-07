import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import Header from '../components/Racuni/Header'
import ThemeContext from '../ThemeContext'
import LightTheme from '../LightTheme'
import DarkTheme from '../DarkTheme'
import Racun from '../components/Racuni/Racun'
import AddRacun from '../components/Racuni/AddRacun'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiURL = 'http:192.168.1.12:5000' // Rok

const RacuniScreen = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;

    const [isVisible, setIsVisible] = useState(false);

    const [acc, setAcc] = useState([]);

    // se pozene ko se nalozi screen
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                getAcc()
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };

        fetchAccounts();
    }, []);

    // pridobi podatke o racunih s streznika
    const getAcc = async () =>{
        try {
            const token = await AsyncStorage.getItem('userToken');
            const headers = {
                Authorization: `${token}` 
            };
            const response = await axios.get(`${apiURL}/users/acc`, { headers });
            // console.log(response.data);
            const accs = response.data.accounts
            setAcc(accs)
            // console.log("acc 0 ", accs[0])
        } catch (error) {
            console.log('Error: ', error)
        }
        
    }

    // doda nov racun in poslje na streznik
    const handleAddRacun = async (data) => {
        try {
            console.log('New data:', data);
            const token = await AsyncStorage.getItem('userToken');
            console.log('Token:', token);
            const headers = {
                Authorization: `${token}` 
            };
            const response = await axios.put(`${apiURL}/users/acc`, data, { headers });
            console.log('New account created:', response.data.account);
            const newAcc = response.data.account;
            setAcc([...acc, newAcc])
            setIsVisible(false);
        } catch (error) {
            console.log('Error: ', error)
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Header navigation={navigation} onAddButtonPress={() => setIsVisible(true)} />
            <ScrollView>
                {acc.map((racun) =>(
                    <Racun racun={racun} key={racun._id} />
                ))}
            </ScrollView>
            <AddRacun 
                isVisible={isVisible}
                onClose={()=>setIsVisible(false)}
                onSubmit={handleAddRacun}
            />
        </View>
    )
}

export default RacuniScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
})