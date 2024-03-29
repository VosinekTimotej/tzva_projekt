import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import ThemeContext from '../../ThemeContext';
import LightTheme from '../../LightTheme';
import DarkTheme from '../../DarkTheme';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';


const AddRacun = ({ isVisible, onClose, onSubmit, onSubmitID }) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    const {t, i18n} = useTranslation();

    const [name, setName] = useState('');
    const [idRacuna, setIdRacuna] = useState('');

    const handleSubmit = () => {
        if (name) {
            onSubmit({ name });
            console.log('name: ', name)
        } else if (idRacuna) {
            onSubmitID(idRacuna)
            console.log('id:', idRacuna)
        }
        setName('');
        setIdRacuna('');
        setName('');
        onClose();
    };

    return (
        <Modal visible={isVisible} animationType='slide' transparent>
            <View style={styles.container}>
                <View style={[styles.content, {backgroundColor: theme.modalBackgroundColor}]}>
                    <View style={[styles.naslov, {backgroundColor: theme.modalBackgroundColor}]}>
                        <Text style={[styles.naslovText, {color: theme.textColor}]}>{t("Dodaj račun")}</Text>
                    </View>
                    <TextInput
                        placeholder={t("Ime")}
                        placeholderTextColor={theme.textColor}
                        value={name}
                        onChangeText={setName}
                        style={[styles.input, {color: theme.textColor}]}
                    />
                    <TextInput
                        placeholder={t("ID")}
                        placeholderTextColor={theme.textColor}
                        value={idRacuna}
                        onChangeText={setIdRacuna}
                        style={[styles.input, {color: theme.textColor}]}
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            title={t("Dodaj")} 
                            onPress={handleSubmit} 
                            color={theme.ButtonColor}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button 
                            title={t("Prekliči")}
                            onPress={onClose} 
                            color={theme.cancelButtonColor}
                        />
                    </View>
                </View>

            </View>
        </Modal>
    )
}

export default AddRacun

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        padding: 20,
        borderRadius: 8,
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
    },
    naslov:{
        alignItems:'center',
        paddingBottom: 5,
    },
    naslovText:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer:{
        paddingBottom: 5,
    },
})