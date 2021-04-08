import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import Map from '../components/Map';
import { Text } from 'react-native-elements';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm'

import { Context as LocationContext } from '../context/LocationContext';

const TrackCreateScreen = ({ isFocused }) => {
  const { state, addLocation } = useContext(LocationContext);
  
  const callback = useCallback(location => {
    addLocation(location, state.recording);
  }, [state.recording])

  const [err] = useLocation(isFocused , callback)

  return <SafeAreaView forceInset={{ top: 'always'}}>
    <Text h3>Create a Track</Text>
    <Map/>
    { err ? <Text>Please enable location services</Text> : null }
    <TrackForm />
  </SafeAreaView>
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
