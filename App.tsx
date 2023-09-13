import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddUser from './src/screens/AddUser';
import EditUser from './src/screens/EditUser';
import Home from './src/screens/Home';


const Stack = createNativeStackNavigator();


const App = () => {

  return (
     <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
             <Stack.Screen name='AddUser' component={AddUser}/>
             <Stack.Screen name='EditUser' component={EditUser}/>
             <Stack.Screen name='Home' component={Home}/>
        </Stack.Navigator>
     </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})