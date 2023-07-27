import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../../ThemeContext';
import LightTheme from '../../LightTheme';
import DarkTheme from '../../DarkTheme';

const Header = ({navigation}) => {
    const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor  }]}>
            <View style={styles.backContainer}>
                <TouchableOpacity onPress={() => navigation.push('TransakcijeScreen')}>
                    <Image 
                        style={styles.backLogo} 
                        source={theme.backSource}
                    />
                </TouchableOpacity>
            </View>
            <Text style={[styles.text, { color: theme.textColor }]}>Kategorije</Text>
            <Text></Text>
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
        marginBottom: 0,
        justifyContent:'space-between',
        borderBottomWidth: 1,
    },
    backContainer:{

    },
    backLogo:{
        width: 30,
        height: 40,
        resizeMode: 'contain',
        paddingBottom: 10,
    },
    text:{
        fontSize: 16,
        fontWeight: 'bold'
    },
})