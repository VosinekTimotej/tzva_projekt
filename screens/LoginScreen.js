import { View, Text, StyleSheet, StatusBar, Image, KeyboardAvoidingView, ScrollView } from 'react-native'
import * as React from 'react'
import LoginForm from '../components/Login/LoginForm'

const LoginScreen = ({navigation}) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/piggy-bank.png')} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Osebne Finance Login</Text>
            </View>
            <View style={styles.loginFormContainer}>
                <LoginForm navigation={navigation}/>
            </View>
        </ScrollView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
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
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: 'space-around',
      },
})