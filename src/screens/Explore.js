import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Touchable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextField from '../component/inputField';
import {TextInput} from 'react-native-paper';
import {Dimensions} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, IMAGES} from '../constants/theme';
import {STYLES} from '../constants/styles';
import CardDescComponent from '../component/CardComponent-withdesc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {REACT_APP_BASE_URL} from '../constants/url';
import CardImageComponent2 from '../component/CardComponent-onlyimage2';
import {useFocusEffect} from '@react-navigation/native';

const Explore = ({navigation}) => {
  const [allProducts, setAllProducts] = useState(''); // State to control the modal
  const [SearchedProductsVisible, setSearchedProductsVisible] = useState('');
  const [SearchedProductsVisible2, setSearchedProductsVisible2] = useState('');

  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredProducts2, setFilteredProducts2] = useState([]);

  const [SelectedProductType, setSelectedProductType] = useState('');

  useEffect(() => {
    async function getProducts() {
      const token = await AsyncStorage.getItem('@jwt');
      const id = await AsyncStorage.getItem('@id');
      console.log('User ID', id);
      const getAllProducts = await axios({
        method: 'GET',
        url: `${REACT_APP_BASE_URL}/product?userid=${id}`,
      }).catch(err => console.log(err));
     // console.log('product = ' + getAllProducts.data.products[0].productName);
      setAllProducts(getAllProducts.data.products);
      console.log('All Products', allProducts);
    }
    getProducts();
    return () => {};
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = allProducts.filter(item => {
        const productNameMatch = item.productName
          .toLowerCase()
          .includes(search.toLowerCase());
        const productDetailMatch = item.productDetail
          .toLowerCase()
          .includes(search.toLowerCase());
        const productTypeMatch = item.productType
          .toLowerCase()
          .includes(search.toLowerCase());

        return productNameMatch || productDetailMatch || productTypeMatch;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [search, allProducts]);

  // Function to filter products by product type
  const filterProductsByType = productType => {
    const filtered2 = allProducts.filter(item => {
      return item.productType.toLowerCase() === productType.toLowerCase();
    });
    setFilteredProducts2(filtered2);
  };

  const allProducts2 = Array.isArray(allProducts)
    ? allProducts.slice(0, 3)
    : [];
  const allProducts3 = Array.isArray(allProducts)
    ? allProducts.slice(allProducts.length - 3, allProducts.length)
    : [];

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#FFF',
            padding: 20,
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  marginRight: '34%',
                }}
                source={IMAGES.back}
              />
            </TouchableOpacity>
            <Text style={STYLES.h2}>Explore</Text>
            {/* <Image
              resizeMode="contain"
              style={{width: 0, height: 0, borderRadius: 100}}
              source={IMAGES.logo}
            /> */}
          </View>
          <KeyboardAvoidingView>
            <TextField
              onFocus={() => {
                setSearchedProductsVisible(true);
              }}
              // onBlur={() => setSearchedProductsVisible(false)}
              style={{marginBottom: 10, color: '#000'}}
              placeholder="Find your favourite cards"
              onChangeText={text => {
                setSearch(text);
              }}
              left={
                <TextInput.Icon
                  name={() => (
                    <Image
                      resizeMode="contain"
                      style={{width: 25}}
                      source={IMAGES.search}
                    />
                  )}
                />
              }
              right={
                <TextInput.Icon
                  name={() =>
                    SearchedProductsVisible ? (
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
                    ) : (
                      ''
                    )
                  }
                />
              }
            />
          </KeyboardAvoidingView>
          <View
            style={[
              styles.optionBox,
              {display: SearchedProductsVisible ? 'flex' : 'none'},
            ]}>
            <FlatList
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={true}
              data={filteredProducts}
              renderItem={({item}) => <CardDescComponent item={item} />}
              keyExtractor={item => item._id}
            />
          </View>
          {/* <TextField
            style={{marginTop: 30}}
            placeholder="Find your favourite cards"
            left={
              <TextInput.Icon
                name={() => (
                  <Image
                    resizeMode="contain"
                    style={{width: 25}}
                    source={IMAGES.search}
                  />
                )}
              />
            }
          /> */}
          {!SearchedProductsVisible ? (
            <View>
              <View
                style={{
                  marginTop: 18,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    color: '#000',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Categories
                </Text>
                {SearchedProductsVisible2 ? (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedProductType('');
                      filterProductsByType('');
                      setSearchedProductsVisible2(!SearchedProductsVisible2);
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{width: 25, height: 25}}
                      source={require('../../assets/images/cross.png')}
                    />
                  </TouchableOpacity>
                ) : (
                  ''
                )}
              </View>
              <View>
                <ScrollView
                  nestedScrollEnabled={true}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  alwaysBounceHorizontal={true}
                  style={{
                    flex: 1,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedProductType('Relationships');
                      filterProductsByType('Relationships');
                      setSearchedProductsVisible2(true);
                    }}
                    style={[
                      SelectedProductType === 'Relationships'
                        ? STYLES.button2
                        : STYLES.button2a,
                      {marginRight: 20},
                    ]}>
                    <Text
                      style={
                        SelectedProductType === 'Relationships'
                          ? STYLES.buttonText2
                          : STYLES.buttonText2a
                      }>
                      Relationships
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedProductType('Observances');
                      filterProductsByType('Observances');
                      setSearchedProductsVisible2(true);
                    }}
                    style={[
                      SelectedProductType === 'Observances'
                        ? STYLES.button2
                        : STYLES.button2a,
                      {marginRight: 20},
                    ]}>
                    <Text
                      style={
                        SelectedProductType === 'Observances'
                          ? STYLES.buttonText2
                          : STYLES.buttonText2a
                      }>
                      Observances
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedProductType('Inspiration');
                      filterProductsByType('Inspiration');
                      setSearchedProductsVisible2(true);
                    }}
                    style={[
                      SelectedProductType === 'Inspiration'
                        ? STYLES.button2
                        : STYLES.button2a,
                      {marginRight: 20},
                    ]}>
                    <Text
                      style={
                        SelectedProductType === 'Inspiration'
                          ? STYLES.buttonText2
                          : STYLES.buttonText2a
                      }>
                      Inspiration & Motivation
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedProductType('Health');
                      filterProductsByType('Health');
                      setSearchedProductsVisible2(true);
                    }}
                    style={[
                      SelectedProductType === 'Health'
                        ? STYLES.button2
                        : STYLES.button2a,
                      {marginRight: 20},
                    ]}>
                    <Text
                      style={
                        SelectedProductType === 'Health'
                          ? STYLES.buttonText2
                          : STYLES.buttonText2a
                      }>
                      Health & Wellness
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedProductType('Religion');
                      filterProductsByType('Religion');
                      setSearchedProductsVisible2(true);
                    }}
                    style={[
                      SelectedProductType === 'Religion'
                        ? STYLES.button2
                        : STYLES.button2a,
                      {marginRight: 20},
                    ]}>
                    <Text
                      style={
                        SelectedProductType === 'Religion'
                          ? STYLES.buttonText2
                          : STYLES.buttonText2a
                      }>
                      Religion & Spirituality
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
                <View
                  style={[
                    styles.optionBox,
                    {display: SearchedProductsVisible2 ? 'flex' : 'none'},
                  ]}>
                  <FlatList
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={true}
                    data={filteredProducts2}
                    renderItem={({item}) => <CardDescComponent item={item} />}
                    keyExtractor={item => item._id}
                  />
                </View>
                {!SearchedProductsVisible2 ? (
                  <View>
                    <View style={{marginTop: 20}}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#000',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Most Popular
                      </Text>
                      <FlatList
                        // keyboardShouldPersistTaps="handled"
                        // horizontal={true} // Enable horizontal scrolling
                        // showsHorizontalScrollIndicator={true}
                        scrollEnabled={true}
                        // data={allProducts.slice(0, 4)}
                        data={allProducts2}
                        renderItem={({item}) => (
                          <CardDescComponent item={item} />
                        )}
                        keyExtractor={item => item._id}
                        style={{width: '100%'}}
                      />
                    </View>
                    <View
                      style={{
                        marginTop: 18,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#000',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Recommended
                      </Text>
                    </View>
                    <FlatList
                      keyboardShouldPersistTaps="handled"
                      horizontal={true} // Enable horizontal scrolling
                      showsHorizontalScrollIndicator={true}
                      scrollEnabled={true}
                      inverted={true}
                      data={allProducts3}
                      renderItem={({item}) => (
                        <CardImageComponent2 item={item} />
                      )}
                      keyExtractor={item => item._id}
                      style={{width: '100%'}}
                    />
                  </View>
                ) : (
                  ''
                )}
              </View>
            </View>
          ) : (
            ''
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Explore;

const styles = StyleSheet.create({});
