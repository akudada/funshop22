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
import React, {useEffect, useLayoutEffect, useState, useCallback} from 'react';
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
import CardDescComponent from '../component/CardComponent-withdesc';
import {useFocusEffect} from '@react-navigation/native';

const fetchWishlistAndFilterProducts = async setThisWishlist => {
  const id = await AsyncStorage.getItem('@id');
  const getThisWishlist = await axios({
    method: 'GET',
    url: `${REACT_APP_BASE_URL}/wishlist?userid=${id}`,
  }).catch(err => console.log(err));

  // Extract wishlist IDs
  const wishlistIds = getThisWishlist.data.wishlist.products;

  // Filter products
  setThisWishlist(wishlistIds);
};

const Favourites = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control the modal
  const [allProducts, setAllProducts] = useState([]); // State to control the modal
  const [allProducts2, setAllProducts2] = useState([]); // State to control the modal
  const [allProducts3, setAllProducts3] = useState([]); // State to control the modal

  const [thisWishlist, setThisWishlist] = useState([]); // State to control the modal
  const [matchingProducts, setMatchingProducts] = useState([]);

  useFocusEffect(
    useCallback(() => {
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
        console.log('All Products', getAllProducts.data.products);
        fetchWishlistAndFilterProducts(setThisWishlist);
        setAllProducts2(
          Array.isArray(getAllProducts.data.products)
            ? getAllProducts.data.products.slice(0, 3)
            : [],
        );
        setAllProducts3(
          Array.isArray(getAllProducts.data.products)
            ? getAllProducts.data.products.slice(
                getAllProducts.data.products.length - 3,
                getAllProducts.data.products.length,
              )
            : [],
        );
      }
      getProducts();
      return () => {};
    }, []),
  );

  // setAllProducts2(allProducts);

  // var allProducts2 = temp;
  // allProducts2 = allProducts2.reverse();

  // useEffect(() => {
  //   async function getWishlist() {
  //     const id = await AsyncStorage.getItem('@id');
  //     console.log('User ID', id);
  //     const getThisWishlist = await axios({
  //       method: 'GET',
  //       url: `${REACT_APP_BASE_URL}/wishlist?userid=${id}`,
  //     }).catch(err => console.log(err));
  //     // console.log('wishlist data= ' + getThisWishlist.data);
  //     setThisWishlist(getThisWishlist.data.wishlist.products);
  //     console.log('Wishlist36', thisWishlist);
  //   }
  //   getWishlist();
  //   return () => {};
  // }, []);

  // const wishlistIds = thisWishlist;

  // const matchingProducts = allProducts.filter(product =>
  //   wishlistIds.includes(product._id),
  // );

  // console.log('Matching Products19:', matchingProducts);

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
                width: '68%',
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
                  fontFamily: 'Poppins',
                }}>
                Cards you have liked!
              </Text>
            </View>
            {thisWishlist.length > 0 ? (
              <FlatList
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={true}
                data={thisWishlist}
                extraData={thisWishlist}
                renderItem={({item}) => <CardDescComponent item={item} />}
                keyExtractor={item => item._id.toString()}
              />
            ) : (
              <View>
                <Text
                  style={[
                    STYLES.h2,
                    {textAlign: 'center', marginTop: 10, fontFamily: 'Poppins'},
                  ]}>
                  You do not have any favourites yet
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Explore')}>
                  <Text
                    style={[
                      STYLES.h2,
                      {
                        textAlign: 'center',
                        backgroundColor: COLORS.secondary,
                        alignSelf: 'center',
                        padding: 6,
                        marginTop: 5,
                        borderRadius: 20,
                        borderTopLeftRadius: 0,
                        width: '40%',
                        color: COLORS.white,
                      },
                    ]}>
                    Explore Now!
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View>
            <View
              style={{
                marginTop: 18,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 5,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#000',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Most Popular
              </Text>
              <Pressable onPress={() => navigation.navigate('Explore')}>
                <Text style={[STYLES.h2, {color: '#964B00'}]}>See All</Text>
              </Pressable>
            </View>
            <View>
              {/* <ScrollView
                nestedScrollEnabled={true}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                alwaysBounceHorizontal={true}
                style={{flex: 1}}> */}
              {allProducts2 ? (
                <FlatList
                  keyboardShouldPersistTaps="handled"
                  horizontal={true} // Enable horizontal scrolling
                  showsHorizontalScrollIndicator={true}
                  scrollEnabled={true}
                  data={allProducts2}
                  extraData={allProducts2}
                  renderItem={({item}) => <CardImageComponent item={item} />}
                  keyExtractor={item => item._id}
                  style={{width: '100%'}}
                />
              ) : (
                ''
              )}
              {/* </ScrollView> */}
            </View>
          </View>
          <View>
            <View
              style={{
                marginTop: 18,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 5,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#000',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Recommended
              </Text>
              <Pressable onPress={() => navigation.navigate('Explore')}>
                <Text style={[STYLES.h2, {color: '#964B00'}]}>See All</Text>
              </Pressable>
            </View>
            <View>
              {/* <ScrollView
                nestedScrollEnabled={true}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                alwaysBounceHorizontal={true}
                style={{flex: 1}}> */}
              {allProducts3 ? (
                <FlatList
                  keyboardShouldPersistTaps="handled"
                  horizontal={true} // Enable horizontal scrolling
                  showsHorizontalScrollIndicator={true}
                  scrollEnabled={true}
                  inverted={true}
                  data={allProducts3}
                  extraData={allProducts3}
                  renderItem={({item}) => <CardImageComponent2 item={item} />}
                  keyExtractor={item => item._id}
                  style={{width: '100%'}}
                />
              ) : (
                ''
              )}
              {/* </ScrollView> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favourites;

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
