import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Button, Text } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';

const AccountScreen = () => {

  const { signout } = useContext(AuthContext);
  return <SafeAreaView forceInset={{ top: 'always'}}>
    <Text h3 style={{ alignSelf: 'center', padding: 5 }}>Account</Text>
    <Button
      title="Log Out"
      onPress={signout}
    />
  </SafeAreaView> 
};

AccountScreen.navigationOptions = {
  title: 'Account',
  tabBarIcon: <FontAwesome name="gear" size={20} />
}

const styles = StyleSheet.create({});

export default AccountScreen;
