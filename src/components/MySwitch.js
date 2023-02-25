import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import StyleGloble from '../style/StyleGloble'
import Color from '../value/Color'

const MySwitch = (props) => {
     let { iconName, title } = props
     const [isCheck, setIsCheck] = useState(false)
     return (
          <View style={{
               flexDirection: 'row',
               justifyContent: 'space-between',
               alignItems: 'center'
          }}>
               <View style={{
                    flexDirection: 'row'
               }}>
                    <Icon name={iconName} color={'white'} size={18} />
                    <Text style={[StyleGloble.textTralling, { marginHorizontal: 24, fontWeight: 'bold' }]}>{title}</Text>
               </View>
               <Switch
                    thumbColor={Color.onSecondary}
                    value={isCheck}
                    onChange={() => {
                         setIsCheck(!isCheck)
                    }} />

          </View>
     )
}

export default MySwitch