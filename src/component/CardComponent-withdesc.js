import {
  View,
  Image,
  Text,
  Pressable,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../utils/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {REACT_APP_BASE_URL} from '../constants/url';
import {STYLES} from '../constants/styles';
const CardDescComponent = ({item}) => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  // console.log('Item is here', item);

  useLayoutEffect(() => {
    async function getProductImages() {
      axios
        .get(`${REACT_APP_BASE_URL}/files/${item.productPicture[0]}/true`)
        .then(image => {
          setImage(
            `data:${image.headers['content-type']};base64,${image.data}`,
          );
        });
    }
    getProductImages();
  }, []);

  const handleNavigation = () => {
    if (item) {
      console.log('item log 1:', item);
      navigation.navigate('SingleProduct', {item: item, image: image});
    } else {
      console.warn('Item is undefined, unable to navigate.');
    }
  };

  return (
    <TouchableOpacity onPress={handleNavigation}>
      <View
        style={{
          width: '90%',
          paddingRight: 80,
          height: 90,
          marginTop: 15,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
        <Image
          resizeMode="cover"
          style={{
            width: 80,
            height: 80,
            borderRadius: 16,
            marginRight: 16,
          }}
          source={
            image ? {uri: image} : require('../../assets/images/orange.png')
          }
        />
        <View style={{height: '100%', justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 16,
              color: '#000',
              fontFamily: 'Poppins-SemiBold',
            }}>
            {item.productName}
          </Text>
          <Text style={STYLES.text}>{item.productDetail}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardDescComponent;
