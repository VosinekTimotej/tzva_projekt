import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list';

const AddTransakcijo = ({ isVisible, onClose, onSubmit, theme }) => {
    const [value, setValue] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [comment, setComment] = useState('');


    const getCurrentDate = () => {
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear();
    
        return `${day}.${month}.${year}`;
    };

    const handleSubmit = () => {
        const currentDate = getCurrentDate();
        onSubmit({
            date: currentDate,
            value: parseFloat(value),
            type: type,
            category: category,
            comment: comment
        });

        setValue('');
        setType('');
        setCategory('');
        setComment();
        onClose();
    };

    const typeData=[
        {key:'1', value:'income'},
        {key:'2', value:'cost'}
    ]

    return (
        <Modal visible={isVisible} animationType='slide' transparent>
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, {backgroundColor: theme.modalBackgroundColor}]}>
                    <View style={[styles.naslov, {backgroundColor: theme.modalBackgroundColor}]}>
                        <Text style={[styles.naslovText, {color: theme.textColor}]}>Dodaj Transakcijo</Text>
                    </View>
                    <TextInput
                        placeholder='Value'
                        placeholderTextColor={theme.textColor}
                        value={value}
                        onChangeText={setValue}
                        keyboardType='numeric'
                        style={[styles.input, {color: theme.textColor}]}
                    />
                    {/* <TextInput
                        placeholder='Type'
                        placeholderTextColor={theme.textColor}
                        value={type}
                        onChangeText={setType}
                        style={[styles.input, {color: theme.textColor}]}
                    /> */}
                    <SelectList 
                        setSelected={(val) => setType(val)}
                        data={typeData}
                        save='value'
                        boxStyles={{borderRadius:4}}
                    />
                    <TextInput
                        placeholder='Category'
                        placeholderTextColor={theme.textColor}
                        value={category}
                        onChangeText={setCategory}
                        style={[styles.input, {color: theme.textColor}]}
                    />
                    <TextInput
                        placeholder='Comment'
                        placeholderTextColor={theme.textColor}
                        value={comment}
                        onChangeText={setComment}
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

export default AddTransakcijo

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