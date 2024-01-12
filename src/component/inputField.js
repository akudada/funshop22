import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import {COLORS} from '../constants/theme';

export default function InputField(props) {
  return (
    <TextInput
      theme={{roundness: 16}}
      mode="outlined"
      activeOutlineColor={COLORS.primary}
      outlineColor={'#E7EAF2'}
      style={styles.InputFieldStyle}
      ref={props.innerRef}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  InputFieldStyle: {
    backgroundColor: '#FFF',
  },
});
