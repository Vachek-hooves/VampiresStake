import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PuzzleGame = () => {
  return (
    <View style={styles.container}>
      <Text>PuzzleGame</Text>
    </View>
  )
}

export default PuzzleGame

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142C38',
    paddingTop: 50,
  },
})
