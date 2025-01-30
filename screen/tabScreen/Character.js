import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {useVampireContext} from '../../store/context';

const Character = ({navigation}) => {
  const {characters} = useVampireContext();

  const handleCreateCharacter = () => {
    navigation.navigate('CharacterCreate');
  };

  const renderCharacterCard = (character) => (
    <TouchableOpacity 
      key={character.id} 
      style={styles.characterCard}
      onPress={() => {/* Handle character selection */}}>
      <Image
        source={require('../../assets/icons/vampire.png')}
        style={styles.characterIcon}
      />
      <View style={styles.characterInfo}>
        <Text style={styles.characterName}>{character.name}</Text>
        <Text style={styles.characterConcept}>{character.concept}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's bring your character to life!</Text>

      <TouchableOpacity style={styles.createButton} onPress={handleCreateCharacter}>
        <Text style={styles.createButtonText}>Create Character</Text>
      </TouchableOpacity>

      {characters.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.description}>
            It looks like you don't have any characters yet. Start creating your
            unique hero or villain by clicking the button above. Customize every
            detail, from their appearance to their story. Your imagination is the
            only limit!
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.characterList}>
          {characters.map(character => renderCharacterCard(character))}
        </ScrollView>
      )}
    </View>
  );
};

export default Character;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142C38',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  createButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    marginBottom: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'left',
    lineHeight: 24,
  },
  characterList: {
    flex: 1,
  },
  characterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  characterIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
    tintColor: '#fff',
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  characterConcept: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
});
