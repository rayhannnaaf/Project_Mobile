/**
 * AppNavigator.js
 * src/navigation/AppNavigator.js
 *
 * ✅ Zero new packages — uses ONLY what your project already has:
 *    @react-navigation/native        (already installed)
 *    @react-navigation/bottom-tabs  (already installed)
 *
 * Auth flow is handled with simple React state — no stack navigator needed.
 * Login → sets isLoggedIn = true  → MainTabs appears
 * Logout → sets isLoggedIn = false → Auth screens appear
 */

import React, { useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// ── Auth screens
import LoginScreen    from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// ── Main screens
import HomeScreen   from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import MutasiScreen from '../screens/MutasiScreen';
import ProfilScreen from '../screens/ProfilScreen';

const Tab = createBottomTabNavigator();

/* ─────────────────────────────────────────
   Tab icons — sama persis dengan App.js lama
───────────────────────────────────────── */
const TAB_ICONS = {
  Home:   '🏠',
  Search: '🔍',
  Mutasi: '📋',
  Profil: '👤',
};

/* ─────────────────────────────────────────
   Auth Tab  (Login & Register sebagai tab,
   tab bar disembunyikan pakai display:none)
───────────────────────────────────────── */
function AuthTabs({ onLogin }) {
  // Wrap screens agar bisa passing onLogin prop
  const LoginWrapped    = (props) => <LoginScreen    {...props} onLogin={onLogin} />;
  const RegisterWrapped = (props) => <RegisterScreen {...props} onLogin={onLogin} />;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, // sembunyikan tab bar di auth
      }}
    >
      <Tab.Screen name="Login"    component={LoginWrapped} />
      <Tab.Screen name="Register" component={RegisterWrapped} />
    </Tab.Navigator>
  );
}

/* ─────────────────────────────────────────
   Main Tab Navigator — sama dengan App.js lama
───────────────────────────────────────── */
function MainTabs({ onLogout }) {
  const ProfilWrapped = (props) => <ProfilScreen {...props} onLogout={onLogout} />;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Text style={{ fontSize: focused ? 22 : 18 }}>
            {TAB_ICONS[route.name]}
          </Text>
        ),
        tabBarActiveTintColor:   '#00C8A0',
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
      <Tab.Screen name="Home"   component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Mutasi" component={MutasiScreen} />
      <Tab.Screen name="Profil" component={ProfilWrapped} />
    </Tab.Navigator>
  );
}

/* ─────────────────────────────────────────
   Root — swap Auth ↔ MainTabs via state
───────────────────────────────────────── */
export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin  = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <NavigationContainer>
      {isLoggedIn
        ? <MainTabs onLogout={handleLogout} />
        : <AuthTabs onLogin={handleLogin} />
      }
    </NavigationContainer>
  );
}