import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Header from '../components/Meje/Header'
import ThemeContext from '../ThemeContext';
import LightTheme from '../LightTheme';
import DarkTheme from '../DarkTheme';
import { MEJE } from '../data/Meje';
import Meja from '../components/Meje/Meja';
import AddMejaModal from '../components/Meje/AddMejaModal';

const MejeScreen = ({navigation}) => {
    const { isDarkTheme} = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleAddMeja = (transactionData) => {
        console.log('New Meja data:', transactionData);
        setIsModalVisible(false);
    };
    return (
        <View style={[{flex: 1, backgroundColor: theme.backgroundColor}]}>
            <Header navigation={navigation} onAddButtonPress={() => setIsModalVisible(true)}/>
            <ScrollView>
                {MEJE.map((meja, index)=>(
                    <Meja meja={meja} key={index} />
                ))}
            </ScrollView>
            <AddMejaModal
                isVisible={isModalVisible}
                onClose={()=>setIsModalVisible(false)}
                onSubmit={handleAddMeja}
            />
        </View>
    )
}

export default MejeScreen

const styles = StyleSheet.create({})