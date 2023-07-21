import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

const SignUpForm = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.emailContainer}>
                <TextInput
                    style={styles.TextInput}
                    placeholder='Email'
                    placeholderTextColor="#FFF"
                    autoCapitalize='none'
                    textContentType='emailAddress'
                    autoCorrect={false}
                    autoFocus={true}
                />
            </View>
            <View style={styles.usernameContainer}>
                <TextInput
                    style={styles.TextInput}
                    placeholder='Username'
                    placeholderTextColor="#FFF"
                    autoCapitalize='none'
                    textContentType='username'
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
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.signUpContainer}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.signUpText}>Login</Text>
                </TouchableOpacity>
            </View>

        </View>
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