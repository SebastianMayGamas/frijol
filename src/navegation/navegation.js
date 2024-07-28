import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider } from 'react-native-paper';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import Dash from '../dash/Dash';
import User from '../user/Userprofile';
import Userchange from '../user/Userchange';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const UserStackScreen = () => (
  <Stack.Navigator initialRouteName="UserMain">
    <Stack.Screen 
      name="UserMain" 
      component={User} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="UserChange" 
      component={Userchange} 
      options={{ title: 'Change User' }} 
    />
  </Stack.Navigator>
);

const MyTabs = () => (
  <Tab.Navigator 
    initialRouteName="dash"
    screenOptions={{
      tabBarActiveTintColor: '#E7D37F',
      tabBarInactiveBackgroundColor: '#365E32',
      tabBarActiveBackgroundColor: '#81A263'
    }}
  >
    <Tab.Screen 
      name="dash" 
      component={Dash}
      options={{
        tabBarLabel: 'Menu',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Entypo name="home" size={size} color={color} />
        ),
      }}        
    />
    <Tab.Screen
      name="user" 
      component={UserStackScreen}
      options={{
        tabBarLabel: 'Usuario',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="user" size={size} color={color} />
        ),
      }}  
    />
  </Tab.Navigator>
);

const Navegation = () => {
  return (
    <PaperProvider>
      <MyTabs />
    </PaperProvider>
  );
}

export default Navegation;

const styles = StyleSheet.create({});
