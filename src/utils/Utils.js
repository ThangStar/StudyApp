import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Utils = {
     MyAlert: (title, message, onAccept, id, DelItemCourse) => {
          Alert.alert(
               title,
               message,
               [
                    {
                         text: "Hủy bỏ",
                         onPress: () => { },
                         style: "cancel"
                    },
                    {
                         text: "OK", onPress: () => {
                              onAccept(id)
                              DelItemCourse(id)
                         }
                    }
               ]
          );
     },
}
export default Utils

const styles = StyleSheet.create({})