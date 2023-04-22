import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import Map from './screens/Map';
import PlaceDetails from './screens/PlaceDetails';
import IconButton from './components/UI/IconButton';

import { Colors } from './constants/styles';

import { init } from './utils/database';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await init();
      } catch (error) {
        console.log('App.js useEffect error: ', error);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
              headerTintColor: Colors.gray700
            },
            contentStyle: {
              backgroundColor: Colors.gray700
            }
          }}
        >
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon={'add'}
                  size={24}
                  color={tintColor}
                  onPress={() => {
                    console.log('pressed');
                    navigation.navigate('AddPlace');
                  }}
                />
              )
            })}
          />
          <Stack.Screen
            name='AddPlace'
            component={AddPlace}
            options={{
              title: 'Add new place'
            }}
          />
          <Stack.Screen
            name='Map'
            component={Map}
            options={{
              title: 'Map'
            }}
          />
          <Stack.Screen
            name='PlaceDetails'
            component={PlaceDetails}
            options={{
              title: 'Loading Place...'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({});
