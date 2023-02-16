import { Animated, Dimensions, Image, ImageBackground, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import Color from '../value/Color'
import StyleGloble from '../style/StyleGloble'
import Icon from 'react-native-vector-icons/Ionicons'
import PagerView from 'react-native-pager-view';
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import MyLogo from '../components/MyLogo'
import { Button, FAB, IconButton, Stack } from '@react-native-material/core'
import MyFAB from '../components/MyFAB'
import { MyProgress } from '../components/MyProgress'
import AnimatedLottieView from 'lottie-react-native'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const withProgress = windowWidth - 12 * 2
const AuthScreen = ({ navigation }) => {

     const [isHideFab, setisHideFab] = useState(false)
     const keyboardShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
               setisHideFab(true)
          }
     );
     const keyboardHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
               setisHideFab(false)
          }
     );

     const valueTranslateX = useRef(new Animated.Value(0)).current

     const [isLogin, setIsLogin] = useState(true)
     const [pageSelected, setPageSelected] = useState(0)
     Animated.spring(valueTranslateX, {
          toValue: isLogin ? 0 : 1,
          duration: 1000,
          useNativeDriver: true,
     }).start()
     const valueTranslateXRange = valueTranslateX.interpolate({
          inputRange: [0, 1],
          outputRange: [-withProgress / 2, withProgress / 2]
     })

     const [isProgress, setIsProgress] = useState(false)

     const refPager = useRef(PagerView);

     const changeCurrentPager = (pos = new Number) => {
          refPager.current.setPage(pos)
     }

     return (
          <SafeAreaView style={{ flex: 1 }}>
               <StatusBar style='light' />

               {
                    isProgress ?
                         <AnimatedLottieView
                              style={{
                                   position: 'absolute',
                                   zIndex: 2,
                                   backgroundColor: '#0000004f',
                                   top: 0
                              }}
                              autoPlay={true}
                              loop={true}
                              source={require('../res/64036-planet.json')} />
                         : null
               }

               <View style={{
                    flex: 1
               }}>
                    <LinearGradient
                         colors={['#03012C', '#2A005E']}
                         style={styles.linearGradian}>
                         <ImageBackground
                              resizeMode='cover'
                              imageStyle={{ opacity: 0.08 }}
                              style={{
                                   flex: 1,
                                   paddingVertical: 26
                              }}
                              source={require('../res/background_auth_main.png')}>


                              <ImageBackground
                                   source={require('../res/background_auth_top.png')}
                                   imageStyle={{ opacity: 0.3 }}>
                                   <MyLogo />
                                   <View style={{
                                        paddingHorizontal: 12,
                                   }}>
                                        <Image style={{
                                             marginTop: 12
                                        }}
                                             source={require('../res/img_person_auth.png')}>
                                        </Image>
                                        <MyProgress valueTranslateX={valueTranslateXRange} />
                                   </View>

                              </ImageBackground>
                              <View style={{
                                   justifyContent: 'space-between',
                                   flexDirection: 'row',
                                   paddingHorizontal: 12,
                                   borderRadius: 10

                              }}>
                                   <Text style={[StyleGloble.textLeading, { opacity: isLogin ? 1 : 0.3 }]}
                                        onPress={() => {
                                             setIsLogin(true)
                                             changeCurrentPager(0)
                                        }}>Đăng nhập</Text>
                                   <Text
                                        style={[StyleGloble.textLeading, { opacity: isLogin ? 0.3 : 1 }]}
                                        onPress={() => {
                                             setIsLogin(false)
                                             changeCurrentPager(1)
                                        }}>
                                        Đăng kí
                                   </Text>
                              </View>
                              <PagerView
                                   ref={refPager}
                                   onPageSelected={(e) => {
                                        e.nativeEvent.position == 0 ? setIsLogin(true) : setIsLogin(false)
                                   }}
                                   key={1}
                                   pageMargin={20}
                                   style={{
                                        flex: 1
                                   }}>
                                   <View key={2}>
                                        <LoginScreen setIsProgress={setIsProgress} navigation={navigation} />
                                   </View>
                                   <View key={1}>
                                        <RegisterScreen />
                                   </View>
                              </PagerView>
                              {
                                   isHideFab ? null : <MyFAB
                                        changeCurrentPager={changeCurrentPager}
                                        isLogin={isLogin}
                                        setIsLogin={setIsLogin} />
                              }
                         </ImageBackground>
                    </LinearGradient>
               </View>
          </SafeAreaView>
     )
}


export default AuthScreen

const styles = StyleSheet.create({
     linearGradian: {
          flex: 1,
     },
})