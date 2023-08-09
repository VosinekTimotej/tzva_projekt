import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { TRANSAKCIJE } from '../data/Transakcije'
import Header from '../components/Transakcije/Header'
import Transakcija from '../components/Transakcije/Transakcija'
import ThemeContext from '../ThemeContext'
import DarkTheme from '../DarkTheme'
import LightTheme from '../LightTheme'
import PodrobnoTransakcija from '../components/Transakcije/PodrobnoTransakcija'
import AddTransakcijo from '../components/Transakcije/AddTransakcijo'
import Footer from '../components/Footer/Footer'
import { useRoute } from '@react-navigation/native';

//TODO Footer 

const TransakcijeScreen = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;

    // podrobno screen
    const [selected, setSelected] = useState(null);
    const [isVisiable, setIsVisible] = useState(false);

    // add modal
    const [isAddVisiable, setIsAddVisiable] = useState(false);

    const handlePress = (transakcija) => {
        console.log(transakcija)
        setSelected(transakcija);
        setIsVisible(true);
    };

    const handleAdd = (data) => {
        console.log(data)
        setIsAddVisiable(true);
    };
    const route = useRoute();
    //console.log(route.name);

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}> 
            <Header navigation={navigation} addPress={()=> setIsAddVisiable(true)}/>
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

            <AddTransakcijo 
                isVisible={isAddVisiable}
                onClose={()=> setIsAddVisiable(false)}
                onSubmit={handleAdd}
                theme={theme}
            />
            <View style={styles.footer}>
                <Footer navigation={navigation}/>
            </View>
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
    footer:{
        backgroundColor: "blue",
        padding: 0,
      },
})