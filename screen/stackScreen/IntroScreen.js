import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const IntroScreen = () => {
  const navigation = useNavigation()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('TabNavigator')
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ImageBackground 
      source={require('../../assets/image/bg/bg.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Vampire's Stake:</Text>
        <Text style={styles.subtitle}>Dark Descent</Text>
      </View>
    </ImageBackground>
  )
}

export default IntroScreen

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: 46,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
  },
})