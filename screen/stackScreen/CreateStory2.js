import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useVampireContext} from '../../store/context';

const CreateStory2 = ({route}) => {
  const navigation = useNavigation();
  const {saveStory} = useVampireContext();
  const {characterName} = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleClose = () => {
    if (title.trim() || content.trim()) {
      Alert.alert(
        'Unsaved Changes',
        'Are you sure you want to discard your story?',
        [
          {
            text: 'Continue Writing',
            style: 'cancel',
          },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } else {
      navigation.goBack();
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Please enter both a title and content for your story.');
      return;
    }

    const storyData = {
      title: title.trim(),
      content: content.trim(),
      characterName,
    };

    const success = await saveStory(storyData);

    if (success) {
      Alert.alert('Success', 'Your story has been saved!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('TabNavigator', {screen: 'Story'}),
        },
      ]);
    } else {
      Alert.alert('Error', 'Failed to save your story. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.headerTitle}>Save</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Title Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter story title..."
              placeholderTextColor="rgba(255,255,255,0.5)"
              color="#fff"
            />
          </View>

          {/* Story Content Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.description}>
              Write your first chapter, create dialogue, or describe the world your
              characters live in
            </Text>
            <TextInput
              style={styles.contentInput}
              value={content}
              onChangeText={setContent}
              placeholder="Start writing your story..."
              placeholderTextColor="rgba(255,255,255,0.5)"
              multiline
              textAlignVertical="top"
              color="#fff"
              autoFocus={true}  
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CreateStory2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142C38',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    lineHeight: 24,
  },
  titleInput: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  contentInput: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
    minHeight: 280,
    maxHeight: 350,
  },
});
