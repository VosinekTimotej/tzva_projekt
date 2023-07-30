import React, { useContext, useState } from 'react';
import { View, Modal, Text, TextInput, Button, StyleSheet } from 'react-native';
import ThemeContext from '../../ThemeContext';
import LightTheme from '../../LightTheme';
import DarkTheme from '../../DarkTheme';

const AddMejaModal = ({ isVisible, onClose, onSubmit }) => {

    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;

    const [name, setName] = useState('');
    const [max, setMax] = useState('');

    const handleSubmit = () => {
        onSubmit({
            id: 0, 
            name: name,
            max: parseFloat(max),
            curr: 0
        });
        setName('');
        setMax('');
        onClose();
    };

    return (
        <Modal visible={isVisible} animationType='slide' transparent>
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, {backgroundColor: theme.modalBackgroundColor}]}>
                    <View style={[styles.naslov, {backgroundColor: theme.modalBackgroundColor}]}>
                        <Text style={[styles.naslovText, {color: theme.textColor}]}>Dodaj Mejo</Text>
                    </View>
                    <TextInput
                        placeholder='Ime'
                        placeholderTextColor={theme.textColor}
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='Max vsota'
                        placeholderTextColor={theme.textColor}
                        value={max}
                        onChangeText={setMax}
                        keyboardType='numeric'
                        style={styles.input}
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            title='Add' 
                            onPress={handleSubmit} 
                            color={theme.ButtonColor}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button 
                            title='Cancel' 
                            onPress={onClose} 
                            color={theme.cancelButtonColor}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default AddMejaModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
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