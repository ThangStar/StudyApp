import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { IconButton } from '@react-native-material/core'
import Icon from 'react-native-vector-icons/Ionicons'
import Color from '../value/Color'

const MyFAB = (props) => {
     let { isLogin, setIsLogin, changeCurrentPager } = props

     const rotateFab = useRef(new Animated.Value(0)).current
     Animated.timing(rotateFab, {
          toValue: isLogin ? 0 : 1,
          duration: 600,
          useNativeDriver: true
     }).start()
     const rotateValue = rotateFab.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg']
     })

     return (
          <View
               style={{
                    alignItems: 'flex-end',
               }}>
               <Animated.View style={{
                    transform: [{ rotate: rotateValue }],
                    bottom: 24,
                    right: 24,
                    elevation: 6,
                    backgroundColor: Color.onPrimary,
                    position: 'absolute',
                    borderRadius: 50
               }}>
                    <IconButton
                         icon={({ size }) => (
                              <Icon color={Color.onSecondary}
                                   size={size}
                                   name='arrow-forward'>
                              </Icon>
                         )}
                         color={Color.onPrimary}
                         onPress={() => {
                              setIsLogin(!isLogin)
                              changeCurrentPager(isLogin ? 1 : 0)
                         }}
                    >
                    </IconButton>
               </Animated.View>
          </View >
     )
}

export default MyFAB

const styles = StyleSheet.create({})