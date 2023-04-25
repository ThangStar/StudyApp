import { Animated, BackHandler, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import { Avatar, Box, useTheme } from '@react-native-material/core'
import StyleGloble from '../style/StyleGloble'
import { BottomTabView } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import MySwitch from '../components/MySwitch'
import Color from '../value/Color'


const ProfileScreen = ({navigation}) => {
     var yOffset = useRef(new Animated.Value(0)).current

     //data
     const UtilsAuth = [
          {
               title: "Quản lí khóa học",
               iconName: "book",
               onPress: () => navigation.navigate('CourseManagerScreen')
          },
          {
               title: "Quản lí người dùng",
               iconName: "people-circle",
          }
     ]
     
     const UtilsSetting = [
          {
               title: "Âm thanh",
               iconName: "volume-medium"
          },
          {
               title: "Rung",
               iconName: "phone-portrait"
          }
     ]
     
     const UtilsOther = [
          {
               title: "Thông tin ứng dụng",
               iconName: "information-circle"
          },
          {
               title: "Báo lỗi",
               iconName: "bug"
          }, {
               title: "Đăng xuất",
               iconName: "log-out",
               onPress: () => navigation.navigate('AuthScreen')
          }
     ]
     
     const HistoryStudy = [
          {
               name: "Số từ đã học",
               value: 60,
               colorBackground: Color.item1
          },
          {
               name: "Thời gian học",
               value: "60 phút",
               colorBackground: Color.item2
     
          },
          {
               name: "Thành tích",
               value: 60,
               colorBackground: Color.item3
     
          },
     ]

     //event auth
     return (
          <SafeAreaView style={{ flex: 1, position: 'relative', backgroundColor: Color.onPrimary }}>
               <StatusBar style='light' />
               <ImageBackground
                    source={require('../res/avatar.jpg')}
                    resizeMode='cover'
                    imageStyle={{
                         opacity: 0.5
                    }}
                    style={{
                         width: '100%',
                         height: 140,
                         borderBottomWidth: 1,
                         position: 'absolute',
                         zIndex: 1,
                         backgroundColor: 'black',
                         borderBottomColor: 'white',
                         borderStyle: 'dashed'
                    }}>
                    <LogoAndProfile />
               </ImageBackground>
               <ScrollView
                    showsVerticalScrollIndicator={false}
                    onScroll={(event) => {
                         console.log(event.nativeEvent.contentOffset.y);
                         yOffset.setValue(180)
                    }}
                    style={{
                         position: 'absolute',
                         width: '100%',
                         height: '100%',
                         zIndex: 2,
                    }}>

                    <LinearGradient
                         colors={[Color.startGradian, Color.endGradian]}
                         style={styles.linearGradian}>


                         {/* content */}
                         <View style={{
                              // height avtar / 2 
                              marginTop: -32,
                              flexDirection: 'row',
                              alignItems: 'center',
                              flexWrap: 'wrap'
                         }}>
                              <Avatar image={require('../res/avatar.jpg')} size={112} imageStyle={{
                                   borderWidth: 2,
                                   borderColor: Color.text,
                              }} />
                              <Text style={[StyleGloble.textLeading, { marginHorizontal: 12 }]}>Văn Thắng</Text>
                         </View>

                         {/* Item your study info */}
                         <View style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: 24
                         }}>
                              {
                                   HistoryStudy.map((value, index) => {
                                        return (
                                             <ItemYourResult key={index} data={value} />
                                        )
                                   })
                              }

                         </View>

                         <View style={{
                              marginTop: 16,
                         }}>
                               <Text style={[StyleGloble.textLeading2, { textAlign: 'left', opacity: 0.5, paddingVertical: 12 }]}>Chức năng</Text>
                              <ContainerItemUtils titleArray={UtilsAuth} />

                              <Text style={[StyleGloble.textLeading2, { textAlign: 'left', opacity: 0.5, paddingVertical: 12 }]}>Cài đặt</Text>
                              <ContainerItemUtils titleArray={UtilsSetting} isHaveTheme={true} />
                              <Text style={[StyleGloble.textLeading2, { textAlign: 'left', opacity: 0.5, paddingVertical: 12 }]}>Khác</Text>
                              <ContainerItemUtils titleArray={UtilsOther} />
                             
                         </View>
                    </LinearGradient>
               </ScrollView>

          </SafeAreaView >
     )
}

const ItemYourResult = (props) => {
     let { data } = props
     return (
          <TouchableOpacity style={{
               paddingVertical: 12,
               paddingHorizontal: 12,
               backgroundColor: data.colorBackground,
               width: "29%",
               borderRadius: 12
          }}>
               <Text style={[StyleGloble.textTralling, { fontWeight: 'bold' }]}>{data.name}</Text>
               <View style={{
                    backgroundColor: 'white',
                    paddingVertical: 2,
                    paddingHorizontal: 4,
                    alignItems: 'center',
                    borderRadius: 12,
                    marginTop: 18
               }}>
                    <Text>{data.value}</Text>
               </View>
          </TouchableOpacity>
     )
}


const ContainerItemUtils = (props) => {
     let { titleArray, isHaveTheme } = props
     return (
          <Box style={{
               borderWidth: 2,
               paddingHorizontal: 16,
               paddingVertical: 12,
               borderColor: Color.primary,
               borderRadius: 12,
               backgroundColor: '#ac58f538'
          }}>
               {isHaveTheme ?
                    <MySwitch title="Chế độ tối" iconName="contrast" />
                    : null
               }
               {
                    titleArray.map((value, index) => {
                         return (
                              <ItenUtils key={index} value={value} />
                         )
                    })
               }

          </Box>
     )
}

const ItenUtils = (props) => {
     let { value } = props
     return (
          <TouchableOpacity onPress={() => value.onPress()}>
               <View style={{
                    flexDirection: 'row',
                    paddingVertical: 12,
                    justifyContent: 'space-between'
               }}>
                    <View style={{
                         flexDirection: 'row'
                    }}>
                         <Icon name={value.iconName} color={'white'} size={18} />
                         <Text style={[StyleGloble.textTralling, { marginHorizontal: 24, fontWeight: 'bold' }]}>{value.title}</Text>
                    </View>
                    <Icon name='arrow-forward-outline' color={'white'} size={18} />

               </View>
          </TouchableOpacity>
     )
}

function LogoAndProfile(props) {
     return (
          <View>
               <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                    alignItems: 'center',
                    marginHorizontal: 12
               }}>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                         <Image source={require('../res/logo.png')}>
                         </Image>
                         <Text style={{
                              marginHorizontal: 8,
                              fontSize: 24,
                              fontWeight: 'bold',
                              color: 'white'
                         }}>
                              <Text style={{ color: Color.onSecondary }}>J</Text>o
                              <Text style={{ color: Color.onSecondary }}>j</Text>o
                         </Text>
                    </View >
               </View>
          </View>

     );
}

export default ProfileScreen

const styles = StyleSheet.create({
     linearGradian: {
          flex: 1,
          marginTop: 140,
          paddingHorizontal: 12
     },
})