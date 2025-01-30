import {StyleSheet, Text, View} from 'react-native';
import {scaryStory} from '../../data/scaryStory';
import {useVampireContext} from '../../store/context';

const AllStories = ({navigation}) => {
  const {stories} = useVampireContext();
  return (
    <View>
      <Text>AllStories</Text>
    </View>
  );
};

export default AllStories;

const styles = StyleSheet.create({});
