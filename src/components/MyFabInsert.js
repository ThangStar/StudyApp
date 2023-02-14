import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FAB, IconButton, Stack } from '@react-native-material/core'
import Icon from 'react-native-vector-icons/Ionicons'
import Color from '../value/Color'

const MyFabInsert = (props) => {
     let { setVisibleDialog } = props
     return (
          <View
          onTouchStart={() => setVisibleDialog(true)}
               style={{
                    position: 'absolute',
                    bottom: 16,
                    end: 6,
                    backgroundColor: "#f59f0bcb",
                    borderRadius: 28,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    paddingHorizontal: 14,
                    paddingVertical: 6,
                    elevation: 12
               }}>

               <Icon style={{}}
                    name='add-outline'
                    size={38}
                    color={Color.text} />
               <Text style={{
                    color: 'white'
               }}>Thêm bài học</Text>
          </View>
     )
}

export default MyFabInsert

const styles = StyleSheet.create({})