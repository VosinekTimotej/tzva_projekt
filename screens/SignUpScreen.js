import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import React from 'react'
import SignUpForm from '../components/SignUp/SignUpForm'

const SignUpScreen = ({navigation}) => {
    return (
        <ScrollView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../assets/piggy-bank.png')} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Osebne Finance Sign Up</Text>
                </View>
                <View style={styles.loginFormContainer}>
                    <SignUpForm navigation={navigation}/>
                </View>
        </ScrollView>
    )
}

export default SignUpScreen

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
})