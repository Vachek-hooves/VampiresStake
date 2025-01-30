import {StyleSheet, Text, View} from 'react-native';
import {CHARACTER} from '../../data/characterForm';
import {useVampireContext} from '../../store/context';


const CharacterCreate = () => {
  const {} = useVampireContext();

  return (
    <View>
      <Text>CharacterCreate</Text>
    </View>
  );
};

export default CharacterCreate;

const styles = StyleSheet.create({});
