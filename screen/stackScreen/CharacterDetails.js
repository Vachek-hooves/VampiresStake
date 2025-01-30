import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CharacterDetails = ({ route }) => {
  const navigation = useNavigation()
  const character = route.params?.character

  const handleClose = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        <ScrollView style={styles.content}>
          {/* Character Header */}
          <View style={styles.characterHeader}>
            <Image
              source={require('../../assets/icons/vampire.png')}
              style={styles.characterIcon}
            />
            <View style={styles.characterHeaderInfo}>
              <Text style={styles.characterName}>{character.name}</Text>
              <Text style={styles.characterConcept}>{character.concept}</Text>
            </View>
          </View>

          {/* Sire */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sire</Text>
            <Text style={styles.sectionText}>{character.sire}</Text>
          </View>

          {/* Clan */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Clan</Text>
            <Text style={styles.sectionText}>{character.clan.name}</Text>
            <Text style={styles.clanDescription}>
              {character.clan.description}
            </Text>
            <View style={styles.traitsContainer}>
              {character.clan.traits.map((trait, index) => (
                <Text key={index} style={styles.traitText}>
                  {trait}
                </Text>
              ))}
            </View>
          </View>

          {/* Appearance */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Appearance</Text>
            <Text style={styles.sectionText}>{character.appearance.hairStyle}</Text>
            <Text style={styles.sectionText}>{character.appearance.eyeColor}</Text>
            <Text style={styles.sectionText}>{character.appearance.uniqueMarks}</Text>
          </View>

          {/* Character Traits */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Character Traits</Text>
            <Text style={styles.sectionText}>
              <Text style={styles.traitLabel}>Greatest Strength: </Text>
              {character.personalTraits.strength}
            </Text>
            <Text style={styles.sectionText}>
              <Text style={styles.traitLabel}>Deepest Flaw: </Text>
              {character.personalTraits.flaw}
            </Text>
            <Text style={styles.sectionText}>
              <Text style={styles.traitLabel}>Motivation: </Text>
              {character.personalTraits.motivation}
            </Text>
          </View>

          {/* Background */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Background</Text>
            <Text style={styles.sectionText}>
              <Text style={styles.traitLabel}>Transformation: </Text>
              {character.background.transformation}
            </Text>
            <Text style={styles.sectionText}>
              <Text style={styles.traitLabel}>Haunting Memory: </Text>
              {character.background.hauntingMemory}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default CharacterDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142C38',
  },
  safeArea: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 70,
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
  content: {
    flex: 1,
    padding: 20,
  },
  characterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  characterIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
    tintColor: '#fff',
  },
  characterHeaderInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    fontStyle: 'italic',
  },
  characterConcept: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  sectionText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
    lineHeight: 24,
  },
  clanDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 8,
    lineHeight: 20,
  },
  traitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 8,
  },
  traitText: {
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 14,
    overflow: 'hidden',
  },
  traitLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontStyle: 'italic',
  },
})