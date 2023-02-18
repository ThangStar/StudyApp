import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import AnimatedLottieView from 'lottie-react-native'
import { Alert, Animated, Button, Dimensions, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Color from '../../value/Color'
import StyleGloble from '../../style/StyleGloble'
import { Divider, Spacer } from '@react-native-material/core'
import Request from '../../network/Request'
import { Audio } from 'expo-av'
import AsyncStorage from '@react-native-async-storage/async-storage'

const soundBackground = [
     require("../../res/sounds/background1.mp3"),
     require("../../res/sounds/background2.wav")
]

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const paddingDefault = 12
const widthFixed = windowWidth - paddingDefault * 2

const saveStorageData = async (key, value) => {
     try {
          console.log(String.SAVE_DATA_SUCCESS);
          await AsyncStorage.setItem(key, value)
     } catch (e) {
          console.log('ERROR');
     }
}

const GetDataFromStorage = async (key) => {
     try {
          const value = await AsyncStorage.getItem(key)
          if (value !== null) {
               console.log("VALUE IS: " + value);
               return value
          }
          return 0
     } catch (e) {
          console.log(String.SAVE_DATA_ERROR);
          console.log("VALUE ERROR: " + e);
          return 0
     }
}

const StudyScreen = ({ navigation, route }) => {
     let { id, title } = route.params


     const [sound, setSound] = useState();
     async function playSoundBackground() {
          const { sound } = await Audio.Sound.createAsync(soundBackground[Math.floor(Math.random()*soundBackground.length)]);
          setSound(sound);
          sound.setVolumeAsync(0.3)
          await sound.setIsLoopingAsync(true)
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

     const [dataListWord, setDataListWord] = useState([])
     const [currentIndex, setCurrentIndex] = useState(0)
     const [currentScore, setCurrentScore] = useState(0)

     useEffect(() => {
          const getWordById = async () => {
               const data = await Request.post('/getWordById', {
                    id: id
               })
               setDataListWord(data.data)
          }
          getWordById()
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
                         }}>
                         {/* dialog progress */}

                         <LogoAndProfile />
                         <View style={{
                              flexDirection: 'column',
                              alignItems: 'flex-end'
                         }}>
                         </View>
                         <View style={{ alignItems: 'flex-start' }}>
                              <Text style={StyleGloble.textLeading2}>Tiến độ {currentIndex + 1}/{dataListWord.length}</Text>
                         </View>
                         <View style={{
                              width: "100%",
                              borderBottomWidth: 1,
                              borderColor: 'white',
                              marginVertical: 2,
                              borderStyle: 'dashed'
                         }}></View>
                         <ContentQuiz
                              title={title}
                              setSound={setSound}
                              setCurrentScore={setCurrentScore}
                              currentScore={currentScore}
                              navigation={navigation}
                              dataListWord={dataListWord}
                              currentIndex={currentIndex}
                              setCurrentIndex={setCurrentIndex} />
                    </ImageBackground>
               </LinearGradient>
          </SafeAreaView >
     )
}

const ContentQuiz = (props) => {
     let { dataListWord, currentIndex, setCurrentIndex, navigation,
          currentScore, setCurrentScore, setSound, title } = props
     const [soundTrue, setSoundTrue] = useState();
     const [soundFalse, setSoundFalse] = useState();

     //Sound true answer
     async function playSoundTrueAnswer() {
          const { sound } = await Audio.Sound.createAsync(require('../../res/sounds/correct_answer.wav')
          );
          setSoundTrue(soundTrue);
          sound.setVolumeAsync(1)

          await sound.playAsync();
     }
     useEffect(() => {
          return soundTrue
               ? () => {
                    sound.unloadAsync();
               }
               : undefined;
     }, [soundTrue]);

     //Sound false answer
     async function playSoundFalseAnswer() {
          const { sound } = await Audio.Sound.createAsync(require('../../res/sounds/incorrect_answer.mp3')
          );
          setSoundFalse(soundFalse);

          await sound.playAsync();
     }
     useEffect(() => {
          return soundFalse
               ? () => {
                    sound.unloadAsync();
               }
               : undefined;
     }, [soundFalse]);


     const [listAnswer, setListAnswer] = useState([])
     useEffect(() => {
          if (dataListWord.length > 0) {
               const answerRan1 = dataListWord[Math.floor(Math.random() * dataListWord.length)].answer;
               const answerRan2 = dataListWord[Math.floor(Math.random() * dataListWord.length)].answer;
               const answerRan3 = dataListWord[Math.floor(Math.random() * dataListWord.length)].answer;
               const answerRan4 = dataListWord[Math.floor(Math.random() * dataListWord.length)].answer;

               var currentListAnswer = [answerRan1, answerRan2, answerRan3, answerRan4]
               const ranIndex = Math.floor(Math.random() * 4)
               currentListAnswer[ranIndex] = dataListWord[currentIndex].answer
               setListAnswer(currentListAnswer)
          }
     }, [dataListWord, currentIndex])

     const refTranslateX = useRef(new Animated.Value(-widthFixed)).current
     const refTranslateXImg = useRef(new Animated.Value(0)).current
     const StartAnim = () => {
          Animated.timing(refTranslateX, {
               toValue: 0,
               useNativeDriver: true,
               duration: 3000
          }).start()
     }

     const ResetValueAnim = () => {
          refTranslateX.setValue(-widthFixed)
     }
     const [isDisable, setisDisable] = useState(false)
     return (
          <View style={{
               flex: 1,
               justifyContent: 'space-between',
          }}>
               <View style={{
               }}>
                    <Image
                         style={{
                              resizeMode: 'cover',
                              width: '100%',
                              marginTop: 12,
                              height: 120,
                              borderRadius: 18,
                              opacity: 0.8,
                         }}
                         source={require('../../res/img_word_tech.png')} />

               </View>
               <View style={{

               }}>
                    {/* Progress */}
                    <View style={{
                         marginBottom: 10

                    }}>

                         <View style={{
                              backgroundColor: Color.onSuface,
                              borderRadius: 18,
                              overflow: 'hidden',

                         }}>
                              <Animated.View
                                   style={{
                                        backgroundColor: Color.onSecondary,
                                        width: '100%',
                                        height: 10,
                                        borderRadius: 18,
                                        transform: [{ translateX: refTranslateX }]
                                   }}>
                              </Animated.View>
                         </View>
                    </View>


                    <Text style={StyleGloble.textLeading}>
                         {dataListWord[currentIndex] != undefined ?
                              dataListWord[currentIndex].name : null}
                    </Text>
                    <Text style={StyleGloble.textLeading}>
                         {dataListWord[currentIndex] != undefined ?
                              dataListWord[currentIndex].pronunciation : null}
                    </Text>
               </View>
               <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    marginTop: 12,
                    marginBottom: 46
               }}>
                    <ItemQuizAnswer
                    setisDisable = {setisDisable}
                    isDisable = {isDisable}
                         ResetValueAnim={ResetValueAnim}
                         startAnim={StartAnim}
                         title={title}
                         setSound={setSound}
                         playSoundTrueAnswer={playSoundTrueAnswer}
                         playSoundFalseAnswer={playSoundFalseAnswer}
                         setCurrentScore={setCurrentScore}
                         currentScore={currentScore} navigation={navigation} lengthWord={dataListWord.length} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} trueAnswer={dataListWord[currentIndex]?.answer} text={listAnswer[0]} />
                    <ItemQuizAnswer
                    setisDisable = {setisDisable}
                    isDisable = {isDisable}
                         ResetValueAnim={ResetValueAnim}
                         title={title}
                         startAnim={StartAnim}
                         setSound={setSound}
                         playSoundTrueAnswer={playSoundTrueAnswer}
                         playSoundFalseAnswer={playSoundFalseAnswer}
                         setCurrentScore={setCurrentScore}
                         currentScore={currentScore} navigation={navigation} lengthWord={dataListWord.length} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} trueAnswer={dataListWord[currentIndex]?.answer} text={listAnswer[1]} />
                    <ItemQuizAnswer
                    setisDisable = {setisDisable}
                    isDisable = {isDisable}
                         ResetValueAnim={ResetValueAnim}
                         title={title}

                         setSound={setSound}
                         startAnim={StartAnim}
                         playSoundTrueAnswer={playSoundTrueAnswer}
                         playSoundFalseAnswer={playSoundFalseAnswer}
                         setCurrentScore={setCurrentScore}
                         currentScore={currentScore} navigation={navigation} lengthWord={dataListWord.length} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} trueAnswer={dataListWord[currentIndex]?.answer} text={listAnswer[2]} />
                    <ItemQuizAnswer
                    setisDisable = {setisDisable}
                    isDisable = {isDisable}
                         ResetValueAnim={ResetValueAnim}
                         title={title}
                         startAnim={StartAnim}
                         setSound={setSound}

                         playSoundTrueAnswer={playSoundTrueAnswer}
                         playSoundFalseAnswer={playSoundFalseAnswer}
                         setCurrentScore={setCurrentScore}
                         currentScore={currentScore} navigation={navigation} lengthWord={dataListWord.length} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} trueAnswer={dataListWord[currentIndex]?.answer} text={listAnswer[3]} />
               </View>
          </View>
     )
}

