import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TRANSAKCIJE } from '../data/Transakcije'
import Header from '../components/Transakcije/Header'
import Transakcija from '../components/Transakcije/Transakcija'

const TransakcijeScreen = () => {
    return (
        <View style={styles.container}> 
            <Header />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {TRANSAKCIJE.map((transakcija, index) => (
                    <Transakcija transakcija={transakcija} key={transakcija.id} />
                ))}
            </ScrollView>
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