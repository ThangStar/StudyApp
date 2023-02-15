import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import Color from '../value/Color'
import Icon from 'react-native-vector-icons/Ionicons'
import StudyScreen from '../screens/StudyScreen'
import FavoriteScreen from '../screens/FavoriteScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { IconButton } from '@react-native-material/core'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useTheme } from 'react-native-paper'

const Tab = createMaterialBottomTabNavigator()
const BottomNavHome = () => {
     const theme = useTheme()
     theme.colors.secondaryContainer = "transperent"
     return (
          <Tab.Navigator
               screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: 'white',
               }}
               barStyle={{
                    backgroundColor: Color.onPrimary,
                    height: 90,
               }}
               activeColor='white'
               labeled={false}
          >
               <Tab.Screen options={{
                    tabBarIcon: ({ color, focused }) => (
                         <IconButton disabled={true} style={{ backgroundColor: focused ? '#EE1739' : null }} icon={(
                              <Icon color={color} size={18} name='stats-chart'></Icon>
                         )} />

                    ),
               }}
                    name="HomeScreen" component={HomeScreen} />
               <Tab.Screen options={{
                    tabBarIcon: ({ color, size, focused }) => (
                         <IconButton disabled={true} style={{ backgroundColor: focused ? "#F59E0B" : null }} icon={(

                              <Icon color={color} size={18} name='book'></Icon>
                         )} />

                    ),

               }}
                    name="HomeScreen2" component={StudyScreen} />

               <Tab.Screen
                    options={{
                         tabBarIcon: ({ color, size, focused }) => (
                              <IconButton disabled={true} style={{ backgroundColor: focused ? 'blue' : null }} icon={(

                                   <Icon color={color} size={18} name='heart'></Icon>
                              )} />

                         ),
                    }}

                    name="HomeScreen3" component={FavoriteScreen} />

               <Tab.Screen options={{
                    tabBarIcon: ({ color, size, focused }) => (
                         <IconButton disabled={true} style={{ backgroundColor: focused ? Color.onSecondary : null }} icon={(
                              <Icon color={color} size={18} name='person'></Icon>
                         )} />
                    ),
               }}
                    name="HomeScreen4" component={ProfileScreen} />

          </Tab.Navigator>
     )
}

export default BottomNavHome
