import {
  StyleSheet,
  View,
  Image,
  PanResponder,
  Animated,
  Dimensions,
  TouchableOpacity,
  Text,
  Modal,
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

  const checkCompletion = (currentPieces) => {
    const isComplete = currentPieces.every(
      piece => piece.currentPosition === piece.correctPosition
    );
    
    if (isComplete && !showSuccessModal) {
      setIsComplete(true);
      setShowSuccessModal(true);
    }
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    navigation.goBack();
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

      {/* Success Modal */}
      <Modal
        transparent={true}
        visible={showSuccessModal}
        animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.congratsText}>Congratulations!</Text>
            <Text style={styles.modalText}>
              You've successfully completed the puzzle!
            </Text>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#142C38',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    width: '80%',
  },
  congratsText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  modalText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 25,
  },
  continueButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default PuzzleGame;
