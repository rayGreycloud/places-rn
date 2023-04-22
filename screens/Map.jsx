import { useCallback, useLayoutEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Alert, StyleSheet, View } from 'react-native';

import IconButton from '../components/UI/IconButton';

const Map = ({ navigation, route }) => {
  const initialLocation = route.params ? route.params.location : null;

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78825,
    longitude: initialLocation ? initialLocation.lng : -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationHandler = (event) => {
    if (initialLocation) return;

    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    console.log(lat, lng);
    setSelectedLocation({
      lat,
      lng
    });
  };

  const savePickLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert('No location picked!', 'Please pick a location on the map.');

      return;
    }

    navigation.navigate('AddPlace', {
      pickedLocation: selectedLocation
    });
  }, [selectedLocation, navigation]);

  useLayoutEffect(() => {
    if (initialLocation) return;

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon='save'
          size={24}
          color={tintColor}
          onPress={savePickLocationHandler}
        />
      )
    });
  }, [initialLocation, navigation, savePickLocationHandler]);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={region}
        onPress={selectLocationHandler}
        style={styles.map}
      >
        {selectedLocation && (
          <Marker
            title='Picked Location'
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng
            }}
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: '100%',
    height: '100%'
  }
});
