import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomeScreen from './screen/WelcomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './screen/HomeScreen'
import BottomNavHome from './navGraph/BottomNavHome'
import LoginScreen from './screen/LoginScreen'
import AuthScreen from './screen/AuthScreen'
import QuizScreen from './screen/Quiz/QuizScreen'

const Stack = createNativeStackNavigator()

const Main = () => {
     return (
          <NavigationContainer>
               <Stack.Navigator
                    initialRouteName='BottomTabHome'
                    screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="WelcomeScreen"
                         component={WelcomeScreen} />
                    <Stack.Screen name="BottomTabHome"
                         component={BottomNavHome} />
                    <Stack.Screen name="AuthScreen"
                         component={AuthScreen} />
                    <Stack.Screen name="QuizScreen"
                         component={QuizScreen} />
               </Stack.Navigator>
          </NavigationContainer>
     )
}

export default Main

const styles = StyleSheet.create({})