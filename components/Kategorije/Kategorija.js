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
    
    const color = (kategorija.max_spend - kategorija.current)< 30 ? "red": ((kategorija.max_spend - kategorija.current)< 100 ? "orange": "green");

    return (
        <View style={[styles.container, 
                        { backgroundColor: theme.backgroundColor, 
                        borderBottomColor: theme.borderBottomColor, 
                        borderRightColor: color
                    }]}>
            
            <TouchableOpacity onPress={handlePress}>
                <View>
                    <Text style={[styles.ime,{color: theme.textColor}]}>Ime: {kategorija.name}</Text>
                    <Text style={{color: theme.textColor}}>Max spend: {kategorija.max_spend}</Text>
                    <Text style={{color: theme.textColor}}>Current: {kategorija.current}</Text>
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
        borderRightWidth: 10,
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