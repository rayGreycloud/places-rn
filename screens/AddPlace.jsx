import { StyleSheet } from 'react-native';

import PlaceForm from '../components/Places/PlaceForm';

import { insertPlace } from '../utils/database';

const AddPlace = ({ navigation }) => {
  const createPlaceHandler = async (place) => {
    console.log('place: ', place);
    console.log('insertPlace: ', insertPlace);
    await insertPlace(place);

    navigation.navigate('AllPlaces');
  };

  return (
    <PlaceForm onCreatePlace={createPlaceHandler} style={styles.container} />
  );
};

export default AddPlace;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
