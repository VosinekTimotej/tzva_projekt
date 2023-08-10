import React from 'react';
import { View, Modal, Text, Button, StyleSheet } from 'react-native';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';

const PodrobnoTransakcija = ({ isVisiable, onClose, transakcija, theme}) => {
    const formattedDate = new Date(transakcija.date).toLocaleDateString('en-GB');

    const {t, i18n} = useTranslation();
    return (
        <Modal 
            visible={isVisiable} 
            animationType='slide' 
            transparent
        >
            <View style={styles.modalContainer}>
                <View 
                    style={[
                        styles.modalContent, 
                        {backgroundColor: theme.modalBackgroundColor}
                    ]}
                >
                    <View 
                        style={[
                            styles.naslov, 
                            {backgroundColor: theme.modalBackgroundColor}
                            ]}
                    >
                        <Text 
                            style={[
                                styles.naslovText, 
                                {color: theme.textColor}
                            ]}
                        >{t("Transakcija ID")}: {transakcija.id}</Text>
                    </View> 

                        <Text style={{color: theme.textColor}}>{t("Datum")}: {formattedDate}</Text>
                        <Text style={{color: theme.textColor}}>Id: {transakcija._id}</Text>
                        <Text style={{color: theme.textColor}}>{t("Vrednost")}: 

                            {transakcija.type=='cost' ? 
                                (<Text> -</Text>):
                                (<Text> </Text>)} 
                                {transakcija.value}
                        </Text>
                        <Text style={{color: theme.textColor}}>{t("Tip")}: {transakcija.type}</Text>
                        <Text style={{color: theme.textColor}}>{t("Kategorija")}: {transakcija.category}</Text>
                        <Text style={{color: theme.textColor}}>{t("Komentar")}: {transakcija.comment}</Text>
                        <Text style={{color: theme.textColor}}>{t("Uporabnik")}: {transakcija.user_id}</Text>
                        
                        <View style={styles.buttonContainer}>
                            <Button 
                                title={t("Zapri")} 
                                onPress={onClose} 
                                color={theme.cancelButtonColor}
                            />
                        </View>
                </View>
                
            </View>
        </Modal>
    )
}

export default PodrobnoTransakcija

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
        paddingTop: 10,
    },
})