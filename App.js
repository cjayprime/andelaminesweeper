/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import ApplicationBase from './src';


const App = () => {
  return (//1430B7
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView>
        <ApplicationBase />
      </SafeAreaView>
    </>
  );
};

export default App;
