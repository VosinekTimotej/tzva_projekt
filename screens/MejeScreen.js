import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Header from '../components/Meje/Header'
import ThemeContext from '../ThemeContext';
import LightTheme from '../LightTheme';
import DarkTheme from '../DarkTheme';
import { MEJE } from '../data/Meje';
import Meja from '../components/Meje/Meja';

const MejeScreen = ({navigation}) => {
    const { isDarkTheme} = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    return (
        <View style={[{flex: 1, backgroundColor: theme.backgroundColor}]}>
            <Header navigation={navigation} />
            <ScrollView>
                {MEJE.map((meja, index)=>(
                    // <Text>{meja.name}</Text>
                    <Meja meja={meja} key={index} />
                ))}
            </ScrollView>
        </View>
    )
}

export default MejeScreen

const styles = StyleSheet.create({})