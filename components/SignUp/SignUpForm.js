import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiURL = 'http:192.168.1.12:5000' // Rok

const SignUpForm = ({navigation}) => {
    // kaksni podatki se pricakujejo pri vnosu
    const Schema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Invalid email format')
            .min(3, 'Email must be at least 3 characters long'),
        username: Yup.string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters long')
            .matches(/[a-zA-Z]/, 'Username must contain at least 1 letter'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                'Password must have at least one lowercase, one uppercase, one number, and one special character'
            )
    })

    // posljemo podatke o uporabniku na streznik in ustvarimo nov user
    const handleSignup = async (values) => {
        try{
            const response = await axios.post(apiURL+'/users', values);
            console.log('User signup successful:', response.data);
            const token = response.data.token;
            await AsyncStorage.setItem('userToken', token);
            navigation.push('TransakcijeScreen');
        }catch(err){
            console.log('Error: ', err)
        }
    };

    return (
        <Formik
            initialValues={{email:'', username:'', password:''}}
            onSubmit={(values) => {handleSignup(values)}}
            validationSchema={Schema}
            validateOnMount={true}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid}) => (
            <View style={styles.container}>
                <View style={styles.emailContainer}>
                    {errors.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                    <TextInput
                        style={styles.TextInput}
                        placeholder='Email'
                        placeholderTextColor="#FFF"
                        autoCapitalize='none'
                        textContentType='emailAddress'
                        autoCorrect={false}
                        autoFocus={true}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                </View>
                <View style={styles.usernameContainer}>
                    {errors.username && (
                        <Text style={styles.errorText}>{errors.username}</Text>
                    )}
                    <TextInput
                        style={styles.TextInput}
                        placeholder='Username'
                        placeholderTextColor="#FFF"
                        autoCapitalize='none'
                        textContentType='username'
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                    />
                </View>
                <View style={styles.passwordContainer}>
                    {errors.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                    <TextInput
                        style={styles.TextInput}
                        placeholder='Password'
                        placeholderTextColor="#FFF"
                        autoCapitalize='none'
                        textContentType='password'
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.loginButton(isValid)} onPress={handleSubmit} disabled={!isValid}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signUpContainer}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
                        <Text style={styles.signUpText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
            )}
        </Formik>
    )
}

export default SignUpForm

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
    },
    emailContainer:{
        width: "80%",
        height: 50,
        marginTop: 30,
        backgroundColor: "#4CAF50",
        borderRadius: 25,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: 'center',
    },
    usernameContainer:{
        width: "80%",
        height: 50,
        backgroundColor: "#4CAF50",
        borderRadius: 25,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: 'center',
    },
    TextInput: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
    passwordContainer:{
        width:"80%",
        backgroundColor:"#4CAF50",
        borderRadius:25,
        height: 50,
        marginBottom:20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer:{
        marginTop: 50,
        width:"80%",
    },
    signUpContainer:{
        flexDirection: 'row',
        width:'100%',
        justifyContent: 'center',
        marginTop: 50,
    },
    signUpText:{
        color: '#6BB0F5'
    },
    loginButton: isValid=>({
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isValid ? '#4CAF50' : '#000',
        borderRadius: 25,
    }),
    loginButtonText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
})