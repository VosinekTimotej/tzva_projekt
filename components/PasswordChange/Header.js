import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import {useTranslation} from 'react-i18next';
import '../assets/i18n/i18n';

const Header = ({navigation, theme}) => {
    const {t, i18n} = useTranslation();
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor  }]}>
            <View style={styles.backContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image 
                        style={styles.backLogo} 
                        source={theme.backSource}
                    />
                </TouchableOpacity>
            </View>
            <Text style={[styles.text, { color: theme.textColor }]}>{t("Spremeni geslo")}</Text>
            <View>
                <Text> </Text>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container:{
        paddingTop: 5,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 0,
        justifyContent:'space-between',
        borderBottomWidth: 1,
    },
    backContainer:{

    },
    backLogo:{
        width: 30,
        height: 40,
        resizeMode: 'contain',
        paddingBottom: 10,
    },
    text:{
        fontSize: 16,
        fontWeight: 'bold'
    },
})