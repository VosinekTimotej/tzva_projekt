import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import SignedInStack, { SignedOutStack } from './navigation';
import ThemeContext, { ThemeProvider } from './ThemeContext';
import { useContext } from 'react';
import Toast from 'react-native-toast-message';

import 'react-native-get-random-values';


export default function App() {
  // const { isDarkTheme } = useContext(ThemeContext);
  return (
    // <HomeScreen/>
    // <SignedInStack />
    // <SafeAreaView>
    //   <ThemeProvider>
    //     <SignedOutStack />
    //   </ThemeProvider>
    // </SafeAreaView>
    <ThemeProvider>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
      </View>
      {/* <View>
        <SignedOutStack />
      </View> */}
      <SignedOutStack />
      <Toast />
    </ThemeProvider>
    
  );
}

const styles = StyleSheet.create({
  container:{
      paddingTop: 40
  },
})
