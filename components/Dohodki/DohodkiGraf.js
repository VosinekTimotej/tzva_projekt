import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../../ThemeContext';
import DarkTheme from '../../DarkTheme';
import LightTheme from '../../LightTheme';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'
import { TRANSAKCIJE } from '../../data/Transakcije'
import { date } from 'yup';





const DohodkiGraf = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor}]}>
            <Text style={[styles.text, { color: theme.textColor }]} >Graf Dohodkov</Text>
            
        </View>
    )
}

export default DohodkiGraf

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text:{
        paddingTop: 10,
        paddingLeft: 5,
    },
})