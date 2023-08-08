import { Button, StyleSheet, Text, TextInput, View, Alert  } from 'react-native'
import React, { useContext, useState } from 'react'
import ThemeContext from '../ThemeContext';
import LightTheme from '../LightTheme';
import DarkTheme from '../DarkTheme';
import Header from '../components/UserInfo/Header';
import DatePicker from 'react-native-date-picker'
import Toast from 'react-native-toast-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiURL = 'http:192.168.1.12:5000' // Rok

const UserInfoScreen = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;

    const [name,setName] = useState('');
    const [surname,setSurname] = useState('');
    const [date, setDate] = useState(new Date())

    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Hello',
            text2: 'This is some something 👋'
        });
    }

    const handleSubmit = async () => {
        const data = {};

        if (name !== '') {
            data.name = name;
        }

        if (surname !== '') {
            data.surname = surname;
        }

        try {
            const token = await AsyncStorage.getItem('userToken');
            const headers = {
                Authorization: `${token}`
            };

            const response = await axios.put(`${apiURL}/users/update`, data, { headers });
            console.log(response.data);
            setName('');
            setSurname('');
            Alert.alert('Success', 'User data has been updated!');
        } catch (error) {
            console.log('Error: ', error)
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Header navigation={navigation} theme={theme} />
            <View style={[styles.content, {backgroundColor: theme.backgroundColor}]}>
                <TextInput
                    placeholder='Name'
                    placeholderTextColor={theme.textColor}
                    value={name}
                    onChangeText={setName}
                    style={[styles.input, {color: theme.textColor}]}
                />
                <TextInput
                    placeholder='Surname'
                    placeholderTextColor={theme.textColor}
                    value={surname}
                    onChangeText={setSurname}
                    style={[styles.input, {color: theme.textColor}]}
                />
                {/* <DatePicker date={date} onDateChange={setDate} /> */}
            </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title='Update' 
                        onPress={handleSubmit} 
                        color={theme.ButtonColor}
                    />
                </View>
        </View>
    )
}

export default UserInfoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    content: {
        padding: 20,
        borderRadius: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer:{
        paddingBottom: 5,
        padding: 20,
    },
})