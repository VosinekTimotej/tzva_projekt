import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import SignedInStack, { SignedOutStack } from './navigation';
import { ThemeProvider } from './ThemeContext';

export default function App() {
  return (
    // <HomeScreen/>
    // <SignedInStack />
    <ThemeProvider>
      <SignedOutStack />
    </ThemeProvider>
    
  );
}

