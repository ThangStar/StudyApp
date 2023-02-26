import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import StyleGloble from '../style/StyleGloble'
import Icon from 'react-native-vector-icons/Ionicons'
import DAOTitleCourse from '../network/DAO/DAOTitleCourse'
import { IconButton } from '@react-native-material/core'

const MyToolbar = (props) => {
     let { title, handleBack = () => {} } = props
     return (
          <View style={styles.container}>
               <IconButton
               onPress={() => handleBack()}
               icon={({color, size}) => (
                    <Icon name='arrow-back' size={size} color='white' />

               )} />
               <Text style={[StyleGloble.textLeading,
               { textAlign: 'left' }]}>
                    {" "}{title}
               </Text>
          </View>

     )
}

export default MyToolbar

const styles = StyleSheet.create({
     container: {
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center'
     }
})