import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

const LoginForm = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.usernameContainer}>
                <TextInput
                    style={styles.TextInput}
                    placeholder='Username'
                    placeholderTextColor="#FFF"
                    autoCapitalize='none'
                    textContentType='username'
                    autoFocus={true}
                    // onChangeText={}
                    // onBlur={}
                    // value={}
                />
            </View>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.TextInput}
                    placeholder='Password'
                    placeholderTextColor="#FFF"
                    autoCapitalize='none'
                    textContentType='password'
                    autoCorrect={false}
                    secureTextEntry={true}
                    // onChangeText={}
                    // onBlur={}
                    // value={}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.loginButton}>
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
    loginButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        borderRadius: 25,
    },
    loginButtonText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
})