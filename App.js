import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {VampireProvider} from './store/context';
import IntroScreen from './screen/stackScreen/IntroScreen';
import TabNavigator from './screen/tabNavigator/TabNavigator';
import OnboardingScreen from './screen/stackScreen/OnboardingScreen';
import CharacterCreate from './screen/stackScreen/CharacterCreate';
import CharacterDetails from './screen/stackScreen/CharacterDetails';
import CreateStory from './screen/stackScreen/CreateStory';

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
        </Stack.Navigator>
      </NavigationContainer>
    </VampireProvider>
  );
}

export default App;
