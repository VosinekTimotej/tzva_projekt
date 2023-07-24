import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Transakcija = ({transakcija}) => {
  return (
    <View style={styles.container}>
        <Text>Date: {transakcija.date}</Text>
        <Text>Id: {transakcija.id}</Text>
        <Text>Value: {transakcija.value}</Text>
        <Text>Type: {transakcija.type}</Text>
        <Text>Category: {transakcija.category}</Text>
        <Text>Comment: {transakcija.comment}</Text>
    </View>
  )
}

export default Transakcija

const styles = StyleSheet.create({
    container:{
        // marginBottom: 10,
        // marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
})