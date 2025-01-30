import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  Share,
  Linking,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);

  const toggleMusic = async value => {
    setIsMusicEnabled(value);
    try {
      await AsyncStorage.setItem('musicEnabled', JSON.stringify(value));
      // TODO: Implement actual music control logic
    } catch (error) {
      console.error('Error saving music setting:', error);
    }
  };

  const handleShareApp = async () => {
    try {
      await Share.share({
        message:
          'Check out this amazing Vampire Stories app! Create and share your dark tales.',
        // Add your app store links when published
        // url: 'https://your-app-store-link'
      });
    } catch (error) {
      console.error('Error sharing app:', error);
    }
  };

  const handleTermsOfUse = () => {
    // Replace with your actual terms of use URL
    Linking.openURL('https://www.termsfeed.com/live/90094df1-1805-4ca2-a9ec-cf2b88144433');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingsContainer}>
        {/* Music Toggle */}
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Music</Text>
          <Switch
            value={isMusicEnabled}
            onValueChange={toggleMusic}
            trackColor={{false: '#767577', true: '#0084ff'}}
            thumbColor={isMusicEnabled ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
          />
        </View>

        {/* Share App */}
        <TouchableOpacity style={styles.settingRow} onPress={handleShareApp}>
          <Text style={styles.settingText}>Share the app</Text>
          {/* <Text style={styles.shareIcon}>→</Text> */}
          <Image
            source={require('../../assets/icons/share.png')}
            style={styles.shareIcon}
          />
        </TouchableOpacity>

        {/* Terms of Use */}
        <TouchableOpacity style={styles.settingRow} onPress={handleTermsOfUse}>
          <Text style={styles.settingText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142C38',
    padding: 20,
    paddingTop: '20%',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 40,
  },
  settingsContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  settingText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
  },
  shareIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
});
