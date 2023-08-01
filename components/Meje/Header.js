import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../../ThemeContext';
import DarkTheme from '../../DarkTheme';
import LightTheme from '../../LightTheme';

const Header = ({navigation, onAddButtonPress }) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor  }]}>
            <View style={styles.backContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image 
                        style={styles.backLogo} 
                        source={theme.backSource}
                    />
                </TouchableOpacity>
            </View>
            <Text style={[styles.text, { color: theme.textColor }]}>Meje</Text>
            <TouchableOpacity onPress={onAddButtonPress}> 
                <Image 
                    style={styles.addLogo} 
                    source={theme.addSource}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container:{
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
    addLogo:{
        width: 30,
        height: 40,
        resizeMode: 'contain',
        paddingBottom: 10,
        // paddingRight: 50,
    },
})