import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const Character = ({navigation}) => {
  const handleCreateCharacter = () => {
    // Navigation to character creation will be implemented later
    // navigation.navigate('CreateCharacter')
    navigation.navigate('CharacterCreate');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Let's bring your character to life!</Text>

        <Text style={styles.description}>
          It looks like you don't have any characters yet. Start creating your
          unique hero or villain by clicking the button below. Customize every
          detail, from their appearance to their story. Your imagination is the
          only limit!
        </Text>

        <Text style={styles.readyText}>Ready to begin?</Text>

        <TouchableOpacity style={styles.button} onPress={handleCreateCharacter}>
          <Text style={styles.buttonText}>Create Character</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Character;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142C38',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'left',
    lineHeight: 24,
    marginBottom: 20,
  },
  readyText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
});
