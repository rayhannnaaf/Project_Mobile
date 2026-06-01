/**
 * App.js  (updated)
 * Semua logika navigasi dipindah ke src/navigation/AppNavigator.js
 */
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#071929" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}