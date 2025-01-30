import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useVampireContext} from '../../store/context';

const Story = () => {
  const {stories} = useVampireContext();
  const navigation = useNavigation();
  console.log(stories);

  const handleStartWriting = () => {
    // Navigate to story creation screen
    navigation.navigate('CreateStory');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your Story Awaits</Text>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Every great tale starts with a single idea. Bring your imagination
            to life by weaving stories with the characters you've created.
          </Text>

          <Text style={styles.description}>
            Dive into the shadows, craft your plots, and let your legends
            unfold. Your next masterpiece is waiting to be written!
          </Text>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartWriting}>
          <Text style={styles.startButtonText}>Start Writing</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Story;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142C38',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
    fontStyle: 'italic',
  },
  descriptionContainer: {
    gap: 20,
    marginBottom: 40,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    textAlign: 'left',
  },
  startButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    fontStyle: 'italic',
  },
});
