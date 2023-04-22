import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';

import { Colors } from '../../constants/styles';
import { Place } from '../../models/place';

const PlaceForm = ({ onCreatePlace }) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const titleChangeHandler = (text) => {
    setEnteredTitle(text);
  };

  const imagePickHandler = (imageUri) => setSelectedImage(imageUri);

  const locationPickHandler = useCallback(
    (location) => setSelectedLocation(location),
    []
  );

  const savePlaceHandler = () => {
    const placeData = new Place(enteredTitle, selectedImage, selectedLocation);
    console.log('placeData: ', placeData);
    console.log('onCreatePlace: ', onCreatePlace);

    onCreatePlace(placeData);
  };

  return (
    <ScrollView style={styles.form}>
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={enteredTitle}
            onChangeText={titleChangeHandler}
            style={styles.input}
          />
        </View>
        <ImagePicker onImagePick={imagePickHandler} />

        <LocationPicker onLocationPick={locationPickHandler} />

        <Button onPress={savePlaceHandler}>Add Place</Button>
      </View>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  wrapper: {
    flex: 1,
    marginBottom: 36
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: Colors.primary100,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary700
  }
});
