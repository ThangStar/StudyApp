import { BackHandler, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import Color from '../../value/Color'
import StyleGloble from '../../style/StyleGloble'
import AnimatedLottieView from 'lottie-react-native'
import { Box } from '@react-native-material/core'
import MyButton from '../../components/MyButton'
import MyButtonIcon from '../../components/MyButtonIcon'
import { Audio } from 'expo-av'

const SoundWinGame = [
     require("../../res/sounds/win_game_2.mp3"),
     require("../../res/sounds/win_game_1.mp3"),

]

const ResultCourseScreen = ({ navigation, route }) => {
     let { currentScore, numberQuestion, title } = route.params

     const [sound, setSound] = useState();
     async function playSoundBackground() {
          const { sound } = await Audio.Sound.createAsync(SoundWinGame[Math.floor(Math.random()*SoundWinGame.length)]);
          setSound(sound);
          await sound.setVolumeAsync(0.6)
          await sound.playAsync();
     }
     useEffect(() => {
          return sound
               ? () => {
                    sound.unloadAsync();
               }
               : undefined;
     }, [sound]);


     useEffect(() => {
          playSoundBackground()
     }, [])

     const lottieRef = useRef(null)

     useEffect(() => {
          setTimeout(() => {
               lottieRef.current?.play()
          }, 200);
     }, [])
     return (
          <SafeAreaView style={{ flex: 1 }}>
               <StatusBar style='light' />
               <LinearGradient
                    colors={['#03012C', '#2A005E']}
                    style={styles.linearGradian}>
                    <View>
                         <Logo />
                         <Text style={StyleGloble.textLeading}>Kết quả</Text>
                    </View>
                    <View>
                         <Box style={{
                              width: '100%',
                              alignItems: 'center'
                         }}>
                              <AnimatedLottieView
                                   loop={true}
                                   ref={lottieRef}
                                   source={require('../../res/100888-cup.json')}
                                   style={{
                                        width: '100%',
                                        height: 280,
                                        marginTop: -20
                                   }}
                                   autoPlay={true}
                              />
                         </Box>
                         <TitleAndSub title={title} />
                         <Score currentScore={currentScore} numberQuestion={numberQuestion} />
                    </View>
                    <View>
                         <ButtonShareAndBackToHome navigation={navigation} />
                    </View>

                    <AnimatedLottieView
                         loop={true}
                         resizeMode='cover'
                         source={require('../../res/85744-success.json')}
                         style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                         }}
                         autoPlay={true}
                    />
               </LinearGradient>

          </SafeAreaView >
     )
}

const ButtonShareAndBackToHome = (props) => {
     let { navigation } = props
     return (
          <View style={{
               flexDirection: 'row',
               justifyContent: 'space-between',
               paddingHorizontal: 12,
          }}>
               <MyButtonIcon navigation={navigation} title='Chia sẻ với bạn bè' />
               <MyButtonIcon navigation={navigation} title='Tiếp tục học' />

          </View>
     )
}

const Score = (props) => {
     let { currentScore, numberQuestion, title } = props
     return (
          <View>
               <Text style={[StyleGloble.textLeading, { color: currentScore < numberQuestion / 2 ? '#F62F63' : Color.text }]}>{currentScore == numberQuestion ? "Hoàn hảo" :
                    currentScore >= numberQuestion / 2 ? 'Tốt' : 'Thất bại'}</Text>
               <Text style={[StyleGloble.textLeading, { fontSize: 48, color: Color.onSecondary }]}>
                    {currentScore} <Text style={[StyleGloble.textLeading, { fontSize: 48, color: currentScore == numberQuestion ? Color.onSecondary : Color.text }]}>/ {numberQuestion}</Text> </Text>
          </View>
     )
}

const TitleAndSub = (props) => {
     let { title } = props
     return (
          <View>
               <Text style={StyleGloble.textLeading}>Chúc mừng bạn!</Text>
               <Text style={[StyleGloble.textTralling, { marginVertical: 20, marginHorizontal: 26 }]}>Bạn đã hoàn tất khóa học {title}</Text>
          </View>
     )
}
function Logo(props) {
     return (
          <View>
               <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 12,
               }}>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                         <Image source={require('../../res/logo.png')}>
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
export default ResultCourseScreen

const styles = StyleSheet.create({
     linearGradian: {
          flex: 1,
          justifyContent: 'space-between',
          paddingVertical: 20
     },
})