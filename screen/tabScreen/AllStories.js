import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {scaryStory} from '../../data/scaryStory';
import {useVampireContext} from '../../store/context';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2; // 20px padding on each side, 20px gap

const AllStories = () => {
  const navigation = useNavigation();
  const {stories} = useVampireContext();

  const handleStoryPress = (story) => {
    navigation.navigate('ScaryStoryDetails', {story});
  };

  const renderStoryCard = (story, index) => (
    <TouchableOpacity
      key={story.id || index}
      style={styles.storyCard}
      onPress={() => handleStoryPress(story)}>
      <Image
        source={
          story.image
            ? story.image
            : require('../../assets/image/default-story.png')
        }
        style={styles.storyImage}
      />
      <View style={styles.storyTitleContainer}>
        <Text style={styles.storyTitle} numberOfLines={2}>
          {story.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Stories</Text>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.storiesGrid}>
          {/* Render predefined scary stories */}
          {scaryStory.map((story, index) => renderStoryCard(story, index))}
          
          {/* Render user-created stories */}
          {stories.map((story, index) => renderStoryCard(story, index))}
        </View>
      </ScrollView>
    </View>
  );
};

export default AllStories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142C38',
    padding: 20,
  },
  headerTitle: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  scrollContent: {
    flexGrow: 1,
  },
  storiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  storyCard: {
    width: CARD_WIDTH,
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  storyImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  storyTitleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  storyTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
