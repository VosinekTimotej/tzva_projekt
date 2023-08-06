import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import ThemeContext from '../../ThemeContext';
import LightTheme from '../../LightTheme';
import DarkTheme from '../../DarkTheme';


const AddRacun = ({ isVisible, onClose, onSubmit }) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;

    const [name, setName] = useState('');

    const handleSubmit = () => {
        onSubmit({
            name: name,
        });
        setName('');
        onClose();
    };

    return (
        <Modal visible={isVisible} animationType='slide' transparent>
            <View style={styles.container}>
                <View style={[styles.content, {backgroundColor: theme.modalBackgroundColor}]}>
                    <View style={[styles.naslov, {backgroundColor: theme.modalBackgroundColor}]}>
                        <Text style={[styles.naslovText, {color: theme.textColor}]}>Dodaj Racun</Text>
                    </View>
                    <TextInput
                        placeholder='Ime'
                        placeholderTextColor={theme.textColor}
                        value={name}
                        onChangeText={setName}
                        style={[styles.input, {color: theme.textColor}]}
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