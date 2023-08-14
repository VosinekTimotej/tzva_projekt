import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../../ThemeContext';
import DarkTheme from '../../DarkTheme';
import LightTheme from '../../LightTheme';

//TODO Delete kategorijo
//TODO Add kategorijo
//TODO Get kategorijo from server 

const Kategorija = ({kategorija, onDeletePress}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;

    const handlePress = async () => {
        console.log(kategorija._id)
    }

    const handleDelete = () =>{
        console.log(kategorija._id)
        onDeletePress(kategorija._id)
    }
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
            
            <TouchableOpacity onPress={handlePress}>
                <View>
                    <Text style={[styles.ime,{color: theme.textColor}]}> {kategorija.name}</Text>
                    <Text style={{color: theme.textColor}}>{kategorija.max_spend}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
                <Image 
                    style={styles.delete} 
                    source={theme.deleteSource}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Kategorija

const styles = StyleSheet.create({
    container:{
        borderBottomWidth: 1,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    ime:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    icon:{
        width: 20,
        height:20,
    },
    delete:{
        width: 30,
        height: 40,
        resizeMode: 'contain',
        paddingBottom: 10,
        marginTop: 20,
        marginBottom: 20
    },
})