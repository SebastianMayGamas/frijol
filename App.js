import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/login/login.js';
import Register from './src/Register/Register.js';
import Dash from './src/dash/Dash.js';
import { NavigationContainer } from '@react-navigation/native';
import Navegation from './src/navegation/navegation.js';
import User from './src/user/Userprofile.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='login'>
        <Stack.Screen name='login' component={Login}  options={{ headerShown: false }}/>
        <Stack.Screen name='Registro' component={Register} options={{ headerShown: false }} />
        <Stack.Screen name='Dash' component={Dash} options={{headerShown: false}} />
        <Stack.Screen name='Navegation' component={Navegation} options={{headerShown: false}}/>
        <Stack.Screen name='user' component={User} options={{headerShown: false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
