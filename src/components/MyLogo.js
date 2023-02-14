import {Image, Text, View } from 'react-native'
import React from 'react'
import Color from '../value/Color'

const MyLogo = () => {
     return (
          <View style={{
               flexDirection: 'row',
               alignItems: 'baseline',
               paddingHorizontal: 12
          }}>
               <Image source={require('../res/logo.png')}>
               </Image>
               <Text style={{
                    marginHorizontal: 8,
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: 'white'
               }}>
                    <Text style={{
                         color: Color.onSecondary
                    }}>J</Text>o
                    <Text style={{
                         color: Color.onSecondary
                    }}>j</Text>o
               </Text>
          </View>
     )
};
export default MyLogo
