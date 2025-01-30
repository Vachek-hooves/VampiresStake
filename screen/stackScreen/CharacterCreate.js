import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useState} from 'react';
import {CHARACTER} from '../../data/characterForm';
import {useVampireContext} from '../../store/context';
import {useNavigation} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CharacterCreate = () => {
  const navigation = useNavigation();
  const {saveCharacter} = useVampireContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [characterName, setCharacterName] = useState('');
  const [concept, setConcept] = useState('');
  const [sire, setSire] = useState('');
  const [selectedClan, setSelectedClan] = useState('Ventrue'); // Default selection
  const [clanDescription, setClanDescription] = useState(CHARACTER.CLANS[0].description); // Add this new state
  const [clanTraits, setClanTraits] = useState(CHARACTER.CLANS[0].traits); // Add this new state
  const [hairStyle, setHairStyle] = useState('');
  const [eyeColor, setEyeColor] = useState('');
  const [uniqueMarks, setUniqueMarks] = useState('');
  const [strength, setStrength] = useState('');
  const [flaw, setFlaw] = useState('');
  const [motivation, setMotivation] = useState('');
  const [transformation, setTransformation] = useState('');
  const [hauntingMemory, setHauntingMemory] = useState('');

  const getRandomItem = array => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleClanSelection = (clan) => {
    setSelectedClan(clan.name);
    setClanDescription(clan.description);
    setClanTraits(clan.traits);
  };

  const handleSaveCharacter = async () => {
    const characterData = {
      // Basic Information
      name: characterName,
      concept,
      sire,

      // Clan information including traits
      clan: {
        name: selectedClan,
        description: clanDescription,
        traits: clanTraits,
      },

      // Appearance
      appearance: {
        hairStyle,
        eyeColor,
        uniqueMarks,
      },

      // Personal character traits (from step 4)
      personalTraits: {
        strength,
        flaw,
        motivation,
      },

      // Background
      background: {
        transformation,
        hauntingMemory,
      },
    };

    const success = await saveCharacter(characterData);

    if (success) {
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Failed to save character. Please try again.');
    }
  };

  const renderStepOne = () => (
    <>
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
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </>
  );

  const renderStepTwo = () => (
    <>
      <Text style={styles.title}>Let's bring your character to life!</Text>

      {/* Progress Indicators */}
      <View style={styles.progressContainer}>
        {[...Array(5)].map((_, index) => (
          <View
            key={index}
            style={[styles.progressDot, {opacity: index === 1 ? 1 : 0.3}]}
          />
        ))}
      </View>

      <Text style={styles.description}>
        Every bloodline holds its secrets, strengths, and curses. The clan you
        choose will shape your abilities, alliances, and enemies in the nights
        to come. Long-press a clan to uncover its mysteries before making your
        choice
      </Text>

      {/* Clan Selection */}
      {CHARACTER.CLANS.map(clan => (
        <TouchableOpacity
          key={clan.name}
          style={[
            styles.clanOption,
            selectedClan === clan.name && styles.clanOptionSelected,
          ]}
          onPress={() => handleClanSelection(clan)}
          onLongPress={() => {
            /* Show clan description modal */
          }}>
          <View style={styles.radioContainer}>
            <View
              style={[
                styles.radioOuter,
                selectedClan === clan.name && styles.radioOuterSelected,
              ]}>
              {selectedClan === clan.name && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.clanName}>{clan.name}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </>
  );

  const renderStepThree = () => (
    <>
      <Text style={styles.title}>Let's bring your character to life!</Text>

      {/* Progress Indicators */}
      <View style={styles.progressContainer}>
        {[...Array(5)].map((_, index) => (
          <View
            key={index}
            style={[styles.progressDot, {opacity: index === 2 ? 1 : 0.3}]}
          />
        ))}
      </View>

      <Text style={styles.description}>
        Appearances can deceive, but they always leave a lasting impression.
        Describe how others perceive you in the shadows
      </Text>

      {/* Hair Style Input */}
      <Text style={styles.label}>What is your hair color and style?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={hairStyle}
          onChangeText={setHairStyle}
          placeholder="Describe your hair..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity
          style={styles.randomButton}
          onPress={() => setHairStyle(getRandomItem(CHARACTER.APPEARANCES))}>
          <Image
            source={require('../../assets/icons/shuffle.png')}
            style={styles.shuffleIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Eye Color Input */}
      <Text style={styles.label}>What is the color of your eyes?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={eyeColor}
          onChangeText={setEyeColor}
          placeholder="Describe your eyes..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity
          style={styles.randomButton}
          onPress={() => setEyeColor(getRandomItem(CHARACTER.APPEARANCES))}>
          <Image
            source={require('../../assets/icons/shuffle.png')}
            style={styles.shuffleIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Unique Marks Input */}
      <Text style={styles.label}>
        Do you bear any scars, tattoos, or unique marks?
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={uniqueMarks}
          onChangeText={setUniqueMarks}
          placeholder="Describe your marks..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity
          style={styles.randomButton}
          onPress={() => setUniqueMarks(getRandomItem(CHARACTER.APPEARANCES))}>
          <Image
            source={require('../../assets/icons/shuffle.png')}
            style={styles.shuffleIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </>
  );

  const renderStepFour = () => (
    <>
      <Text style={styles.title}>Let's bring your character to life!</Text>

      {/* Progress Indicators */}
      <View style={styles.progressContainer}>
        {[...Array(5)].map((_, index) => (
          <View
            key={index}
            style={[styles.progressDot, {opacity: index === 3 ? 1 : 0.3}]}
          />
        ))}
      </View>

      <Text style={styles.description}>
        Your character is more than their looks or their clan. Define their
        essence, strengths, and flaws that make them unique
      </Text>

      {/* Greatest Strength Input */}
      <Text style={styles.label}>What is your greatest strength?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={strength}
          onChangeText={setStrength}
          placeholder="Enter your strength..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity
          style={styles.randomButton}
          onPress={() =>
            setStrength(getRandomItem(CHARACTER.TRAITS.strengths))
          }>
          <Image
            source={require('../../assets/icons/shuffle.png')}
            style={styles.shuffleIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Deepest Flaw Input */}
      <Text style={styles.label}>What is your deepest flaw?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={flaw}
          onChangeText={setFlaw}
          placeholder="Enter your flaw..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity
          style={styles.randomButton}
          onPress={() => setFlaw(getRandomItem(CHARACTER.TRAITS.flaws))}>
          <Image
            source={require('../../assets/icons/shuffle.png')}
            style={styles.shuffleIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Motivation Input */}
      <Text style={styles.label}>What drives your existence?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={motivation}
          onChangeText={setMotivation}
          placeholder="Enter your motivation..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity
          style={styles.randomButton}
          onPress={() =>
            setMotivation(getRandomItem(CHARACTER.TRAITS.motivations))
          }>
          <Image
            source={require('../../assets/icons/shuffle.png')}
            style={styles.shuffleIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </>
  );

  const renderStepFive = () => (
    <>
      <Text style={styles.title}>Let's bring your character to life!</Text>

      {/* Progress Indicators */}
      <View style={styles.progressContainer}>
        {[...Array(5)].map((_, index) => (
          <View
            key={index}
            style={[styles.progressDot, {opacity: index === 4 ? 1 : 0.3}]}
          />
        ))}
      </View>

      <Text style={styles.description}>
        Every vampire has a past that haunts them. Tell your story—how you
        became what you are, and what shaped your journey into the night
      </Text>

      {/* Transformation Story Input */}
      <Text style={styles.label}>How did you become a vampire?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={transformation}
          onChangeText={setTransformation}
          placeholder="Tell your transformation story..."
          placeholderTextColor="#666"
          multiline={true}
          numberOfLines={3}
        />
        <TouchableOpacity
          style={styles.randomButton}
          onPress={() =>
            setTransformation(
              getRandomItem(CHARACTER.BACKGROUND.transformation),
            )
          }>
          <Image
            source={require('../../assets/icons/shuffle.png')}
            style={styles.shuffleIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Haunting Memory Input */}
      <Text style={styles.label}>What haunts you from your mortal life?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={hauntingMemory}
          onChangeText={setHauntingMemory}
          placeholder="Share your haunting memory..."
          placeholderTextColor="#666"
          multiline={true}
          numberOfLines={3}
        />
        <TouchableOpacity
          style={styles.randomButton}
          onPress={() =>
            setHauntingMemory(
              getRandomItem(CHARACTER.BACKGROUND.haunting_memories),
            )
          }>
          <Image
            source={require('../../assets/icons/shuffle.png')}
            style={styles.shuffleIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.nextButton, {marginTop: 'auto'}]}
        onPress={handleSaveCharacter}>
        <Text style={styles.nextButtonText}>Save</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <SafeAreaView>
          {currentStep === 1 && renderStepOne()}
          {currentStep === 2 && renderStepTwo()}
          {currentStep === 3 && renderStepThree()}
          {currentStep === 4 && renderStepFour()}
          {currentStep === 5 && renderStepFive()}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default CharacterCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142C38',
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
  clanOption: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 25,
    padding: 15,
    marginBottom: 10,
  },
  clanOptionSelected: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#0084ff',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0084ff',
  },
  clanName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
