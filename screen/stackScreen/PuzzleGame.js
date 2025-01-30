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
import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const PIECES_COUNT = 12;
const PIECE_HEIGHT = height * 0.5 / PIECES_COUNT; // 50% of screen height for puzzle

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

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (_, gesture) => {
      const pieceIndex = Math.floor(gesture.y0 / PIECE_HEIGHT);
      if (pieceIndex < pieces.length) {
        setCurrentPiece(pieces[pieceIndex]);
      }
    },
    onPanResponderMove: (_, gesture) => {
      if (currentPiece) {
        const newPosition = gesture.moveY - PIECE_HEIGHT / 2;
        currentPiece.y.setValue(newPosition);
      }
    },
    onPanResponderRelease: (_, gesture) => {
      if (!currentPiece) return;

      const newPosition = Math.round(gesture.moveY / PIECE_HEIGHT);
      const boundedPosition = Math.max(0, Math.min(newPosition, PIECES_COUNT - 1));
      
      // Update positions of all pieces
      const newPieces = [...pieces];
      const oldPosition = currentPiece.currentPosition;
      
      // Animate all affected pieces
      newPieces.forEach(piece => {
        if (piece.id === currentPiece.id) {
          piece.currentPosition = boundedPosition;
        } else if (
          (boundedPosition <= piece.currentPosition && piece.currentPosition < oldPosition) ||
          (oldPosition < piece.currentPosition && piece.currentPosition <= boundedPosition)
        ) {
          piece.currentPosition += oldPosition < boundedPosition ? -1 : 1;
        }
        
        Animated.spring(piece.y, {
          toValue: piece.currentPosition * PIECE_HEIGHT,
          useNativeDriver: true,
        }).start();
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

      <View style={styles.puzzleContainer} {...panResponder.panHandlers}>
        {pieces.map((piece) => (
          <Animated.View
            key={piece.id}
            style={[
              styles.piece,
              {
                transform: [{translateY: piece.y}],
                zIndex: currentPiece?.id === piece.id ? 1 : 0,
              },
            ]}>
            <Image
              source={puzzle.image}
              style={[
                styles.pieceImage,
                {
                  height: height * 0.5,
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
    height: height * 0.5,
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
