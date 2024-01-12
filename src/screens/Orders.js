import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextField from '../component/inputField';
import {Modal, TextInput} from 'react-native-paper';
import {Dimensions} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, IMAGES} from '../constants/theme';
import {STYLES} from '../constants/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_BASE_URL} from '../constants/url';
import axios from 'axios';
import CardImageComponent from '../component/CardComponent-onlyimage';
import CardImageComponent2 from '../component/CardComponent-onlyimage2';

const cardImage = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg',
  'https://example.com/image4.jpg',
  'https://example.com/image5.jpg',
];

const Orders = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control the modal

  const [allProducts, setAllProducts] = useState(''); // State to control the modal
  // const [allProducts2, setAllProducts2] = useState(false); // State to control the modal

  useEffect(() => {
    async function getProducts() {
      const token = await AsyncStorage.getItem('@jwt');
      const id = await AsyncStorage.getItem('@id');
      console.log('User ID', id);
      const getAllProducts = await axios({
        method: 'GET',
        url: `${REACT_APP_BASE_URL}/product?userid=${id}`,
      }).catch(err => console.log(err));
      console.log('product = ' + getAllProducts.data.products[0].productName);
      setAllProducts(getAllProducts.data.products);
      console.log('All Products', allProducts);
      // setCompany(companyData.data.company[0]);
      // setDemo(!companyData.data.company[0].name);
    }
    getProducts();
    return () => {};
  }, []);

  // setAllProducts2(allProducts);
  const allProducts2 = Array.isArray(allProducts)
    ? allProducts.slice(0, 3)
    : [];
  const allProducts3 = Array.isArray(allProducts)
    ? allProducts.slice(allProducts.length - 3, allProducts.length)
    : [];
  // var allProducts2 = temp;
  // allProducts2 = allProducts2.reverse();

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#FFF',
            padding: 10,
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {/* <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Image
                resizeMode="contain"
                style={{width: 35, height: 35}}
                source={IMAGES.menu}
              />
            </TouchableOpacity> */}
            <Text style={STYLES.h2}>Garata Publishing House</Text>
            <Image
              resizeMode="contain"
              style={{width: 35, height: 35, borderRadius: 100}}
              source={IMAGES.logo}
            />
          </View>
          <View style={{}}>
            <View
              style={{
                backgroundColor: COLORS.primary,
                width: '42%',
                borderRadius: 20,
                borderBottomRightRadius: 0,
                marginTop: 30,
                color: '#fff',
                padding: 10,
              }}>
              <Text
                style={{
                  fontSize: 22,
                  color: '#fff',
                  lineHeight: 28,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Your Orders:
              </Text>
            </View>
            <View>
              <Text
                style={[
                  STYLES.h2,
                  {textAlign: 'center', marginTop: 10, fontFamily: 'Poppins'},
                ]}>
                You have not ordered a card yet.
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
                <Text
                  style={[
                    STYLES.h2,
                    {
                      textAlign: 'center',
                      backgroundColor: COLORS.secondary,
                      alignSelf: 'center',
                      padding: 6,
                      borderRadius: 20,
                      marginTop: 5,
                      borderTopLeftRadius: 0,
                      width: '40%',
                      color: COLORS.white,
                    },
                  ]}>
                  Order Now!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  modalContainer: {
    // zIndex: 20,
    // flex: 1,
    marginTop: -22,
    width: '70%',
    height: '110%',
    // bottom: 0,
    // flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  modalContent: {
    // alignSelf: 'flex-end',
    width: '100%',
    backgroundColor: COLORS.white,
    padding: 10,
    // alignItems: 'center',
  },
  modalContainer2: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
