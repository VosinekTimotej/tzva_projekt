import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.text}> Header </Text> */}
        <View style={styles.logo_container}>
            <Image 
                style={styles.logo_img} 
                source={require('../../assets/piggy-bank.png')} 
            />
            <Text style={styles.text}>My app</Text>
        </View>
        
        <TouchableOpacity>
            <Image
                style={styles.settings}
                source={require('../../assets/setting.png')}
            />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        // marginHorizontal: 20,
        backgroundColor: 'white',
        padding: 5
    },

    logo_container:{
        flexDirection: 'row',
        marginLeft: 5
    },

    text:{
        fontSize: 18,
        paddingLeft: 10,
        textAlignVertical: 'center',
    },

    logo_img:{
        width: 30,
        height: 30,
        resizeMode: 'contain',
        // marginLeft: 5,
    },

    settings:{
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginRight: 5
    },
})
