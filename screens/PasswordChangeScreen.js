import { Button, StyleSheet, Text, TextInput, View, Alert  } from 'react-native'
import React, { useContext, useState } from 'react'
import ThemeContext from '../ThemeContext';
import LightTheme from '../LightTheme';
import DarkTheme from '../DarkTheme';
import Header from '../components/PasswordChange/Header';

import { Formik } from 'formik';
import * as Yup from 'yup';

// import bcrypt from 'bcryptjs';

const PasswordChangeScreen = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;

    const schema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                'Password must have at least one lowercase, one uppercase, one number, and one special character'
            )
    });

    const handleSubmit = async (values) => {
        console.log('password:', values.password);

        // try {
        //     const salt = await bcrypt.genSalt(10);
        
        //     const hashedPassword = await bcrypt.hash(values.password, salt);
        //     console.log('password:', hashedPassword);
        //     console.log('salt: ', salt)
        // } catch (error) {
        //     console.error('Error hashing password:', error);
        // }
        
    };

    return (
        <Formik
            initialValues={{password:''}}
            onSubmit={(values) => {handleSubmit(values)}}
            validationSchema={schema}
            validateOnMount={true}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid}) => (
                <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
                    <Header navigation={navigation} theme={theme} />
                    <View style={[styles.content, {backgroundColor: theme.backgroundColor}]}>
                        {errors.password && (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        )}
                            <TextInput
                                placeholder='Password'
                                textContentType='password'
                                placeholderTextColor={theme.textColor}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={true}
                                style={[styles.input, {color: theme.textColor}]}
                            />
                        <View style={styles.buttonContainer}>
                            <Button
                                title='Add' 
                                onPress={handleSubmit} 
                                color={theme.ButtonColor}
                                disabled={!isValid}
                            />
                        </View>
                    </View>
                </View>       
            )}
        </Formik>
    )
}

export default PasswordChangeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    content: {
        padding: 20,
        borderRadius: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer:{
        paddingBottom: 5,
        padding: 20,
    },
})
