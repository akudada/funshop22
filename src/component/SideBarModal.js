import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import {Modal} from 'react-native-paper';
import GestureRecognizer from 'react-native-swipe-gestures';
import {STYLES} from '../constants/styles';
import {COLORS, IMAGES} from '../constants/theme';

const SideBarModal = ({onClose, visible, navigation}) => {
  const window = Dimensions.get('screen');

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      {/* <View style={{width: '40%'}}></View> */}
      <View
        style={{
          flexDirection: 'row',
          height: window.height * 0.75,
          position: 'absolute',
          left: 0,
          width: '100%',
          alignSelf: 'center',
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <Text style={STYLES.h2}>Garata Publishing House</Text>
            </View>
            <Text style={STYLES.h2}>Garata Publishing House</Text>
          </View>
        </View>
        <GestureRecognizer
          onSwipeLeft={onClose}
          config={config}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.modalContainer2}>
            <TouchableOpacity onPress={onClose}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: COLORS.white,
                  padding: 5,
                  borderRadius: 50,
                }}>
                <Image style={{width: 30, height: 30}} source={IMAGES.back} />
              </View>
            </TouchableOpacity>
          </View>
        </GestureRecognizer>
      </View>
    </Modal>
  );
};

export default SideBarModal;

const styles = StyleSheet.create({
  modalContainer: {
    // zIndex: 20,
    // flex: 1,
    width: '70%',
    borderBottomRightRadius: 50, // height: '110%',
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
    // height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
