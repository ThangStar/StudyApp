import { BackHandler, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import Color from '../value/Color'
import { Avatar, Box, IconButton } from '@react-native-material/core'
import Icon from 'react-native-vector-icons/Ionicons'
import AnimatedLottieView from 'lottie-react-native'
import StyleGloble from '../style/StyleGloble'
import Request, { BaseURL } from '../network/Request'
import MyToolbar from '../components/MyToolbar'
import DAOTitleCourse from '../network/DAO/DAOTitleCourse'

const CourseManagerScreen = ({ navigation }) => {
     const [titleCourse, setTitleCourse] = useState([])
     useEffect(() => {
          DAOTitleCourse.GetTitleCourse(setTitleCourse)
     }, [])
     return (
          <SafeAreaView style={{ flex: 1 }}>
               <StatusBar style='light' />
               <LinearGradient
                    colors={['#03012C', '#2A005E']}
                    style={styles.linearGradian}>
                    <MyToolbar
                         handleBack={() => {
                              navigation.goBack()
                         }}
                         title='Quản lí khóa học' />
                    <FlatList
                         data={titleCourse}
                         renderItem={({ item, index }) => (
                              <ItemCourse value={item} navigation={navigation} />
                         )}
                    />
               </LinearGradient>
          </SafeAreaView >
     )
}


const ItemCourse = (props) => {
     let { value, navigation } = props
     return (
          <TouchableOpacity onPress={() => {
               navigation.navigate('WordManagerScreen', {
                    value: value
               })
          }}>
               <View style={{
                    flexDirection: 'row',
                    paddingVertical: 12,
                    justifyContent: 'space-between'
               }}>
                    <View style={{
                         flexDirection: 'row'
                    }}>
                         <Image style={styles.imageItem} source={{ uri: BaseURL + value.url_image }} />
                         <Text style={[StyleGloble.textTralling, { marginHorizontal: 24, fontWeight: 'bold' }]}>{value.name_title}</Text>
                    </View>
                    <Icon name='arrow-forward-outline' color={'white'} size={18} />
               </View>
          </TouchableOpacity>
     )
}
export default CourseManagerScreen

const styles = StyleSheet.create({
     linearGradian: {
          flex: 1,
          paddingHorizontal: 12,
          paddingVertical: 20,
     },
     imageItem: {
          width: 80,
          height: 80
     }
})