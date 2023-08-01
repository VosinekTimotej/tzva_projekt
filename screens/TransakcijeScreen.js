import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { TRANSAKCIJE } from '../data/Transakcije'
import Header from '../components/Transakcije/Header'
import Transakcija from '../components/Transakcije/Transakcija'
import ThemeContext from '../ThemeContext'
import DarkTheme from '../DarkTheme'
import LightTheme from '../LightTheme'
import PodrobnoTransakcija from '../components/Transakcije/PodrobnoTransakcija'

//TODO Footer 

const TransakcijeScreen = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;

    const [selected, setSelected] = useState(null);
    const [isVisiable, setIsVisible] = useState(false);

    const handlePress = (transakcija) => {
        console.log(transakcija)
        setSelected(transakcija);
        setIsVisible(true);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}> 
            <Header navigation={navigation}/>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {TRANSAKCIJE.map((transakcija, index) => (
                    <Transakcija transakcija={transakcija} key={transakcija.id} handlePress={handlePress} />
                ))}
            </ScrollView>

            {selected? (
                <>
                    <PodrobnoTransakcija 
                        isVisiable={isVisiable}
                        onClose={()=>setIsVisible(false)}
                        transakcija={selected}
                        theme={theme}
                    />
                </>
            ):(
                <></>
            )}

            
        </View>
    )
}

export default TransakcijeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
})