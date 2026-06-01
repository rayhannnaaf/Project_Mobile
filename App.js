/**
 * App.js — Root dengan Bottom Tab Navigator
 * Navigasi: Home | Search | Mutasi | Profil
 */
import React from 'react';
import { StatusBar, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import MutasiScreen from './src/screens/MutasiScreen';
import ProfilScreen from './src/screens/ProfilScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Home: '🏠',
  Search: '🔍',
  Mutasi: '📋',
  Profil: '👤',
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#0A2540" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            // ✅ plain JSX Text — no dynamic require, no createElement
            tabBarIcon: ({ focused }) => (
              <Text style={{ fontSize: focused === true ? 22 : 18 }}>
                {TAB_ICONS[route.name]}
              </Text>
            ),
            tabBarActiveTintColor: '#00C8A0',
            tabBarInactiveTintColor: '#8FA3B1',
            tabBarStyle: {
              backgroundColor: '#0A2540',
              borderTopWidth: 0,
              height: 62,
              paddingBottom: 8,
              paddingTop: 6,
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '600',
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Mutasi" component={MutasiScreen} />
          <Tab.Screen name="Profil" component={ProfilScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}