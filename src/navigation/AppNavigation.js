import React, { useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// ── Auth screens
import LoginScreen    from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// ── Main screens
import HomeScreen            from '../screens/HomeScreen';
import SearchScreen          from '../screens/SearchScreen';
import MutasiScreen          from '../screens/MutasiScreen';
import ProfilScreen          from '../screens/ProfilScreen';
import HospitalManagerScreen from '../screens/HospitalManagerScreen'; 

const Tab = createBottomTabNavigator();

// ── Tab icons
const TAB_ICONS = {
  Home:   '🏠',
  Search: '🔍',
  Mutasi: '📋',
  Kelola: '🏥', 
  Profil: '👤',
};


function AuthTabs({ onLogin }) {
  const LoginWrapped    = (props) => <LoginScreen    {...props} onLogin={onLogin} />;
  const RegisterWrapped = (props) => <RegisterScreen {...props} onLogin={onLogin} />;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}
    >
      <Tab.Screen name="Login"    component={LoginWrapped} />
      <Tab.Screen name="Register" component={RegisterWrapped} />
    </Tab.Navigator>
  );
}

/* ─────────────────────────────────────────
   Main Tab Navigator
───────────────────────────────────────── */
function MainTabs({ onLogout }) {
  const ProfilWrapped = (props) => <ProfilScreen {...props} onLogout={onLogout} />;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Text style={{ fontSize: focused === true ? 22 : 18 }}>
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
      <Tab.Screen name="Kelola" component={HospitalManagerScreen} /> 
      <Tab.Screen name="Profil" component={ProfilWrapped} />
    </Tab.Navigator>
  );
}


export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin  = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <NavigationContainer>
      {isLoggedIn === true
        ? <MainTabs onLogout={handleLogout} />
        : <AuthTabs onLogin={handleLogin} />
      }
    </NavigationContainer>
  );
}