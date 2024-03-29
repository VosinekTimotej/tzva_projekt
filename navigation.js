import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import TransakcijeScreen from './screens/TransakcijeScreen'
import SettingsScreen from './screens/SettingsScreen'
import KategorijeScreen from './screens/KategorijeScreen'
import RacuniScreen from './screens/RacuniScreen'
import InfoScreen from './screens/InfoScreen'
import MejeScreen from './screens/MejeScreen'
import DohodkiScreen from './screens/DohodkiScreen'
import OdhodkiScreen from './screens/OdhodkiScreen'

import JezikScreen from './screens/JezikScreen'

import UserInfoScreen from './screens/UserInfoScreen'
import PasswordChangeScreen from './screens/PasswordChangeScreen'



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
        <Stack.Navigator initialRouteName='LoginScreen' screenOptions={screenOptions}>
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
            {/* Dodano samo temp med urejanjem */}
            <Stack.Screen name='OdhodkiScreen' component={OdhodkiScreen} />
            <Stack.Screen name='DohodkiScreen' component={DohodkiScreen} />
            <Stack.Screen name='TransakcijeScreen' component={TransakcijeScreen} />
            <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
            <Stack.Screen name='KategorijeScreen' component={KategorijeScreen} />
            <Stack.Screen name='RacuniScreen' component={RacuniScreen} />
            <Stack.Screen name='InfoScreen' component={InfoScreen} />
            <Stack.Screen name='MejeScreen' component={MejeScreen} />
            <Stack.Screen name='JezikScreen' component={JezikScreen} />
            <Stack.Screen name='UserInfoScreen' component={UserInfoScreen} />
            <Stack.Screen name='PasswordChangeScreen' component={PasswordChangeScreen} />

        </Stack.Navigator>
    </NavigationContainer>
)


export default SignedInStack


const styles = StyleSheet.create({})