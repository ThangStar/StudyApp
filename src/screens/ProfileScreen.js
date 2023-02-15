import { BackHandler, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import Color from '../value/Color'
import { Avatar, Box, IconButton } from '@react-native-material/core'
import Icon from 'react-native-vector-icons/Ionicons'
import AnimatedLottieView from 'lottie-react-native'
import StyleGloble from '../style/StyleGloble'
import Request from '../network/Request'

const ProfileScreen = () => {
     // useEffect(() => {
     //      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
     //      return () => backHandler.remove()
     // }, [])

     const [titleCourse, setTitleCourse] = useState([])
     useEffect(() => {
          ToastAndroid.showWithGravity(
               "Đăng nhập thành công",
               ToastAndroid.SHORT,
               ToastAndroid.CENTER
          );
     }, [])

     useEffect(() => {
          const GetTitleCourse = async () => {
               try {
                    const dataTitle = await Request.get('/title-course')
                    console.log(dataTitle.data);
                    setTitleCourse(dataTitle.data)
               } catch (error) {
                    console.log(error);
               }
          }
          GetTitleCourse()
     }, [])
     return (
          <SafeAreaView style={{ flex: 1 }}>
               <StatusBar style='light' />
               <LinearGradient
                    colors={['#03012C', '#2A005E']}
                    style={styles.linearGradian}>
                    <ImageBackground
                         resizeMode='cover'
                         imageStyle={{ opacity: 0.08 }}
                         style={{
                              flex: 1,
                              paddingHorizontal: 12,
                              paddingTop: 16
                         }}
                         source={require('../res/img_onPrimary.png')}>
                         <LogoAndProfile />
                         <ScrollView showsVerticalScrollIndicator={false}>

                              <View style={{
                                   flexDirection: 'column',
                                   alignItems: 'flex-end'
                              }}>
                                   <AnimatedLottieView style={{
                                        width: '50%',
                                        height: 160
                                   }} source={
                                        require('../res/68792-cute-astronaut-flying-in-space-animation.json')
                                   }
                                        autoPlay={true}
                                        loop={true} />
                                   <Box style={styles.box}>
                                        <AnimatedLottieView
                                             style={styles.lottie}
                                             autoPlay={true}
                                             loop={true}
                                             source={
                                                  require('../res/98326-planet-and-stars.json')
                                             } />
                                        <View style={{ flexWrap: 'nowrap', flex: 1 }}>
                                             <Text
                                                  style={{
                                                       color: 'white',
                                                       fontSize: 24,
                                                       fontWeight: 'bold',
                                                  }}
                                             >Thành tích của bạn
                                             </Text>
                                        </View>
                                   </Box>
                              </View>
                              <View style={{ alignItems: 'flex-start' }}>
                                   <Text style={StyleGloble.textLeading2}>Khóa học gần đây</Text>
                                   {
                                        titleCourse.map((item) => {
                                             return (
                                                  <ItemCourse key={item.id} nameTitle={item.name_title} />
                                             )
                                        })
                                   }
                              </View>
                         </ScrollView>
                    </ImageBackground>
               </LinearGradient>
          </SafeAreaView >
     )
}

const ItemCourse = (props) => {
     let { nameTitle } = props
     return (
          <View style={{
               width: '100%',
               marginVertical: 16,
               height: 140,
               backgroundColor: '#33ff0021',
               borderRadius: 18,
               borderColor: Color.text,
          }}>
               <ImageBackground
                    resizeMode='cover'
                    imageStyle={{ opacity: 0.3, borderRadius: 18 }}
                    source={require('../res/img_word_tech.png')}
                    style={{
                         flex: 1,
                         width: '100%',
                    }}>
                    <View style={{
                         paddingVertical: 8,
                         paddingHorizontal: 16
                    }}>
                         <Text style={[StyleGloble.textLeading2, { fontWeight: 'normal', textAlign: 'justify', fontSize: 18 }]}>{nameTitle}</Text>
                    </View>
               </ImageBackground>
          </View>
     )
}

function LogoAndProfile(props) {
     return (
          <View>
               <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                    alignItems: 'center'
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
                    <Profile />
               </View>
          </View>

     );
}

const Profile = () => {
     return (
          <View style={{
               flexDirection: 'row',
               alignItems: 'baseline',
               position: 'relative'
          }}>
               <View style={{
                    borderColor: Color.primary,
                    borderWidth: 1,
                    backgroundColor: '#ac58f53a',
                    position: 'absolute',
                    right: 20,
                    bottom: -2,
                    paddingRight: 24,
                    paddingStart: 4,
                    paddingVertical: 4,
                    borderRadius: 16,
                    margin: 1
               }}>
                    <Text style={{ color: 'white', marginHorizontal: 8 }}>Nguyễn Văn A</Text>
               </View>
               <View style={styles.avatar}>
                    <Image
                         source={require('../res/avatar.jpg')}
                         style={{
                              width: 48,
                              height: 48,
                              borderRadius: 24,
                         }}
                    />
               </View>

          </View>
     )
}

export default ProfileScreen

const styles = StyleSheet.create({
     linearGradian: {
          flex: 1,
     },
     avatar: {
          borderRadius: 50,
          borderWidth: 1,
          elevation: 10,
          shadowOpacity: 1,
          borderColor: Color.primary,
     },
     box: {
          height: 200,
          width: '100%',
          backgroundColor: '#ac58f544',
          borderRadius: 24,
          flexDirection: 'row',
          marginTop: -30,
          justifyContent: 'space-between',
          paddingHorizontal: 6,
          paddingVertical: 8,
     },
     lottie: {
          width: '50%',
     }
})