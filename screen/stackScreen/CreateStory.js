import {StyleSheet, Text, View} from 'react-native';
import {useVampireContext} from '../../store/context';

const CreateStory = () => {
  const {characters} = useVampireContext();
  return (
    <View>
      <Text>CreateStory</Text>
    </View>
  );
};

export default CreateStory;

const styles = StyleSheet.create({});
