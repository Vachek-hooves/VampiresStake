import {
  StyleSheet,
  View,
  Image,
  PanResponder,
  Animated,
  Dimensions,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');
const PIECES_COUNT = 12;
const PUZZLE_HEIGHT = height * 0.7;
const PIECE_HEIGHT = PUZZLE_HEIGHT / PIECES_COUNT;

const PuzzleGame = ({route}) => {
  const navigation = useNavigation();
  const {puzzle, puzzleId} = route.params;
  const [pieces, setPieces] = useState([]);
  const [currentPiece, setCurrentPiece] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    // Create array of pieces with correct and current positions
    let initialPieces = Array.from({length: PIECES_COUNT}, (_, index) => ({
      id: index,
      correctPosition: index,
      currentPosition: index,
      y: new Animated.Value(index * PIECE_HEIGHT),
    }));
    
    // Shuffle the pieces
    const shuffledPieces = shuffleArray([...initialPieces]);
    shuffledPieces.forEach((piece, index) => {
      piece.currentPosition = index;
      piece.y.setValue(index * PIECE_HEIGHT);
    });
    
    setPieces(shuffledPieces);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const createPanResponder = (piece) => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setCurrentPiece(piece);
      piece.y.setOffset(piece.y._value);
    },
    onPanResponderMove: (_, gesture) => {
      piece.y.setValue(gesture.dy);
    },
    onPanResponderRelease: (_, gesture) => {
      piece.y.flattenOffset();
      
      const startPosition = piece.currentPosition;
      const endPosition = Math.round((piece.y._value) / PIECE_HEIGHT);
      const boundedPosition = Math.max(0, Math.min(endPosition, PIECES_COUNT - 1));

      const newPieces = pieces.map(p => {
        if (p.id === piece.id) {
          p.currentPosition = boundedPosition;
        } else if (
          (boundedPosition <= p.currentPosition && p.currentPosition < startPosition) ||
          (startPosition < p.currentPosition && p.currentPosition <= boundedPosition)
        ) {
          p.currentPosition += startPosition < boundedPosition ? -1 : 1;
        }

        Animated.spring(p.y, {
          toValue: p.currentPosition * PIECE_HEIGHT,
          useNativeDriver: true,
          friction: 7,
          tension: 40,
        }).start();

        return p;
      });

      setPieces(newPieces);
      setCurrentPiece(null);
      
      // Check completion after piece movement
      checkCompletion(newPieces);
    },
  });

  const markPuzzleAsCompleted = async () => {
    try {
      const completed = await AsyncStorage.getItem('completedPuzzles');
      const completedPuzzles = completed ? JSON.parse(completed) : [];
      
      if (!completedPuzzles.includes(puzzleId)) {
        const newCompleted = [...completedPuzzles, puzzleId];
        await AsyncStorage.setItem('completedPuzzles', JSON.stringify(newCompleted));
      }
    } catch (error) {
      console.log('Error saving completion status:', error);
    }
  };

  const checkCompletion = (currentPieces) => {
    const isComplete = currentPieces.every(
      piece => piece.currentPosition === piece.correctPosition
    );
    
    if (isComplete && !showSuccessModal) {
      setIsComplete(true);
      markPuzzleAsCompleted();
    }
  };

  // const handleShare = async () => {
  //   try {
  //     const shareOptions = {
  //       title: 'Share Puzzle',
  //       url: Platform.OS === 'ios' ? 
  //         `file://${puzzle.image}` : 
  //         puzzle.image,
  //       message: 'Check out this amazing puzzle I completed!',
  //     };
  //     await Share.open(shareOptions);
  //   } catch (error) {
  //     console.log('Error sharing:', error);
  //   }
  // };

  const handleMainMenu = () => {
    navigation.navigate('TabNavigator',{screen: 'Game'});
  };

  return (
    <View style={styles.container}>
      {/* Top buttons */}
      <View style={[isComplete ? {height: '5%'} : {height: '10%'}]}/>
      {isComplete && (
        <View style={styles.topButtons}>
          {/* <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Text style={styles.actionButtonText}>Share →</Text>
          </TouchableOpacity> */}
        </View>
      )}

      <View style={styles.puzzleContainer}>
        {pieces.map((piece) => (
          <Animated.View
            key={piece.id}
            {...createPanResponder(piece).panHandlers}
            style={[
              styles.piece,
              {
                transform: [{translateY: piece.y}],
                zIndex: currentPiece?.id === piece.id ? 999 : 1,
              },
            ]}>
            <Image
              source={puzzle.image}
              style={[
                styles.pieceImage,
                {
                  height: PUZZLE_HEIGHT,
                  top: -piece.correctPosition * PIECE_HEIGHT,
                },
              ]}
            />
          </Animated.View>
        ))}
      </View>

      {/* Main Menu button */}
      {isComplete && (
        <TouchableOpacity 
          style={styles.mainMenuButton}
          onPress={handleMainMenu}>
          <Text style={styles.mainMenuButtonText}>Main Menu</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142C38',
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    // paddingVertical: 20,
    width: '100%',
    paddingBottom: 20,
  },
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
  },
  puzzleContainer: {
    height: PUZZLE_HEIGHT,
    width: width,
    // alignSelf: 'center',
    overflow: 'hidden',
  },
  piece: {
    position: 'absolute',
    width: width,
    height: PIECE_HEIGHT,
    overflow: 'hidden',
  },
  pieceImage: {
    width: width,
    position: 'absolute',
    resizeMode: 'cover',
  },
  mainMenuButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  mainMenuButtonText: {
    color: '#fff',
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default PuzzleGame;
