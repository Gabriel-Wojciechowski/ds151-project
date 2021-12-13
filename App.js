import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { navigationRef } from './RootNavigation';
import { AuthProvider } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import FullListScreen from './src/screens/FullListScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen.js';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
  return (                                                                                // 24:25
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen options={{headerShown:false}} name="DrawerTabs" component={DrawerTabsScreen} />   
          <Stack.Screen name="Project Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const DrawerTabsScreen = () => {
  return(
    <Drawer.Navigator initialRouteName="GitLab Example Project">
      <Drawer.Screen name="GitLab Example Project" component={TabsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
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