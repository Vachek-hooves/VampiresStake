import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';
import {useState} from 'react';
import {useVampireContext} from '../../store/context';
import {useNavigation} from '@react-navigation/native';

const CreateStory = () => {
  const navigation = useNavigation();
  const {characters} = useVampireContext();
  const [characterName, setCharacterName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    if (characterName.trim()) {
      navigation.navigate('CreateStory2', {
        characterName: characterName.trim(),
      });
    }
  };

  const handleSelectCharacter = (character) => {
    setCharacterName(character.name);
    setIsDropdownOpen(false);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>Insert Character</Text>

          {/* Character Selector */}
          <TouchableOpacity
            style={styles.selectorButton}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
            <Text style={styles.selectorText}>
              {characterName || 'Select a character'}
            </Text>
            <Image
              source={require('../../assets/icons/chevron-down.png')}
              style={[
                styles.chevron,
                isDropdownOpen && styles.chevronUp,
              ]}
            />
          </TouchableOpacity>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <View style={styles.dropdown}>
              {characters.map(character => (
                <TouchableOpacity
                  key={character.id}
                  style={styles.dropdownItem}
                  onPress={() => handleSelectCharacter(character)}>
                  <Text style={styles.dropdownText}>{character.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Custom Character Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={characterName}
              onChangeText={setCharacterName}
              placeholder="Or type a custom name..."
              placeholderTextColor="rgba(255,255,255,0.5)"
              color="#fff"
            />
          </View>

          {/* Next Button */}
          <TouchableOpacity 
            style={[
              styles.nextButton,
              !characterName.trim() && styles.nextButtonDisabled,
            ]} 
            onPress={handleNext}
            disabled={!characterName.trim()}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CreateStory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142C38',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 50,
    zIndex: 1,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  selectorButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectorText: {
    color: '#fff',
    fontSize: 16,
  },
  chevron: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  chevronUp: {
    transform: [{rotate: '180deg'}],
  },
  dropdown: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 8,
    marginTop: 5,
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  dropdownText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 25,
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    fontStyle: 'italic',
  },
});
