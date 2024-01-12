import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Touchable,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import TextField from '../component/inputField';
import {Modal, TextInput} from 'react-native-paper';
import {Dimensions} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import LinearGradient from 'react-native-linear-gradient';

import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, IMAGES} from '../constants/theme';
import {STYLES} from '../constants/styles';
import SideBarModal from '../component/SideBarModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_BASE_URL} from '../constants/url';
import axios from 'axios';
import CardImageComponent from '../component/CardComponent-onlyimage';
import CardDescComponent from '../component/CardComponent-withdesc';

const cardImage = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg',
  'https://example.com/image4.jpg',
  'https://example.com/image5.jpg',
];

const Home = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control the modal
  const [allProducts, setAllProducts] = useState(''); // State to control the modal
  const [categories, setCategories] = useState('');

  useEffect(() => {
    async function getCategotries() {
      const token = await AsyncStorage.getItem('@jwt');
      // const id = await AsyncStorage.getItem('@id');
      // console.log('User ID', id);
      const getAllCategories = await axios({
        method: 'GET',
        url: `${REACT_APP_BASE_URL}/category`,
        headers: {'x-auth-token': token},
      }).catch(err => console.log(err));
      // console.log('category is' + getAllCategories.data.category);
      setCategories(getAllCategories.data.category);
    }
    getCategotries();
    console.log('these are the categories', categories);
    return () => {};
  }, []);

  // useEffect(() => {
  //   async function getProducts() {
  //     const token = await AsyncStorage.getItem('@jwt');
  //     const id = await AsyncStorage.getItem('@id');
  //     console.log('User ID', id);
  //     const getAllProducts = await axios({
  //       method: 'GET',
  //       url: `${REACT_APP_BASE_URL}/product?userid=${id}`,
  //     }).catch(err => console.log(err));
  //     // console.log('product = ' + getAllProducts.data.products[0].productName);
  //     setAllProducts(getAllProducts.data.products);
  //     console.log('All Products', allProducts);
  //   }
  //   getProducts();
  //   return () => {};
  // }, []);

  // const toggleSideBarModal = () => {
  //   setIsModalVisible(!isModalVisible);
  // };

  // const allProducts2 = Array.isArray(allProducts)
  //   ? allProducts.slice(0, 3)
  //   : [];
  // const allProducts3 = Array.isArray(allProducts)
  //   ? allProducts.slice(allProducts.length - 3, allProducts.length)
  //   : [];

  return (
    <SafeAreaView>
      <View>
        <View
          style={{
            backgroundColor: '#FFF',
            paddingHorizontal: 0,
            height: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
              backgroundColor: COLORS.primary,
            }}>
            <KeyboardAvoidingView>
              <TextField
                // onFocus={() => {
                //   setSearchedProductsVisible(true);
                // }}
                // onBlur={() => setSearchedProductsVisible(false)}
                style={{
                  marginBottom: 10,
                  color: '#000',
                  minWidth: '90%',
                  maxWidth: '90%',
                }}
                placeholder="Search"
                // onChangeText={text => {
                //   setSearch(text);
                // }}
                left={
                  <TextInput.Icon
                    name={() => (
                      <Image
                        resizeMode="contain"
                        style={{width: 25}}
                        source={require('../../assets/images/search-u.png')}
                      />
                    )}
                  />
                }
                right={
                  <TextInput.Icon
                    name={
                      () => (
                        // SearchedProductsVisible ? (
                        <TouchableOpacity
                          onPress={() => {
                            setRefresh(!refresh);
                            setSearchedProductsVisible(false);
                            Keyboard.dismiss();
                          }}>
                          <Image
                            resizeMode="contain"
                            style={{width: 25}}
                            source={require('../../assets/images/cross.png')}
                          />
                        </TouchableOpacity>
                      )
                      // ) : (
                      //   ''
                      // )
                    }
                  />
                }
              />
            </KeyboardAvoidingView>
            <TouchableOpacity>
              <Image
                resizeMode="contain"
                style={{width: 35, height: 35, marginRight: 10}}
                source={require('../../assets/images/cart2.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 20,
              marginVertical: 10,
              paddingHorizontal: 10,
              justifyContent: 'space-between',
            }}>
            <View style={styles.circleview_wrapper}>
              <View style={styles.circleview}>
                <Image source={require('../../assets/images/Shirt.png')} />
              </View>
              <Text style={STYLES.h3}>Fashion</Text>
            </View>
            <View style={styles.circleview_wrapper}>
              <View style={styles.circleview}>
                <Image source={require('../../assets/images/elecs.png')} />
              </View>
              <Text style={STYLES.h3}>Electronics</Text>
            </View>
            <View style={styles.circleview_wrapper}>
              <View style={styles.circleview}>
                <Image source={require('../../assets/images/shoes.png')} />
              </View>
              <Text style={STYLES.h3}>Shoes</Text>
            </View>
            <View style={styles.circleview_wrapper}>
              <View style={styles.circleview}>
                <Image source={require('../../assets/images/beauty.png')} />
              </View>
              <Text style={STYLES.h3}>Beauty</Text>
            </View>
            <View style={styles.circleview_wrapper}>
              <View style={styles.circleview}>
                <Image source={require('../../assets/images/gifts.png')} />
              </View>
              <Text style={STYLES.h3}>Gifts</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: '78%',
            }}>
            <ScrollView
              style={{width: '50%'}}
              showsVerticalScrollIndicator={false}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#FFA061', '#FF6600', '#FF6600']}
                style={styles.linearGradient}>
                <Text style={styles.buttonTextcheck}>Electronic Items</Text>
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 25,
                    height: 25,
                  }}>
                  <Image
                    style={{width: 10, height: 12}}
                    source={require('../../assets/images/chev-right.png')}
                  />
                </View>
              </LinearGradient>
            </ScrollView>
            <ScrollView
              style={{width: '50%'}}
              showsVerticalScrollIndicator={false}>
              <Image source={require('../../assets/images/search-u.png')} />
              <Image source={require('../../assets/images/search-u.png')} />
              <Image source={require('../../assets/images/search-u.png')} />
              <Image source={require('../../assets/images/search-u.png')} />
              <Image source={require('../../assets/images/search-u.png')} />
              <Image source={require('../../assets/images/search-u.png')} />
            </ScrollView>
          </View>
          {/* <View>
            <ScrollView
              nestedScrollEnabled={true}
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              alwaysBounceHorizontal={true}
              style={{flex: 1}}>
              <FlatList
                keyboardShouldPersistTaps="handled"
                horizontal={true} // Enable horizontal scrolling
                showsHorizontalScrollIndicator={true}
                scrollEnabled={true}
                // data={allProducts.slice(0, 4)}
                data={allProducts2}
                renderItem={({item}) => <CardImageComponent item={item} />}
                keyExtractor={item => item._id}
                style={{width: '100%'}}
              />
            </ScrollView>
            <View style={{marginTop: 20}}>
              <Text
                style={{
                  fontSize: 24,
                  color: '#000',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Recommended for you
              </Text>
              <FlatList
                // keyboardShouldPersistTaps="handled"
                // horizontal={true} // Enable horizontal scrolling
                // showsHorizontalScrollIndicator={true}
                scrollEnabled={true}
                // data={allProducts.slice(0, 4)}
                data={allProducts3}
                renderItem={({item}) => <CardDescComponent item={item} />}
                keyExtractor={item => item._id}
                style={{width: '100%'}}
              />
            </View>
          </View> */}
        </View>
      </View>
      {/* Side Bar Modal
      <SideBarModal visible={isModalVisible} onClose={toggleSideBarModal} /> */}
    </SafeAreaView>
  );
};

export default Home;

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
  circleview: {
    backgroundColor: '#FCF8F6',
    borderRadius: 100,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  circleview_wrapper: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  linearGradient: {
    flex: 1,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 15,
  },
  buttonTextcheck: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    // textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
