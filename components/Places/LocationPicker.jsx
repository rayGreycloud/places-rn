import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus
} from 'expo-location';

import OutlinedButton from '../UI/OutlinedButton';

import { Colors } from '../../constants/styles';
import { getMapPreview } from '../../utils/location';

const LocationPicker = () => {
  const [pickedLocation, setPickedLocation] = useState(null);
  console.log('pickedLocation', pickedLocation);

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  console.log(
    'locationPermissionInformation.status: ',
    locationPermissionInformation?.status
  );

  const verifyPermissions = async () => {
    console.log(
      'verifyPermissions/status: ',
      locationPermissionInformation.status
    );
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED ||
      locationPermissionInformation.status === PermissionStatus.DENIED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      );

      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync({ accuracy: 3 });
    console.log(location);
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude
    });
  };

  const pickOnMapHandler = () => {};

  let locationPreview = <Text>No location chosen yet</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon='location' onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon='map' onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  }
});
