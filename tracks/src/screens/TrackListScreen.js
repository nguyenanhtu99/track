import React, { useContext } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { ListItem } from 'react-native-elements'
import { Context as TrackContext } from '../context/TrackContext';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);

  console.log(state)
  return (
    <>
      <NavigationEvents onWillFocus={fetchTracks} />
      <Text style={{ fontSize: 48 }}>TrackListScreen</Text>
      <FlatList
        data={state}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return (<TouchableOpacity onPress={() => {
            navigation.navigate('TrackDetail', { _id: item._id });
          }}>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
          )
        }}
      />
    </>
  )
};

const styles = StyleSheet.create({});

export default TrackListScreen;
