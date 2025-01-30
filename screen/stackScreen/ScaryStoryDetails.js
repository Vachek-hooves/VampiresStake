import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const ScaryStoryDetails = ({route}) => {
  const navigation = useNavigation();
  const {story} = route.params;

  const handleClose = () => {
    // navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          {/* Story Title */}
          <Text style={styles.title}>{story.title}</Text>

          {/* Story Image */}
          <View style={styles.imageContainer}>
            <Image
              source={story.image}
              style={styles.storyImage}
              resizeMode="cover"
            />
          </View>

          {/* Story Content */}
          <Text style={styles.content}>{story.content}</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ScaryStoryDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142C38',
  },
  safeArea: {
    flex: 1,
    
  },
  scrollView: {
    flex: 1,
    padding: 20,
    paddingTop:50
  },
  closeButton: {
    position: 'absolute',
    right: 30,
    top: 60,
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  imageContainer: {
    width: width - 40, // Full width minus padding
    height: width - 40, // Square aspect ratio
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 24,
    marginBottom: 40,
    textAlign: 'justify',
  },
});