import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Touchable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import TextField from '../../component/inputField';
import {TextInput} from 'react-native-paper';
import {Dimensions} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, IMAGES} from '../../constants/theme';
import {STYLES} from '../../constants/styles';
import axios from 'axios';
import {REACT_APP_BASE_URL} from '../../constants/url';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SingleProduct = ({navigation, route}) => {
  const data = route.params;
  const [image, setImage] = useState('');
  const imageSource = data.image;
  const [thisWishlist, setThisWishlist] = useState([]); // State to control the modal
  const [ItemExistsInWishlist, setItemExistsInWishlist] = useState('');
  console.log('item log2:', data.item);

  let rating = data.item.productRating;
  console.log(rating);

  function StarRating({rating}) {
    // Round the rating to the nearest integer
    const roundedRating = Math.round(rating);

    // Create an array of star icons based on the rating
    const stars = [];
    for (let i = 0; i < roundedRating; i++) {
      stars.push(
        <Image
          style={{width: 20, height: 20}}
          source={require('../../../assets/images/star-f.png')}
          key={i}
        />,
      );
    }

    return <View style={{flexDirection: 'row', gap: 5}}>{stars}</View>;
  }

  useEffect(() => {
    async function getWishlist() {
      const id = await AsyncStorage.getItem('@id');
      console.log('User ID', id);
      const getThisWishlist = await axios({
        method: 'GET',
        url: `${REACT_APP_BASE_URL}/wishlist?userid=${id}`,
      }).catch(err => console.log(err));

      console.log('Wishlist36', getThisWishlist.data.wishlist.products);

      const ExistsInWishlist = getThisWishlist.data.wishlist.products.some(
        product => product._id === data.item._id,
      );

      if (ExistsInWishlist) {
        console.log('Item is in the wishlist');
        setItemExistsInWishlist(true);
      } else {
        console.log('Item is not in the wishlist');
      }
    }
    getWishlist();
    return () => {};
  }, []);

  async function wishlist() {
    console.log('Add to Fav pressed');
    const id = await AsyncStorage.getItem('@id');

    await axios
      .post(`${REACT_APP_BASE_URL}/wishlist`, {
        id: id,
        productid: data.item._id,
      })
      .then(async res => {
        console.log(res.data);
        setItemExistsInWishlist(!ItemExistsInWishlist);
      })
      .catch(async er => {
        Alert.alert(
          'Operation failed',
          `${
            er.response.data.message
              ? er.response.data.message
              : 'There was something wrong'
          }`,
          [
            {
              text: 'Try Again',
              onPress: () => console.log('Try again Pressed'),
            },
          ],
        );
      });
  }

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: '#FFF',
          padding: 20,
          height: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
              }}
              source={IMAGES.back}
            />
          </TouchableOpacity>
          <Text style={[STYLES.h2, {fontFamily: 'Poppins'}]}>
            Product Preview
          </Text>
          <Image
            resizeMode="contain"
            style={{width: 30, height: 30, borderRadius: 100}}
            source={IMAGES.logo}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            flex: 1,
          }}>
          <Text style={styles.h2}>{data.item.productName}</Text>
          <Image style={styles.image} source={{uri: imageSource}} />
          {/* <ScrollView
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
              data={}
              renderItem={({item}) => <Image source={} />}
              keyExtractor={item => item._id}
              style={{width: '100%'}}
            />
          </ScrollView> */}
          <Text style={styles.text}>{data.item.productDetail}</Text>
          <View
            style={{
              marginTop: 10,
              width: '80%',
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: COLORS.secondary,
              borderRadius: 20,
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={[styles.price, {fontFamily: 'Poppins-SemiBold'}]}>
                Price:{' '}
                <Text style={styles.price}>{data.item.productPrice}$</Text>
              </Text>
              <Text style={[styles.price, {fontFamily: 'Poppins-SemiBold'}]}>
                Category:{' '}
                <Text style={styles.price}>{data.item.productType}</Text>
              </Text>
            </View>
            <View
              style={{
                alignSelf: 'center',
                marginTop: 10,
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <Text style={[styles.price, {fontFamily: 'Poppins-SemiBold'}]}>
                Rating: <Text style={styles.price}>{rating}</Text>
              </Text>
              {/* Render the star rating component */}
              <StarRating rating={rating} />
            </View>
          </View>
          <View style={{marginTop: 20, flexDirection: 'column', gap: 10}}>
            <TouchableOpacity
              style={{
                width: '80%',
                alignSelf: 'center',
                padding: 15,
                // borderWidth: 1,
                backgroundColor: COLORS.primary,
                borderRadius: 50,
                textAlign: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontFamily: 'Poppins-SemiBold',
                  color: '#FFF',
                }}>
                Customize
              </Text>
              <Image
                style={{width: 15, height: 15, marginTop: 3}}
                source={require('../../../assets/images/edit.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => wishlist()}
              style={{
                width: '80%',
                alignSelf: 'center',
                padding: 15,
                borderWidth: ItemExistsInWishlist ? 0 : 1,
                borderColor: ItemExistsInWishlist ? '' : COLORS.primary,
                backgroundColor: ItemExistsInWishlist
                  ? COLORS.primary
                  : COLORS.white,
                borderRadius: 50,
                textAlign: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontFamily: 'Poppins-SemiBold',
                  color: ItemExistsInWishlist ? COLORS.white : COLORS.black,
                }}>
                {ItemExistsInWishlist
                  ? 'Remove from Favorites'
                  : 'Add to Favorites'}
              </Text>
              <Image
                style={{width: 15, height: 15, marginTop: 3}}
                source={
                  ItemExistsInWishlist
                    ? require('../../../assets/images/cart.png')
                    : require('../../../assets/images/black-cart.png')
                }
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button2}>
              <Text style={styles.buttonText2}>Rate</Text>
              <Image
                style={{width: 15, height: 15, marginTop: 3}}
                source={require('../../../assets/images/star-f.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({
  h2: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    borderBottomWidth: 2,
    width: '80%',
    alignSelf: 'center',
    borderColor: COLORS.primary,
  },
  image: {
    resizeMode: 'contain',
    minWidth: 200,
    minHeight: 280,
    maxHeight: 320,
    maxWidth: 236,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 0.8,
    borderColor: COLORS.secondary,
  },
  text: {
    width: '80%',
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '600',
    color: COLORS.black,
    fontFamily: 'Poppins',
    alignSelf: 'center',
    borderColor: COLORS.primary,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
    fontFamily: 'Poppins',
    borderColor: COLORS.primary,
  },
  button: {
    width: '80%',
    alignSelf: 'center',
    padding: 15,
    // borderWidth: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  button2: {
    width: '80%',
    alignSelf: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 50,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFF',
  },
  buttonText2: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Poppins',
    color: '#000',
    padding: 0,
  },
});
