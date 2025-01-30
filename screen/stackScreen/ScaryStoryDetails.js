import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ScaryStoryDetails = ({route}) => {
  const {story} = route.params;
  console.log(story);
  return (
    <View>
      <Text>ScaryStoryDetails</Text>
    </View>
  )
}

export default ScaryStoryDetails

const styles = StyleSheet.create({})