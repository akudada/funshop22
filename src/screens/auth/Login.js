import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextField from '../../component/inputField';
import {STYLES} from '../../constants/styles';
import {COLORS, IMAGES} from '../../constants/theme';
import {REACT_APP_BASE_URL} from '../../constants/url';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';

export default function Login({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loader, setLoader] = useState(false);

  async function login() {
    console.log(REACT_APP_BASE_URL);
    setLoader(true);

    await axios
      .post(`${REACT_APP_BASE_URL}/login`, {
        email: email,
        password: password,
      })
      .then(async res => {
        console.log(res.data);
        // await AsyncStorage.setItem('@id', res.data._id);
        // await AsyncStorage.setItem('@jwt', res.data.token);
        // await AsyncStorage.setItem('@role', res.data.role);
        // await AsyncStorage.setItem('@email', res.data.email);
        // await AsyncStorage.setItem('@name', res.data.name);
        const value = await AsyncStorage.getItem('@name');
        console.log(value);

        // console.log(res.data.firstName)
        setLoader(false);
        navigation.navigate('HomeTabs');
      })
      .catch(async er => {
        setLoader(false);
        // console.log(er.response.data);

        Alert.alert(
          'Login failed',
          `${
            er.response.data.message
              ? er.response.data.message
              : 'Your Login Credentials are incomplete or wrong'
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
      {!loader ? (
        <View>
          <View
            style={{
              backgroundColor: '#FFF',
              height: '100%',
              paddingHorizontal: 20,
              paddingTop: 20,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                resizeMode="contain"
                style={{width: 25, height: 25, marginBottom: 20}}
                source={IMAGES.back}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: '#000',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Welcome to,{' '}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: COLORS.primary,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                FunShop
              </Text>
            </Text>
            {/* <Text style={[STYLES.h2, {marginTop: 25}]}>Create Account</Text> */}
            <Text style={[STYLES.text, {marginBottom: 10}]}>
              Welcome back, Lets Sign in First!
            </Text>
            <View>
              <Text style={STYLES.h3}>Email</Text>
              <TextField
                onChangeText={text => setEmail(text)}
                label="Enter Your Email"
              />
            </View>
            <View>
              <Text style={STYLES.h3}>Password</Text>
              <TextField
                label="Enter Your Password"
                onChangeText={text => setPassword(text)}
                secureTextEntry={showPassword ? false : true}
                // left={
                //   <TextInput.Icon
                //     name={() => (
                //       <Image
                //         resizeMode="contain"
                //         style={{width: 25}}
                //         source={image}
                //       />
                //     )}
                //   />
                // }
                right={
                  <TextInput.Icon
                    name={() => (
                      <TouchableOpacity
                        onPress={() => {
                          setShowPassword(!showPassword);
                        }}>
                        {showPassword ? (
                          <Image
                            resizeMode="contain"
                            style={{width: 25}}
                            source={IMAGES.passshow}
                          />
                        ) : (
                          <Image
                            resizeMode="contain"
                            style={{width: 25}}
                            source={IMAGES.passhide}
                          />
                        )}
                      </TouchableOpacity>
                    )}
                  />
                }
              />
            </View>
            <TouchableOpacity>
              <Text
                style={[STYLES.text, {alignSelf: 'flex-end', marginTop: 10}]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[STYLES.button, {marginTop: 32}]}
              onPress={() => {
                if (email !== null && password !== null) {
                  login();
                } else {
                  Alert.alert(
                    'Incomplete Credentials',
                    `${
                      email
                        ? 'Please enter your phone number and password.'
                        : 'Please enter your phone number and password.'
                    }`,
                    [
                      {
                        text: 'Ok',
                        onPress: () => console.log('Ok Pressed'),
                      },
                    ],
                  );
                }
              }}>
              <Text style={STYLES.buttonText}>Login</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 25,
              }}>
              <View
                style={{flex: 1, height: 1, backgroundColor: COLORS.grey}}
              />
              <Text
                style={[
                  STYLES.text,
                  {alignSelf: 'center', marginHorizontal: 5},
                ]}>
                Or
              </Text>
              <View
                style={{flex: 1, height: 1, backgroundColor: COLORS.grey}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text style={[STYLES.text, {}]}>Don't have an Account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text
                  style={[
                    STYLES.text,
                    {
                      color: COLORS.primary,
                      fontFamily: 'Poppins-SemiBold',
                    },
                  ]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                STYLES.button,
                {
                  backgroundColor: COLORS.white,
                  marginTop: 20,
                  borderColor: '#E7EAF2',
                  borderWidth: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                },
              ]}>
              <Image
                resizeMode="contain"
                style={{width: 30}}
                source={IMAGES.googleIcon}
              />
              <Text style={STYLES.h3}>Sign In with Google</Text>
            </View>
            {/* <View
              style={[
                STYLES.button,
                {
                  backgroundColor: COLORS.white,
                  marginTop: 20,
                  borderColor: '#E7EAF2',
                  borderWidth: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                },
              ]}>
              <Image
                resizeMode="contain"
                style={{width: 30}}
                source={IMAGES.fbIcon}
              />
              <Text style={STYLES.h3}>Sign In with Facebook</Text>
            </View> */}
          </View>
        </View>
      ) : (
        <View
          style={{
            height: '100%',
            minHeight: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Lottie
            resizeMode="cover"
            style={{
              width: 220,
              height: 220,
            }}
            source={require('../../../assets/images/loader.json')}
            loop={true}
            autoPlay
          />
          {/* <Image
            style={{width: 70, height: 70}}
            source={require('../../../assets/images/waiting.png')}
          /> */}
          {/* <Text style={STYLES.h2}>FunShop</Text> */}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
