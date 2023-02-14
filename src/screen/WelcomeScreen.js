import { Animated, Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import StyleGloble from '../style/StyleGloble'
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Box, IconButton } from '@react-native-material/core';
import Color from '../value/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimatedLottieView from 'lottie-react-native';
import Swiper from 'react-native-swiper'
import * as String from '../value/String';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const valuePaddingContainer = 12
var valueStartWidthAnim = -windowWidth + valuePaddingContainer * 2
valueStartWidthAnim += Math.abs(valueStartWidthAnim) / 3

//Anim translator title and sub
var sumPaddingH = valuePaddingContainer * 2
var startValueTranslateX = -windowWidth + sumPaddingH

//Resource anim lottie
const resAnim1 = require('../res/anim_1.json')
const resAnim2 = require('../res/26870-a-star-with-a-video-player.json')
const resAnim3 = require('../res/lf30_editor_node5gyd.json')


const WelcomeScreen = ({ navigation }) => {
     //Anim progress
     var [valueAnim, setValueAnim] = useState(valueStartWidthAnim)
     const percenAnim = useRef(new Animated.Value(valueStartWidthAnim)).current

     //Anim title and sub
     const [valueTranslateX, setValueTranslateX] = useState(0)
     const animTranslateX = useRef(new Animated.Value(valueTranslateX)).current

     //Anim lottie animated
     const animLottie = useRef(new Animated.Value(0)).current

     //count intro
     var [count, setCount] = useState(0)

     const handlEventAnim = () => {
          setValueAnim(valueAnim += Math.abs(valueStartWidthAnim) / 2)
          Animated.timing(percenAnim, {
               toValue: valueAnim,
               useNativeDriver: true
          }).start()
          setValueTranslateX(valueTranslateX + startValueTranslateX)
          Animated.spring(animTranslateX, {
               toValue: valueTranslateX + startValueTranslateX,
               useNativeDriver: true,
          }).start()
          Animated.spring(animLottie, {
               toValue: valueTranslateX + startValueTranslateX,
               useNativeDriver: true,
          }).start()
     }

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
                         }}
                         source={require('../res/img_onPrimary.png')}>
                         <View style={{
                              justifyContent: 'space-around',
                              flex: 1,
                              paddingHorizontal: valuePaddingContainer,
                         }}>
                              <LogoAndExit percenAnim={percenAnim} />
                              <View style={{ flexDirection: 'row', overflow: 'scroll' }}>
                                   <TitleAndSub
                                        valueTranslateX={animTranslateX}
                                        title={String.ContentWellcome.TITLE1}
                                        content={String.ContentWellcome.CONTENT1} />
                                   <TitleAndSub
                                        valueTranslateX={animTranslateX}
                                        title={String.ContentWellcome.TITLE2}
                                        content={String.ContentWellcome.CONTENT2} />
                                   <TitleAndSub
                                        valueTranslateX={animTranslateX}
                                        title={String.ContentWellcome.TITLE3}
                                        content={String.ContentWellcome.CONTENT3} />
                              </View>
                              <View style={{ flexDirection: 'row', overflow: 'scroll' }}>
                                   <LottieAnimation anim={animLottie} resource={resAnim1} />
                                   <LottieAnimation anim={animLottie} resource={resAnim2} />
                                   <LottieAnimation anim={animLottie} resource={resAnim3} />
                              </View>

                              <View style={{ alignItems: 'center' }}>
                                   <IconButton
                                        style={styles.myIconButton}
                                        icon={
                                             ({ color, size }) => (
                                                  <Icon size={36}
                                                       color={count > 1 ? Color.onSecondary : 'white'}
                                                       name={count > 1 ? 'checkmark' :
                                                            'chevron-forward'}>
                                                  </Icon>
                                             )
                                        }
                                        onPress={() => {
                                             handlEventAnim()
                                             setCount(++count)
                                             {
                                                  count > 2 ?
                                                  navigation.navigate('AuthScreen')
                                                  : null
                                             };
                                        }}>
                                   </IconButton>
                              </View>
                         </View>
                    </ImageBackground>
               </LinearGradient>
          </SafeAreaView >
     )
}

function MyProgressBar(props) {
     let { percenAnim } = props
     return (<View>
          <View style={{
               width: '100%',
               height: 10,
               backgroundColor: 'white',
               borderRadius: 6,
               marginBottom: 16,
               overflow: 'hidden'
          }}>
               <Animated.View style={{
                    transform: [{
                         translateX: percenAnim
                    }],
                    width: '100%',
                    backgroundColor: Color.onSecondary,
                    height: 10,
                    borderRadius: 6
               }}>
               </Animated.View>

          </View>
     </View>);
}

function LogoAndExit(props) {
     let { percenAnim } = props
     return (
          <View>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
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
                    <IconButton
                         icon={({ size }) => (

                              <Icon size={36} color='white' name='close'></Icon>
                         )
                         }>

                    </IconButton>
               </View>
               <MyProgressBar percenAnim={percenAnim} />
          </View>

     );
}


function TitleAndSub(props) {
     let { title, content, valueTranslateX } = props
     return (
          <Animated.View style={{
               width: '100%',
               transform: [{ translateX: valueTranslateX }]
          }}>
               <Text style={StyleGloble.textLeading}>
                    {title}
               </Text>
               <Text style={StyleGloble.textTralling}>
                    {content}
               </Text>
          </Animated.View>
     );
}

function LottieAnimation(props) {
     let { anim, resource } = props
     return (<Animated.View style={{
          width: '100%',
          transform: [{ translateX: anim }],
          alignItems: 'center'
     }}>
          <AnimatedLottieView
               source={resource}
               autoPlay={true}
               loop={true}
               style={{
                    height: 250,
                    alignItems: 'center'
               }}>
          </AnimatedLottieView>


     </Animated.View>);
}
export default WelcomeScreen

const styles = StyleSheet.create({
     linearGradian: {
          flex: 1,
          alignItems: 'center',
     },
     myIconButton: {
          backgroundColor: Color.onPrimary,
          width: 100,
          height: 100,
          borderRadius: 50,
          borderWidth: 6,
          borderColor: Color.primary,


     }
})