import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import SignedInStack, { SignedOutStack } from './navigation';
import ThemeContext, { ThemeProvider } from './ThemeContext';
import { useContext, useState } from 'react';
import Footer from './components/Footer/Footer';
import {useTranslation} from 'react-i18next';
import './assets/i18n/i18n';

export default function App() {
  // const { isDarkTheme } = useContext(ThemeContext);
  console.log()

  const {t, i18n} = useTranslation();
  

  
  const [currentLanguage,setLanguage] =useState('si');
 

  return (
    // <HomeScreen/>
    // <SignedInStack />
    // <SafeAreaView>
    //   <ThemeProvider>
    //     <SignedOutStack />
    //   </ThemeProvider>
    // </SafeAreaView>
    <ThemeProvider>
      <View style={styles.contain}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
      </View>
      {/* <View>
        <SignedOutStack />
      </View> */}
      <SignedOutStack />
      {/*<View style={styles.footer}>
        
        <Footer/>
      </View>*/}
      </View>
      
    </ThemeProvider>
    
  );
}

const styles = StyleSheet.create({
  container:{
      paddingTop: 40
  },
  contain:{
    flex: 1,
  },
  footer:{
    backgroundColor: "blue",
    padding: 0,
  },
})
