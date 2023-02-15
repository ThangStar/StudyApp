import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import StyleGloble from '../style/StyleGloble'
import Icon from 'react-native-vector-icons/Ionicons'
import { IconButton } from '@react-native-material/core'

const MyButtonIcon = (props) => {
     let { title, navigation } = props
     return (
          <>
               <TouchableOpacity
                    onPress={() => { navigation.pop(2) }}
                    style={{
                         backgroundColor: "#511188ec",
                         elevation: 6,
                         borderRadius: 34,
                         paddingHorizontal: 14,
                         paddingVertical: 16,
                         width: '48%',
                         zIndex: 1,
                    }}
               >

                    <Text style={[StyleGloble.textTralling]}>
                         {title}
                    </Text>
               </TouchableOpacity>
          </>
     )
}

export default MyButtonIcon

const styles = StyleSheet.create({})