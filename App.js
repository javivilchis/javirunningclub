/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './src/navigations/AuthNavigator';

function App() {
 

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}


export default App;
