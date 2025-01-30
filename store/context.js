import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VampireContext = createContext({});

export function VampireProvider({children}) {
  const [characters, setCharacters] = useState([]);
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  // Fetch existing characters when the app starts
  useEffect(() => {
    loadCharacters();
    loadStories();
  }, []);

  const loadCharacters = async () => {
    try {
      setIsLoading(true);
      const existingCharacters = await AsyncStorage.getItem('characters');
      if (existingCharacters) {
        setCharacters(JSON.parse(existingCharacters));
      }
    } catch (error) {
      console.error('Error loading characters:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStories = async () => {
    try {
      const savedStories = await AsyncStorage.getItem('stories');
      if (savedStories) {
        setStories(JSON.parse(savedStories));
      }
    } catch (error) {
      console.error('Error loading stories:', error);
    }
  };

  const saveCharacter = async characterData => {
    try {
      // Get existing characters
      const existingCharacters = await AsyncStorage.getItem('characters');
      let newCharacters = [];

      if (existingCharacters) {
        newCharacters = JSON.parse(existingCharacters);
      }

      // Add new character with unique ID
      const newCharacter = {
        id: Date.now().toString(),
        ...characterData,
        createdAt: new Date().toISOString(),
      };

      newCharacters.push(newCharacter);

      // Save to AsyncStorage
      await AsyncStorage.setItem('characters', JSON.stringify(newCharacters));

      // Update state
      setCharacters(newCharacters);

      return true;
    } catch (error) {
      console.error('Error saving character:', error);
      return false;
    }
  };

  const deleteCharacter = async characterId => {
    try {
      // Filter out the character to be deleted
      const updatedCharacters = characters.filter(
        char => char.id !== characterId,
      );

      // Save updated list to AsyncStorage
      await AsyncStorage.setItem(
        'characters',
        JSON.stringify(updatedCharacters),
      );

      // Update state
      setCharacters(updatedCharacters);

      return true;
    } catch (error) {
      console.error('Error deleting character:', error);
      return false;
    }
  };

  const saveStory = async storyData => {
    try {
      const newStory = {
        ...storyData,
        id: new Date().getTime().toString(),
        createdAt: new Date().toISOString(),
      };

      const updatedStories = [...stories, newStory];
      await AsyncStorage.setItem('stories', JSON.stringify(updatedStories));
      setStories(updatedStories);
      return true;
    } catch (error) {
      console.error('Error saving story:', error);
      return false;
    }
  };

  const value = {
    characters,
    stories,
    isLoading,
    saveCharacter,
    deleteCharacter,
    saveStory,
    refreshCharacters: loadCharacters,
    refreshStories: loadStories,
  };

  return (
    <VampireContext.Provider value={value}>{children}</VampireContext.Provider>
  );
}

export function useVampireContext() {
  return useContext(VampireContext);
}
