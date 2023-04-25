import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomeScreen from './screens/WelcomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './screens/HomeScreen'
import BottomNavHome from './navGraph/BottomNavHome'
import LoginScreen from './screens/LoginScreen'
import AuthScreen from './screens/AuthScreen'
import QuizScreen from './screens/quizs/QuizScreen'
import ResultCourseScreen from './screens/details/ResultCourseScreen'
import CourseManagerScreen from './screens/CourseManagerScreen'
import WordManagerScreen from './screens/WordManagerScreen'

const Stack = createNativeStackNavigator()

const Main = () => {
     return (
          <NavigationContainer>
               <Stack.Navigator
                    initialRouteName='WelcomeScreen'
                    screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="WelcomeScreen"
                         component={WelcomeScreen} />
                    <Stack.Screen name="BottomTabHome"
                         component={BottomNavHome}  />
                    <Stack.Screen name="AuthScreen"
                         component={AuthScreen} />
                    <Stack.Screen name="QuizScreen"
                         component={QuizScreen} />
                    <Stack.Screen name="ResultCourseScreen"
                         component={ResultCourseScreen} />
                    <Stack.Screen name="CourseManagerScreen"
                         component={CourseManagerScreen} />
                    <Stack.Screen name="WordManagerScreen"
                         component={WordManagerScreen} />
               </Stack.Navigator>
          </NavigationContainer>
     )
}

export default Main

const styles = StyleSheet.create({})