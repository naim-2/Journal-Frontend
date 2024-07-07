import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import JournalScreen from '../screens/JournalScreen';
import NewEntryScreen from '../screens/NewEntryScreen';
import EditEntryScreen from '../screens/EditEntryScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Journal" component={JournalScreen} />
      <Stack.Screen name="NewEntry" component={NewEntryScreen} />
      <Stack.Screen name="EditEntry" component={EditEntryScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
