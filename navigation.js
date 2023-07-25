import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import TransakcijeScreen from './screens/TransakcijeScreen'
import SettingsScreen from './screens/SettingsScreen'


const Stack = createStackNavigator()

const screenOptions = {
    headerShown: false
}

// ko je prijavljen uporabnik lahko dostopa do vseh ostalih strani
const SignedInStack = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='HomeScreen' screenOptions={screenOptions}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            {/* <Stack.Screen name='TransakcijeScreen' component={TransakcijeScreen} /> */}
        </Stack.Navigator>
    </NavigationContainer>
)

// ko ni prijavlen uporabnik => samo login and signup page
export const SignedOutStack = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='SettingsScreen' screenOptions={screenOptions}>
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
            {/* Dodano samo temp med urejanjem */}
            <Stack.Screen name='TransakcijeScreen' component={TransakcijeScreen} />
            <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)


export default SignedInStack


const styles = StyleSheet.create({})