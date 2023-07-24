import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'

const screenWidth = Dimensions.get('window').width;
const logoSize = screenWidth * 0.3;
const headerTextSize = Math.min(24, screenWidth * 0.05);

const Header = () => {
  return (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <TouchableOpacity onPress={()=> {console.log('Hocem domov ali nekam')}}>
                <Image
                        style={styles.logoImg} 
                        source={require('../../assets/piggy-bank.png')} 
                    />
            </TouchableOpacity>
        </View>
        <Text style={styles.text}>Transakcije</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        paddingTop: StatusBar.currentHeight || 0,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
    },
    logoContainer:{

    },
    logoImg:{
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    text:{
        marginLeft: 0.35 * Dimensions.get('window').width,
        fontSize: 15,
        fontWeight: 'bold',
    },
})