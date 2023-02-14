import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import AnimatedLottieView from 'lottie-react-native'
import { Alert, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Color from '../../value/Color'
import StyleGloble from '../../style/StyleGloble'
import { Divider, Spacer } from '@react-native-material/core'
import Request from '../../network/Request'

const StudyScreen = ({ navigation, route }) => {
     let { id } = route.params

     const [dataListWord, setDataListWord] = useState([])
     const [currentIndex, setCurrentIndex] = useState(0)

     useEffect(() => {
          const getWordById = async () => {
               const data = await Request.post('/getWordById', {
                    id: id
               })
               console.log(data.data);
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
                         <LogoAndProfile />
                         <View style={{
                              flexDirection: 'column',
                              alignItems: 'flex-end'
                         }}>
                         </View>
                         <View style={{ alignItems: 'flex-start' }}>
                              <Text style={StyleGloble.textLeading2}>Tiến độ 1/20</Text>
                         </View>
                         <Divider color='white' />
                         <ContentQuiz
                              dataListWord={dataListWord}
                              currentIndex={currentIndex} />
                    </ImageBackground>
               </LinearGradient>
          </SafeAreaView >
     )
}

const ContentQuiz = (props) => {
     let { dataListWord, currentIndex } = props
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
               console.log("setListAnswer is: " + ranIndex);

          }
     }, [dataListWord])

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
                    <ItemQuizAnswer trueAnswer={dataListWord[currentIndex]?.answer} text={listAnswer[0]} />
                    <ItemQuizAnswer trueAnswer={dataListWord[currentIndex]?.answer} text={listAnswer[1]} />
                    <ItemQuizAnswer trueAnswer={dataListWord[currentIndex]?.answer} text={listAnswer[2]} />
                    <ItemQuizAnswer trueAnswer={dataListWord[currentIndex]?.answer} text={listAnswer[3]} />
               </View>
          </View>
     )
}

const ItemQuizAnswer = (props) => {
     let { text, trueAnswer } = props
     const [isTrue, setIsTrue] = useState(3)
     return (
          <TouchableOpacity
               onPress={() => {
                    if (text === trueAnswer) {
                         setIsTrue(1)
                    } else {
                         setIsTrue(2)
                    }
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