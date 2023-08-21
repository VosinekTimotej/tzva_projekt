import { ScrollView, StyleSheet, Text, View, Alert, TextInput, Image } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { TRANSAKCIJE } from '../data/Transakcije'
import Header from '../components/Transakcije/Header'
import Transakcija from '../components/Transakcije/Transakcija'
import ThemeContext from '../ThemeContext'
import DarkTheme from '../DarkTheme'
import LightTheme from '../LightTheme'
import PodrobnoTransakcija from '../components/Transakcije/PodrobnoTransakcija'
import AddTransakcijo from '../components/Transakcije/AddTransakcijo'
import Footer from '../components/Footer/Footer'
import { useRoute } from '@react-navigation/native';

import { SelectList } from 'react-native-dropdown-select-list';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IP} from "@env"

const apiURL = 'http:'+process.env.IP+':5000' // Rok 

const TransakcijeScreen = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;

    // podrobno screen
    const [selected, setSelected] = useState(null);
    const [isVisiable, setIsVisible] = useState(false);

    // add modal
    const [isAddVisiable, setIsAddVisiable] = useState(false);

    const [transakcije, setTransakcije] = useState([]);
    const [kategorije, setKategorije] = useState([]);

    const [search, setSearch] = useState('');
    const [transactionType, setTransactionType] = useState('all');

    // se pozene ko se nalozi screen
    useEffect(() => {
        const fetchTransakcije = async () => {
            try {
                getTransakcije()
            } catch (error) {
                console.error('Error fetching transakcije:', error);
            }
        };
        const fetchCategories = async () => {
            try {
                getCategories();
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchTransakcije();
        fetchCategories();
    }, []);

    const getTransakcije = async () =>{
        try {
            const token = await AsyncStorage.getItem('userToken');
            const acc = await AsyncStorage.getItem('activeAcc');
            const headers = {
                Authorization: `${token}`, 
                // Account: `${acc}`
            };

            // const response = await axios.get(`${apiURL}/transactions`, { headers });
            const response = await axios.get(`${apiURL}/transactions/acc/${acc}`, { headers });
            setTransakcije(response.data.transakcije)
        } catch (error) {
            console.log('Error: ', error)
            Alert.alert('Error', 'Something went wrong with getting transactions data!');
        }
    }

    const getCategories = async () =>{
        try {
            const token = await AsyncStorage.getItem('userToken');
            const headers = {
                Authorization: `${token}` 
            };
            const response = await axios.get(`${apiURL}/users/category`, { headers });

            const cats = response.data
            setKategorije(cats)
        } catch (error) {
            console.log('Error: ', error)
            Alert.alert('Error', 'Something went wrong with getting categories!');
        }
        
    }
    const createTransakcijo = async (data) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const acc = await AsyncStorage.getItem('activeAcc');
            const headers = {
                Authorization: `${token}`
            };
            const body = {
                acc_id: acc,
                comment: data.comment,
                value: data.value,
                type: data.type,
                category: data.category,
                date: data.date
            }

            const response = await axios.post(`${apiURL}/transactions`, body, { headers });
            // console.log(response.data.transakcija)

            const newTransakcija = response.data.transakcija;
            setTransakcije([...transakcije, newTransakcija])

            // se treba dodat pri kategoriji da se poveca strosek ce imamo cost
            if(data.type === 'cost'){
                data = {
                    category: data.category,
                    value: data.value
                }
                editKategorijaCurrent(data)
            }
        } catch (error) {
            console.log('Error: ', error)
            Alert.alert('Error', 'Something went wrong with adding new transaction!');
        }
    }

    const editKategorijaCurrent = async (data) => {
        try {
            // console.log('moram spremeniti', data)
            const kategorija = kategorije.find(kat => kat.name === data.category);
            // console.log(kategorija ? kategorija._id : null)
            if(kategorija){
                const token = await AsyncStorage.getItem('userToken');
                const headers = {
                    Authorization: `${token}`
                };
                const id = kategorija._id
                const current = data.value
                const body={
                    categoryId: id,
                    current: current
                }
                const response = await axios.put(`${apiURL}/users/category`, body, { headers });

                console.log(response.data)
            }
        } catch (error) {
            console.log('Error: ', error)
            Alert.alert('Error', 'Something went wrong with changing data of category!');
        }
        
    }

    const handlePress = (transakcija) => {
        console.log(transakcija)
        setSelected(transakcija);
        setIsVisible(true);
    };

    const handleAdd = (data) => {
        createTransakcijo(data)
        setIsAddVisiable(true);
    };

    
    const typeData=[
        {key:'1', value:'all'},
        {key:'2', value:'income'},
        {key:'3', value:'cost'}
    ]

    const filteredTransakcije = transakcije.filter((transakcija) => {
        const query = search.toLowerCase();
        const type = transactionType.toLowerCase();

        const typeFilter =
            type === 'all' || transakcija.type.toLowerCase() === type;

        return (
            typeFilter &&
            (transakcija.value.toString().includes(query) ||
                transakcija.comment.toLowerCase().includes(query) ||
                transakcija.category.toLowerCase().includes(query))
        );
    });

    const route = useRoute();
    //console.log(route.name);

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}> 
            <Header navigation={navigation} addPress={()=> setIsAddVisiable(true)}/>
            <View style={styles.searchContainer}>
                <TextInput
                    style={[styles.searchInput, { color: theme.textColor }]}
                    placeholder={t("Jezik")}  //"Search transactions"
                    placeholderTextColor={theme.textColor}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
            <View style={[styles.dropdownContainer, { backgroundColor: theme.backgroundColor, borderBottomColor: theme.borderBottomColor }]}>
                <SelectList 
                    setSelected={(val) => setTransactionType(val)}
                    data={typeData}
                    save='value'
                    boxStyles={{borderRadius:4, marginLeft: 3, marginRight: 3,}}
                    inputStyles={{color: theme.textColor}}
                    dropdownTextStyles={{color: theme.textColor}}
                    searchicon={<Image style={styles.searchIcon} source={theme.searchSource} />}
                    arrowicon={<Image style={styles.searchIcon} source={theme.dropdownSource} />}
                    closeicon={<Image style={styles.searchIcon} source={theme.closeSource} />}
                />
            </View>
            
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {transakcije.length === 0 ? (
                    <Text style={[styles.noTransactionsText, {color: theme.textColor} ]}>Ni transakcij</Text>
                ) : (
                    filteredTransakcije.map((transakcija) => (
                        <Transakcija transakcija={transakcija} key={transakcija._id} handlePress={handlePress} />
                    ))
                )}
            </ScrollView>

            {selected? (
                <>
                    <PodrobnoTransakcija 
                        isVisiable={isVisiable}
                        onClose={()=>setIsVisible(false)}
                        transakcija={selected}
                        theme={theme}
                    />
                </>
            ):(
                <></>
            )}

            <AddTransakcijo 
                isVisible={isAddVisiable}
                onClose={()=> setIsAddVisiable(false)}
                onSubmit={handleAdd}
                theme={theme}
                kategorije={kategorije}
            />
            <View style={styles.footer}>
                <Footer navigation={navigation}/>
            </View>
        </View>
    )
}

export default TransakcijeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },

    noTransactionsText: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20, 
    },
    searchContainer:{
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    searchInput:{
        fontSize: 15,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    dropdownContainer:{
        paddingTop: 10,
        paddingBottom: 10,
        // marginLeft: 3,
        // marginRight: 3,
        borderBottomWidth: 1,
    },
    searchIcon:{
        height: 20,
        width: 20,
    },

    footer:{
        backgroundColor: "blue",
        padding: 0,
      },
})