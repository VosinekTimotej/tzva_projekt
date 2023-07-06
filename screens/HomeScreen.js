import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView,StatusBar } from 'react-native'
import Header from '../components/Home/Header'
import PrikazStanja from '../components/Home/PrikazStanja'

export default class HomeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <PrikazStanja />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'grey',
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0,
    }
})
