import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { String as valueString } from '../value/String'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const GetDataFromStorage = async (key = new String) => {
     try {
          const value = await AsyncStorage.getItem(key)
          if (value !== null) {
               return value
          }else {
               return "NO VALUE"
          }
     } catch (e) {
          console.log(valueString.SAVE_DATA_ERROR);
          console.log("VALUE ERROR: " + e);
          return "NO VALUE"
     }
}

export const PushDataFromStorage = async (key = new String, value = new String) => {
     try {
          await AsyncStorage.setItem(key, value)
          return valueString.SAVE_DATA_SUCCESS
     } catch (e) {
          return valueString.SAVE_DATA_ERROR
          console.log('ERROR');
     }
}