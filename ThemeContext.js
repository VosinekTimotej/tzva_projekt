import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        loadThemePreference();
    }, []);

    const loadThemePreference = async () => {
        try {
        const themePreference = await AsyncStorage.getItem('themePreference');
        setIsDarkTheme(themePreference === 'dark');
        } catch (e) {
        console.error('Error loading theme preference:', e);
        }
    };

    const toggleTheme = async () => {
        try {
        setIsDarkTheme((prevState) => !prevState);
        await AsyncStorage.setItem('themePreference', isDarkTheme ? 'light' : 'dark');
        } catch (e) {
        console.error('Error saving theme preference:', e);
        }
    };

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;