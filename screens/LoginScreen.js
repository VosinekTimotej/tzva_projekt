import { View, Text, StyleSheet, StatusBar, Image } from 'react-native'
import React from 'react'
import LoginForm from '../components/Login/LoginForm'

const LoginScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/piggy-bank.png')} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Osebne Finance Login</Text>
            </View>
            <View style={styles.loginFormContainer}>
                <LoginForm navigation={navigation}/>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0,
    },
    logoContainer:{
        alignItems: 'center',
        marginTop: 60,
    },
    logo:{
        width: 150,
        height: 150,
    },
    textContainer:{
        alignItems: 'center',
        marginTop: 20,
    },
    text:{
        fontWeight: 'bold',
    },
    loginFormContainer:{
        marginTop: 20,
    },
})