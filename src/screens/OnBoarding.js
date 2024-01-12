import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {COLORS, IMAGES} from '../constants/theme';

const OnBoarding = ({navigation}) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace('HomeTabs')}
      onDone={() => navigation.navigate('HomeTabs')}
      bottomBarColor="#fff"
      titleStyles={{
        fontSize: 24,
        color: COLORS.black,
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
      }}
      subTitleStyles={{
        fontSize: 14.5,
        color: COLORS.grey,
        fontWeight: '400',
        paddingHorizontal: 60,
        lineHeight: 24,
      }}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={IMAGES.onb1} />,
          title: 'Explore Live Auctions',
          subtitle:
            'Dive into the world of live auctions where buyers and sellers connect instantly.',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={IMAGES.onb2} />,
          title: 'Set Your Price',
          subtitle:
            'Buyers set prices, sellers accept or reject. Simple, flexible, and on your terms',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={IMAGES.onb3} />,
          title: 'Beyond Auctions',
          subtitle:
            'Auctions or direct purchases, you choose. Start exploring now!',
        },
      ]}
    />
  );
};

export default OnBoarding;

const styles = StyleSheet.create({});
