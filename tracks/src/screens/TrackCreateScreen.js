import '../_mockLocation';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Map from '../components/Map';
import { Text } from 'react-native-elements';
import useLocation from '../hooks/useLocation'

import { Context as LocationContext } from '../context/LocationContext';

const TrackCreateScreen = () => {
  const { addLocation } = useContext(LocationContext);

  const [err] = useLocation(addLocation)

  return <SafeAreaView forceInset={{ top: 'always'}}>
    <Text h3>Create a Track</Text>
    <Map/>
    { err ? <Text>Please enable location services</Text> : null }
  </SafeAreaView>
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;
