import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image, Alert } from 'react-native'

export default class PrikazStanja extends Component {
  render() {
    const handlePress = () => {
        // Perform your action here
        Alert.alert('Button Pressed');
      };

    return (
        <View>
            <View style={styles.container_stanje}>
                <Text> Tukaj bo prikazano stanje. Spremenimo v component </Text>
            </View>
            <View style={styles.container_dohodki}>
                <Text> Tukaj bodo prikazani dohodki. Spremenimo v component</Text>
            </View>
            <View style={styles.container_odhodki}>
                <Text> Tukaj bodo prikazani odhodki. Spremenimo v component</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handlePress} style={styles.button}>
                    <Image 
                        style={styles.add}
                        source={require('../../assets/add.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
  }
}

const stanjeHeight = '30%';
const stanjeWidth = '90%';

const dohodkiHeight = '20%';
const dohodkiWidth = '90%';

const odhodkiHeight = '20%';
const odhodkiWidth = '90%';

const MarginT = 10;
const MarginR = 20;
const MarginL = 20;

const styles = StyleSheet.create({
    container_stanje:{
        backgroundColor: 'white',
        width: stanjeWidth,
        height: stanjeHeight,
        marginLeft: MarginL,
        marginRight: MarginR,
        marginTop: MarginT,
    },

    container_dohodki:{
        backgroundColor: 'white',
        width: dohodkiWidth,
        height: dohodkiHeight,
        marginLeft: MarginL,
        marginRight: MarginR,
        marginTop: MarginT,
    },

    container_odhodki:{
        backgroundColor: 'white',
        width: odhodkiWidth,
        height: odhodkiHeight,
        marginLeft: MarginL,
        marginRight: MarginR,
        marginTop: MarginT,
    },

    buttonContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: MarginT,
    },

    button:{
        // marginBottom: 16,
        // borderRadius: 8,
        width: 50
    },

    add:{
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
})
