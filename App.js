import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {VampireProvider} from './store/context';
import IntroScreen from './screen/stackScreen/IntroScreen';
import TabNavigator from './screen/tabNavigator/TabNavigator';
const Stack = createNativeStackNavigator();
function App() {
  return (
    <VampireProvider>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </VampireProvider>
  );
}

export default App;
