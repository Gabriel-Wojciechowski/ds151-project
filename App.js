import React, {useContext, useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { navigationRef } from './RootNavigation';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import FullListScreen from './src/screens/FullListScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen.js';
import SignOutScreen from './src/screens/SignOutScreen.js';
import SplashScreen from './src/screens/SplashScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown:false}} name="Splash" component={SplashScreen} />
          <Stack.Screen options={{headerLeft: null, headerShown:false}} name="Login" component={LoginScreen} />
          <Stack.Screen options={{headerShown:false}} name="DrawerTabs" component={DrawerTabsScreen} />   
          <Stack.Screen name="Project Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const DrawerTabsScreen = () => {
  return(
    <Drawer.Navigator initialRouteName="GitLab Application">
      <Drawer.Screen name="GitLab Application" component={TabsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen options={{headerShown:false}} name="Sign Out" component={SignOutScreen} />
    </Drawer.Navigator>
  );
}

const TabsScreen = () => {
  return(
    <Tab.Navigator initialRouteName="My Projects">
      <Tab.Screen name="My Projects" component={HomeScreen} />
      <Tab.Screen name="Full List" component={FullListScreen} />
    </Tab.Navigator>
  );
}

export default App;