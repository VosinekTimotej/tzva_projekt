import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Header from '../components/Racuni/Header'
import { Racuni } from '../data/Racuni'
import ThemeContext from '../ThemeContext'
import LightTheme from '../LightTheme'
import DarkTheme from '../DarkTheme'
import Racun from '../components/Racuni/Racun'


const RacuniScreen = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Header navigation={navigation}/>
            <ScrollView>
                {Racuni.map((racun,index)=>(
                    // <Text>{racun.name}</Text>
                    <Racun racun={racun} key={index} />
                ))}
            </ScrollView>
            <Text>RacuniScreen</Text>
        </View>
    )
}

export default RacuniScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
})