const ItemQuizAnswer = (props) => {
     let { text, trueAnswer, setCurrentIndex, currentIndex,
          lengthWord, navigation, setCurrentScore, currentScore,
          playSoundTrueAnswer, playSoundFalseAnswer, setSound, title,
          startAnim, ResetValueAnim,setisDisable, isDisable } = props

     //1: true, 2: false, 3: default
     const [isTrue, setIsTrue] = useState(3)
     return (
          <TouchableOpacity
               disabled={isDisable}
               onPress={async () => {
                    setisDisable(true)
                    startAnim()
                    if (text === trueAnswer) {
                         var currentNumber = await GetDataFromStorage("NUMBER_COURSE_STUDIED")
                         currentNumber = ++currentNumber
                         await saveStorageData("NUMBER_COURSE_STUDIED", currentNumber.toString())
                         setIsTrue(1)
                         setCurrentScore(++currentScore)
                         playSoundTrueAnswer()
                    } else {
                         setIsTrue(2)
                         playSoundFalseAnswer()
                    }
                    setTimeout(() => {
                         setisDisable(false)
                         setIsTrue(3)
                         const targetIndex = ++currentIndex

                         if (targetIndex >= lengthWord) {
                              setSound(new Audio.Sound())
                              //go to congraturation screen
                              navigation.navigate("ResultCourseScreen", {
                                   currentScore: currentScore,
                                   numberQuestion: lengthWord,
                                   title: title
                              })

                         } else {
                              setCurrentIndex(targetIndex)
                         }
                         ResetValueAnim()
                    }, 3000);
               }}
               style={{
                    backgroundColor: '#22c55e44',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 90,
                    borderRadius: 18,
                    borderWidth: isTrue == 1 || isTrue == 2 ? 3 : 1,
                    borderColor: isTrue == 1
                         ?
                         Color.onSecondary
                         :
                         isTrue == 2
                              ?
                              'red'
                              :
                              Color.onSecondary,
                    width: '47%',
                    marginVertical: 6,
               }}>
               <View >
                    <Text style={styles.textAnswer}>{text}</Text>
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
                    alignItems: 'center'
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



export default StudyScreen

const styles = StyleSheet.create({
     linearGradian: {
          flex: 1,
     },

     containerAnswer: {

     },
     textAnswer: {
          color: Color.onSecondary,
     }
})