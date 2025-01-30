import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import Character from '../tabScreen/Character';
import Story from '../tabScreen/Story';
import AllStories from '../tabScreen/AllStories';
import Settings from '../tabScreen/Settings';
import Game from '../tabScreen/Game';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.3)',
       
      }}>
      <Tab.Screen
        name="Character"
        component={Character}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../assets/tabbar/character.png')}
              style={{width: 30, height: 30, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Story"
        component={Story}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../assets/tabbar/story.png')}
              style={{width: 30, height: 30, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AllStories"
        component={AllStories}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../assets/tabbar/allStories.png')}
              style={{width: 30, height: 30, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Game"
        component={Game}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../assets/tabbar/game.png')}
              style={{width: 30, height: 30, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../assets/tabbar/settings.png')}
              style={{width: 30, height: 30, tintColor: color}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: '#142C38',
    borderRadius: 15,
    height: 70,
    paddingBottom: 0,
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginHorizontal: 10,
    paddingTop: 10,
  },
 
});
