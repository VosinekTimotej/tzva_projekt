import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Header from '../components/Racuni/Header'
import { Racuni } from '../data/Racuni'
import ThemeContext from '../ThemeContext'
import LightTheme from '../LightTheme'
import DarkTheme from '../DarkTheme'
import Racun from '../components/Racuni/Racun'
import AddRacun from '../components/Racuni/AddRacun'


const RacuniScreen = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;

    const [isVisible, setIsVisible] = useState(false);

    const handleAddRacun = (data) => {
        console.log('New data:', data);
        setIsVisible(false);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Header navigation={navigation} onAddButtonPress={() => setIsVisible(true)} />
            <ScrollView>
                {Racuni.map((racun,index)=>(
                    <Racun racun={racun} key={index} />
                ))}
            </ScrollView>
            <AddRacun 
                isVisible={isVisible}
                onClose={()=>setIsVisible(false)}
                onSubmit={handleAddRacun}
            />
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