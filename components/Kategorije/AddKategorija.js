import React, { useContext, useState } from 'react';
import { View, Modal, Text, TextInput, Button, StyleSheet } from 'react-native';
import ThemeContext from '../../ThemeContext';
import LightTheme from '../../LightTheme';
import DarkTheme from '../../DarkTheme';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';

const AddKategorija = ({ isVisible, onClose, onSubmit }) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    const {t, i18n} = useTranslation();

    const [name, setName] = useState('');
    const [max, setMax] = useState('');

    const handleSubmit = () => {
        onSubmit({
            name: name,
            max_spend: max,
            current: 0
        });
        setMax('');
        setName('');
        onClose();
    };

    return (
        <Modal visible={isVisible} animationType='slide' transparent>
            <View style={styles.container}>
                <View style={[styles.content, {backgroundColor: theme.modalBackgroundColor}]}>
                    <View style={[styles.naslov, {backgroundColor: theme.modalBackgroundColor}]}>
                        <Text style={[styles.naslovText, {color: theme.textColor}]}>{t("Dodaj kategorijo")}</Text>
                    </View>
                    <TextInput
                        placeholder={t("Ime")}
                        placeholderTextColor={theme.textColor}
                        value={name}
                        onChangeText={setName}
                        style={[styles.input, {color: theme.textColor}]}
                    />
                    <TextInput
                        placeholder={t("Max vrednost")}
                        placeholderTextColor={theme.textColor}
                        value={max}
                        onChangeText={setMax}
                        keyboardType='numeric'
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

export default AddKategorija

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