import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {useVampireContext} from '../../store/context';

const Character = ({navigation}) => {
  const {characters, deleteCharacter} = useVampireContext();
  console.log(characters);

  const handleCreateCharacter = () => {
    navigation.navigate('CharacterCreate');
  };
  const handleCharacterPress = character => {
    navigation.navigate('CharacterDetails', {character});
  };

  const handleDeleteCharacter = character => {
    Alert.alert(
      'Delete Character',
      `Are you sure you want to delete ${character.name}? This action cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteCharacter(character.id);
            if (!success) {
              Alert.alert(
                'Error',
                'Failed to delete character. Please try again.',
              );
            }
          },
        },
      ],
    );
  };

  const renderCharacterCard = character => (
    <View key={character.id} style={styles.characterCard}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => handleCharacterPress(character)}>
        <Image
          source={require('../../assets/icons/vampire.png')}
          style={styles.characterIcon}
        />
        <View style={styles.characterInfo}>
          <Text style={styles.characterName}>{character.name}</Text>
          <Text style={styles.characterConcept}>{character.concept}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        // onPress={() => handleDeleteCharacter(character)}
        >
        <Image
          source={require('../../assets/icons/trash.png')}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's bring your character to life!</Text>

      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateCharacter}>
        <Text style={styles.createButtonText}>Create Character</Text>
      </TouchableOpacity>

      {characters.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.description}>
            It looks like you don't have any characters yet. Start creating your
            unique hero or villain by clicking the button above. Customize every
            detail, from their appearance to their story. Your imagination is
            the only limit!
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
    marginBottom: 10,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
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
  deleteButton: {
    padding: 15,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.1)',
  },
  deleteIcon: {
    width: 45,
    height: 45,
    tintColor: 'rgba(255,0,0,0.7)',
  },
});
