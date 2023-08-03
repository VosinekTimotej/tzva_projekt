import { Button, StyleSheet, Text, TextInput, View, Alert  } from 'react-native'
import React, { useContext, useState } from 'react'
import ThemeContext from '../ThemeContext';
import LightTheme from '../LightTheme';
import DarkTheme from '../DarkTheme';
import Header from '../components/PasswordChange/Header';
var bcrypt = require('bcryptjs');

import { getRandomBytes } from 'react-native-get-random-values';

bcrypt.setRandomFallback(getRandomBytes);

const saltRounds = 5;

var salt = bcrypt.genSaltSync(saltRounds);

const PasswordChangeScreen = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {

        if(password.trim() !== ''){
            try {
                var hash = bcrypt.hashSync(password.trim(), salt);
                data = {
                    password: hash,
                    salt: salt
                }
                Alert.alert('Success', 'Password has been updated!');
                console.log(data);

            } catch (error) {
                console.log(error)
                Alert.alert('Error', 'There was an error!');
            }
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Header navigation={navigation} theme={theme} />
            <View style={[styles.content, {backgroundColor: theme.backgroundColor}]}>
                <TextInput
                    placeholder='Password'
                    placeholderTextColor={theme.textColor}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    style={[styles.input, {color: theme.textColor}]}
                />
            </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title='Add' 
                        onPress={handleSubmit} 
                        color={theme.ButtonColor}
                    />
                </View>
        </View>
    )
}

export default PasswordChangeScreen

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