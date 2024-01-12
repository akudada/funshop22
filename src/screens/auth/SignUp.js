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
import {Modal, TextInput} from 'react-native-paper';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextField from '../../component/inputField';
import {STYLES} from '../../constants/styles';
import {COLORS, IMAGES} from '../../constants/theme';
import image from '../../../assets/images/eyeOpen.png';
import {REACT_APP_BASE_URL} from '../../constants/url';
import axios from 'axios';

export default function SignUp({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control the modal
  const [name, setName] = useState(null);
  // const [lastName, setLastName] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setConfirmPassword] = useState(null);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  async function signUp() {
    console.log(REACT_APP_BASE_URL);
    console.log(name);
    // console.log(lastName);
    // console.log(mobile);
    // console.log(email);
    await axios
      .post(`${REACT_APP_BASE_URL}/signup`, {
        name: name,
        email: email,
        password: password,
        role: 'Customer',
      })
      .then(async res => {
        console.log(name);
        console.log(mobile);
        console.log(email);
        // console.log(password);
        console.log(res.data);
        toggleModal();
      })
      .catch(async er => {
        Alert.alert(
          'Your Form is Incomplete or wrong',
          `${
            er.response.data.message
              ? er.response.data.message
              : 'Something went wrong'
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
      <View>
        <View
          style={{
            backgroundColor: '#FFF',
            paddingHorizontal: 20,
            paddingTop: 30,
            height: '100%',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              resizeMode="contain"
              style={{width: 25, height: 25, marginBottom: 20}}
              source={IMAGES.back}
            />
          </TouchableOpacity>
          {/* <View style={{height: 40}}>
            <Text
              style={{
                fontSize: 35,
                color: '#000',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Garata!
            </Text>
          </View> */}
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
            Hi, let’s create an account first!
          </Text>
          <View>
            <Text style={STYLES.h3}>Name</Text>
            <TextField
              onChangeText={text => setName(text)}
              label="Enter Your Name"
            />
          </View>
          <View>
            <Text style={STYLES.h3}>Email</Text>
            <TextField
              onChangeText={text => setEmail(text)}
              label="Enter Your Email Address"
            />
          </View>
          {/* <View>
            <Text style={STYLES.h3}>Phone Number</Text>
            <TextField
              onChangeText={text => setMobile(text)}
              label="Enter Your Phone Number"
            />
          </View> */}
          <View>
            <Text style={STYLES.h3}>Password</Text>
            <TextField
              onChangeText={text => setPassword(text)}
              label="Enter Your Password"
              secureTextEntry={showPassword ? false : true}
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
          <View>
            <Text style={STYLES.h3}>Confirm Password</Text>
            <TextField
              onChangeText={text => setConfirmPassword(text)}
              label="Enter Your Password Again"
              secureTextEntry={showPassword ? false : true}
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
            {password == confirmpassword ? (
              <Text style={[STYLES.h3, {color: COLORS.primary, marginTop: 0}]}>
                Passwords matched!
              </Text>
            ) : (
              <Text style={[STYLES.text, {color: COLORS.black}]}>
                Passwords do not match.
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={[STYLES.button, {marginVertical: 12}]}
            onPress={() => {
              if (
                name !== null &&
                email !== null &&
                password !== null &&
                password == confirmpassword
              ) {
                signUp();
              } else {
                Alert.alert(
                  'Incomplete Form',
                  `${
                    name
                      ? 'Please complete all the requirements'
                      : 'Please complete all the requirements'
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
            <Text style={STYLES.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <View style={{flex: 1, height: 1, backgroundColor: COLORS.grey}} />
            <Text
              style={[STYLES.text, {alignSelf: 'center', marginHorizontal: 5}]}>
              Or
            </Text>
            <View style={{flex: 1, height: 1, backgroundColor: COLORS.grey}} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text style={[STYLES.h3, {marginTop: 0}]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={[
                  STYLES.text,
                  {
                    color: COLORS.primary,
                    fontFamily: 'Poppins-SemiBold',
                  },
                ]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              STYLES.button,
              {
                backgroundColor: COLORS.white,
                marginVertical: 20,
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
        </View>
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent={false}>
        <View style={{height: '80%', borderTopRightRadius: 20}}></View>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              resizeMode="contain"
              style={{width: 250, marginBottom: 20}}
              source={require('../../../assets/images/done.png')}
            />
            <Text style={STYLES.h2}>You are Successfully Signed Up! </Text>
            <Text style={[STYLES.text, {textAlign: 'center', marginTop: 12}]}>
              Your account has been{'\n'}successfully created.
            </Text>
            <TouchableOpacity
              style={[STYLES.button, {marginTop: 50, width: '100%'}]}
              onPress={() => navigation.navigate('Login')}>
              <Text style={STYLES.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    zIndex: 20,
    // flex: 1,
    height: '60%',
    bottom: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  modalContent: {
    alignSelf: 'flex-end',
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: COLORS.white,
    padding: 20,
    alignItems: 'center',
  },
});
