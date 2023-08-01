import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../../ThemeContext';
import DarkTheme from '../../DarkTheme';
import LightTheme from '../../LightTheme';

const Header = ({navigation, addPress}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={addPress}>
                    <Image
                            style={styles.logoImg} 
                            source={theme.logoSource}
                        />
                </TouchableOpacity>
            </View>
            <Text style={[styles.text, { color: theme.textColor }]}>Transakcije</Text>
            <View>
                <TouchableOpacity onPress={() => navigation.push('SettingsScreen')}>
                    <Image 
                        style={styles.logoImg}
                        source={theme.settingsSource}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container:{
        // paddingTop: StatusBar.currentHeight || 0,
        paddingTop: 5,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent:'space-between',
    },
    logoImg:{
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    text:{
        fontSize: 16,
        fontWeight: 'bold'
    },
})