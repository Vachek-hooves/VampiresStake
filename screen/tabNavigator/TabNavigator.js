import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Character from '../tabScreen/Character';
import Story from '../tabScreen/Story';
import AllStories from '../tabScreen/AllStories';
import Settings from '../tabScreen/Settings';
import Game from '../tabScreen/Game';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Character" component={Character} />
      <Tab.Screen name="Story" component={Story} />
      <Tab.Screen name="AllStories" component={AllStories} />
      <Tab.Screen name="Game" component={Game} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
