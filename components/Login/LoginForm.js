import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiURL = 'http:192.168.1.12:5000' // Rok

const LoginForm = ({navigation}) => {
    // kaksne podatke zahtevamo
    const LoginSchema = Yup.object().shape({
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

    // pridobi podatke in vpise uporabnika
    const handleLogin = async (values) => {
        try {
            const response = await axios.post(apiURL+'/users/login', values);
            console.log('User login successful:', response.data);
            const token = response.data.token;
            await AsyncStorage.setItem('userToken', token);
            navigation.push('TransakcijeScreen');
        } catch (error) {
            console.log("Error: ", error)
        }
    };

    return (

        <Formik
            initialValues={{username:'', password:''}}
            onSubmit={(values) => {handleLogin(values)}}
            validationSchema={LoginSchema}
            validateOnMount={true}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid}) => (
                <View style={styles.container}>
                    <View style={styles.usernameContainer}>
                    {errors.username && (
                        <Text style={styles.errorText}>{errors.username}</Text>
                    )}
                        <TextInput
                            style={[styles.TextInput,
                                // { color: values.username.length < 1 || errors.username ? 'red' : '#fff'}
                            ]}
                            placeholder='Username'
                            placeholderTextColor="#FFF"
                            autoCapitalize='none'
                            textContentType='username'
                            autoFocus={true}
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
                        <Text>Dont have account? </Text>
                        <TouchableOpacity onPress={() => navigation.push('SignUpScreen')}>
                            <Text style={styles.signUpText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>



        
    )
}

export default LoginForm

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
    },
    usernameContainer:{
        width: "80%",
        height: 50,
        marginTop: 30,
        backgroundColor: "#4CAF50",
        borderRadius: 25,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: 'center',
        // borderColor: '#4CAF50',
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