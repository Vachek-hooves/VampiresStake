import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {useState} from 'react';
import {CHARACTER} from '../../data/characterForm';
import {useVampireContext} from '../../store/context';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CharacterCreate = () => {
  const [characterName, setCharacterName] = useState('');
  const [concept, setConcept] = useState('');
  const [sire, setSire] = useState('');

  const getRandomItem = array => {
    return array[Math.floor(Math.random() * array.length)];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's bring your character to life!</Text>

      {/* Progress Indicators */}
      <View style={styles.progressContainer}>
        {[...Array(5)].map((_, index) => (
          <View
            key={index}
            style={[styles.progressDot, {opacity: index === 0 ? 1 : 0.3}]}
          />
        ))}
      </View>

      <Text style={styles.description}>
        Let's start shaping your story. Begin with the basics—your name, your
        concept, and the sire who turned you into what you are
      </Text>

      {/* Name Input */}
      <Text style={styles.label}>What is your name?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={characterName}
          onChangeText={setCharacterName}
          placeholder="Enter name..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity
          style={styles.randomButton}
          onPress={() =>
            setCharacterName(getRandomItem(CHARACTER.RANDOM_NAMES))
          }>
          {/* <Icon name="shuffle-variant" size={24} color="#0084ff" /> */}
          <Image
            source={require('../../assets/icons/shuffle.png')}
            style={styles.shuffleIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Concept Input */}
      <Text style={styles.label}>What defines your existence?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={concept}
          onChangeText={setConcept}
          placeholder="Enter concept..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity
          style={styles.randomButton}
          onPress={() => setConcept(getRandomItem(CHARACTER.CONCEPTS))}>
          <Image
            source={require('../../assets/icons/shuffle.png')}
            style={styles.shuffleIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Sire Input */}
      <Text style={styles.label}>
        Who is your sire, the one who brought you into this dark world?
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={sire}
          onChangeText={setSire}
          placeholder="Enter sire name..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity
          style={styles.randomButton}
          onPress={() => setSire(getRandomItem(CHARACTER.SIRES))}>
          <Image
            source={require('../../assets/icons/shuffle.png')}
            style={styles.shuffleIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CharacterCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2634',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  progressDot: {
    width: 40,
    height: 4,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'left',
    marginBottom: 30,
    lineHeight: 24,
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  randomButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  nextButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 25,
    marginTop: 'auto',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  shuffleIcon: {
    width: 32,
    height: 32,
  },
});
