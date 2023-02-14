import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import StyleGloble from '../style/StyleGloble'


const MyButton = (props) => {
     let { title, onPress } = props
     return (
          <View style={{
               alignItems: 'center',
               marginVertical: 56,
          }}>
               <TouchableOpacity style={{
                    padding: 10,
                    backgroundColor: "#511188ec",
                    elevation: 6,
                    borderRadius: 34,
                    paddingVertical: 16,
                    paddingHorizontal: 26
               }}
                    onPress={() => onPress()}
               >
                    <Text style={[StyleGloble.textLeading, { fontSize: 16 }]}>
                         {title}
                    </Text>
               </TouchableOpacity>
          </View>
     )
}

export default MyButton

const styles = StyleSheet.create({})