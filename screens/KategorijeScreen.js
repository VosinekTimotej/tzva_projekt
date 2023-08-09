import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import ThemeContext from '../ThemeContext';
import DarkTheme from '../DarkTheme';
import LightTheme from '../LightTheme';
import Header from '../components/Kategorije/Header';

import { KATEGORIJE } from '../data/Kategorije';
import Kategorija from '../components/Kategorije/Kategorija';
import AddKategorija from '../components/Kategorije/AddKategorija';
import Footer from '../components/Footer/Footer';


//TODO Footer 

const KategorijeScreen = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;

    const [isVisible, setIsVisible] = useState(false);

    const handleAddKategorija = (data) => {
        console.log('New data:', data);
        setIsVisible(false);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Header navigation={navigation} onAddButtonPress={() => setIsVisible(true)} />
            <ScrollView>
                {KATEGORIJE.map((kategorija, index) => (
                    <Kategorija kategorija={kategorija} key={kategorija.id} />
                ))}
            </ScrollView>
            <AddKategorija 
                isVisible={isVisible}
                onClose={()=>setIsVisible(false)}
                onSubmit={handleAddKategorija}
            />
            <Footer navigation={navigation}/>
        </View>
    )
}

export default KategorijeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
})