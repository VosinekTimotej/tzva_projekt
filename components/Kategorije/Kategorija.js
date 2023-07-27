import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../../ThemeContext';
import DarkTheme from '../../DarkTheme';
import LightTheme from '../../LightTheme';

//TODO Delete kategorijo
//TODO Add kategorijo
//TODO Get kategorijo from server 

const Kategorija = ({kategorija}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
            {isDarkTheme ? 
                <Image source={{uri: kategorija.darkIcon}} style={styles.icon}/> :
                <Image source={{uri: kategorija.icon}} style={styles.icon}/>
            }
            <Text style={{color: theme.textColor}}> {kategorija.name}</Text>
        </View>
        
    )
}

export default Kategorija

const styles = StyleSheet.create({
    container:{
        borderBottomWidth: 1,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
    },
    icon:{
        width: 20,
        height:20,
    },
})