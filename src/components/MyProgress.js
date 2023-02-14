import { Animated, Dimensions, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Color from '../value/Color'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const MyProgress = (props) => {
     let { valueTranslateX } = props
     return <View>
          <View style={{
               width: '100%',
               height: 10,
               backgroundColor: 'white',
               borderRadius: 6,
               marginBottom: 12,
               overflow: 'hidden'
          }}>
               <Animated.View style={{
                    transform: [{
                         translateX: valueTranslateX
                    }],
                    width: '100%',
                    backgroundColor: Color.primary,
                    height: 10,
                    borderRadius: 6
               }}>
               </Animated.View>

          </View>
     </View>;
};
