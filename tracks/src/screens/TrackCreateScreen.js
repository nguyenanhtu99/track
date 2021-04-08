import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Map from '../components/Map';
import { Text } from 'react-native-elements';
import { requestPermissionAsync, requestPermissionsAsync } from 'expo-location';

const TrackCreateScreen = () => {
  const [ err, setErr ] = useState(null);

  const startWatching = async () => {
    try {
      await requestPermissionsAsync();
    } catch (err) {
      setErr(err);
    }
  }

  useEffect(() => {
    startWatching();
  }, []);

  return <SafeAreaView forceInset={{ top: 'always'}}>
    <Text h3>Create a Track</Text>
    <Map/>
    { err ? <Text>Please enable location services</Text> : null }
  </SafeAreaView>
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;
