import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

import { Colors } from '../../constants/styles';

const PlaceForm = () => {
  const [enteredTitle, setEnteredTitle] = useState('');

  const titleChangeHandler = (text) => {
    setEnteredTitle(text);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={enteredTitle}
          onChangeText={titleChangeHandler}
          style={styles.input}
        />
      </View>
      <ImagePicker />

      <LocationPicker />
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
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
