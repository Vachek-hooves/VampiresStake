import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {VampireProvider} from './store/context';
import IntroScreen from './screen/stackScreen/IntroScreen';
import TabNavigator from './screen/tabNavigator/TabNavigator';
import OnboardingScreen from './screen/stackScreen/OnboardingScreen';
import CharacterCreate from './screen/stackScreen/CharacterCreate';
import CharacterDetails from './screen/stackScreen/CharacterDetails';
import CreateStory from './screen/stackScreen/CreateStory';
import CreateStory2 from './screen/stackScreen/CreateStory2';
import ScaryStoryDetails from './screen/stackScreen/ScaryStoryDetails';
import GameLevels from './screen/stackScreen/GameLevels';
import PuzzleGame from './screen/stackScreen/PuzzleGame';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <VampireProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="CharacterCreate" component={CharacterCreate} />
          <Stack.Screen name="CharacterDetails" component={CharacterDetails} />
          <Stack.Screen name="CreateStory" component={CreateStory} />
          <Stack.Screen name="CreateStory2" component={CreateStory2} />
          <Stack.Screen
            name="ScaryStoryDetails"
            component={ScaryStoryDetails}
          />
          <Stack.Screen name="GameLevels" component={GameLevels} />
          <Stack.Screen name="PuzzleGame" component={PuzzleGame} />
        </Stack.Navigator>
      </NavigationContainer>
    </VampireProvider>
  );
}

export default App;
