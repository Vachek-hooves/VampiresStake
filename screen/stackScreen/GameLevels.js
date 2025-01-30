import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
// import {BlurView} from '@react-native-community/blur';

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2; // 20px padding on each side, 20px gap

const puzzles = [
  {
    id: '1',
    name: 'The Book',
    image: require('../../assets/puzzle/book.png'),
  },
  {
    id: '2',
    name: 'Witch',
    image: require('../../assets/puzzle/witch.png'),
  },
  {
    id: '3',
    name: 'Piano',
    image: require('../../assets/puzzle/piano.png'),
  },
  
];

const GameLevels = () => {
  const navigation = useNavigation();

  const handlePuzzleSelect = (puzzle) => {
    navigation.navigate('PuzzleGame', {puzzle});
  };

  const renderPuzzleCard = (puzzle) => (
    <TouchableOpacity
      key={puzzle.id}
      style={styles.puzzleCard}
      onPress={() => handlePuzzleSelect(puzzle)}>
      <View style={styles.imageContainer}>
        <Image source={puzzle.image} style={styles.puzzleImage} blurRadius={0}/>
        {/* <BlurView
          style={styles.blurOverlay}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.8)"
        /> */}
      </View>
      <View style={styles.puzzleNameContainer}>
        <Text style={styles.puzzleName}>{puzzle.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    // <ImageBackground
    //   source={require('../../assets/images/dark-bg.png')}
    //   style={styles.container}
    //   resizeMode="cover">
      <View style={styles.container}>

        <View style={styles.content}>
        <Text style={styles.title}>Choose Your Puzzle</Text>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.puzzlesGrid}>
            {puzzles.map(renderPuzzleCard)}
          </View>
        </ScrollView>
      </View>
              </View>

  );
};

export default GameLevels;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142C38',
    paddingTop: 50,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  puzzlesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  puzzleCard: {
    width: CARD_WIDTH,
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  puzzleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  puzzleNameContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  puzzleName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
