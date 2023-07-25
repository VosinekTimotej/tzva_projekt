import { StyleSheet, Text, View, Switch, TouchableOpacity  } from 'react-native'
import React, { useContext } from 'react';
import ThemeContext from '../ThemeContext';


const SettingsScreen = ({navigation}) => {

    const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

    return (
        <View style={styles.container}> 
            <Text>SettingsScreen</Text>
            <Switch
                value={isDarkTheme}
                onValueChange={toggleTheme}
            />
            <TouchableOpacity onPress={() => navigation.push('TransakcijeScreen')}>
                <Text>Back</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container:{
        marginTop:40,
    },
})