import {
  StyleSheet,
  View,
  Image,
  PanResponder,
  Animated,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const PIECES_COUNT = 12;
const PUZZLE_HEIGHT = height * 0.7;
const PIECE_HEIGHT = PUZZLE_HEIGHT / PIECES_COUNT;

const PuzzleGame = ({route}) => {
  const navigation = useNavigation();
  const {puzzle} = route.params;
  const [pieces, setPieces] = useState([]);
  const [currentPiece, setCurrentPiece] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

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

      // Update positions
      const newPieces = pieces.map(p => {
        if (p.id === piece.id) {
          p.currentPosition = boundedPosition;
        } else if (
          (boundedPosition <= p.currentPosition && p.currentPosition < startPosition) ||
          (startPosition < p.currentPosition && p.currentPosition <= boundedPosition)
        ) {
          p.currentPosition += startPosition < boundedPosition ? -1 : 1;
        }

        // Animate to new position
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
      
      // Check if puzzle is complete
      checkCompletion(newPieces);
    },
  });

  const checkCompletion = (currentPieces) => {
    const isComplete = currentPieces.every(
      piece => piece.currentPosition === piece.correctPosition
    );
    setIsComplete(isComplete);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.pauseButton}>
        <Text style={styles.pauseButtonText}>Pause</Text>
      </TouchableOpacity>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142C38',
  },
  pauseButton: {
    marginTop: 50,
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  pauseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontStyle: 'italic',
  },
  puzzleContainer: {
    height: PUZZLE_HEIGHT,
    width: width,
    alignSelf: 'center',
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
});

export default PuzzleGame;
