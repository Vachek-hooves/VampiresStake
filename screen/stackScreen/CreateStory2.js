import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CreateStory2 = ({route}) => {
  const {characterName} = route.params;
  return (
    <View>
      <Text>CreateStory2</Text>
      <Text>{characterName}</Text>
    </View>
  );
};

export default CreateStory2;

const styles = StyleSheet.create({});
