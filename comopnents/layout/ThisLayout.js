import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';

const ThisLayout = ({children}) => {
  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../assets/image/bg/bg.png')}>
      {children}
    </ImageBackground>
  );
};

export default ThisLayout;

const styles = StyleSheet.create({});
