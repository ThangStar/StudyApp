import { BackHandler, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import Color from '../value/Color'
import { Avatar, Box, Divider, HStack, IconButton, useTheme, VStack } from '@react-native-material/core'
import Icon from 'react-native-vector-icons/Ionicons'
import AnimatedLottieView from 'lottie-react-native'
import StyleGloble from '../style/StyleGloble'
import Request from '../network/Request'
import { Dialog } from 'react-native-paper'

const HomeScreen = ({ route }) => {
     let { infoUser } = route.params
     useEffect(() => {
          const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
          return () => backHandler.remove()
     }, [])

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
                              paddingTop: 26
                         }}
                         source={require('../res/img_onPrimary.png')}>
                         <LogoAndNav infoUser={infoUser} />
                         <ScrollView>


                              <HStack style={{
                                   justifyContent: 'space-between',
                                   marginVertical: 6,
                                   flexWrap: 'wrap',
                                   marginBottom: 40
                              }}>
                                   <ItemMenu icon="calendar" title="Số từ đã học" value="100" backgroundBox={"#0EA5E9"} />
                                   <ItemLottie source={require('../res/40399-mars.json')} />
                                   <ItemMenu icon="heart" value="100" title="Yêu thích" backgroundBox={"#FF506E"} />
                                   <ItemLottie source={require('../res/40400-neptune.json')} />

                                   <ItemMenu icon="golf" value="100%" title="Tỉ lệ chính xác" backgroundBox={"#AC58F5"} />

                                   <ItemMenu icon="time" value="10 phút" title="Thời gian trung bình" backgroundBox={"#F59E0B"} />

                                   <ItemMenu icon="book" value="20" title="Khóa học trên hệ thống" backgroundBox={"#3CB35A"} />
                                   <ItemMenu icon="trophy" value="10" title="Số thành tích" backgroundBox={"#0D9488"} />
                              </HStack>
                         </ScrollView>
                    </ImageBackground>
               </LinearGradient>
          </SafeAreaView >
     )
}

const ItemLottie = (props) => {
     let { source } = props
     return (
          <View style={{
               alignItems: 'center',
               padding: 12,
               width: '50%',
               justifyContent: 'center',
          }}>
               <AnimatedLottieView style={{
                    width: '48%',
                    height: 130
               }} source={
                    source
               }
                    autoPlay={true}
                    loop={true} />
          </View>
     )
}
const ItemMenu = (props) => {
     let { backgroundBox, title, value, icon } = props
     return (
          <Box style={{
               backgroundColor: backgroundBox,
               padding: 12,
               borderRadius: 12,
               width: '48%',
               justifyContent: 'space-between',
               marginVertical: 6,
               borderWidth: 1,
               borderColor: 'white'

          }}>
               <TouchableOpacity>

                    <View>
                         <Icon name={icon} color={Color.text} size={32} />
                         <Text style={[StyleGloble.textLeading2, { textAlign: 'left' }]}>
                              {title}
                         </Text>
                    </View>
                    <View style={{
                         width: '100%',
                         alignItems: 'flex-end',
                         marginTop: 12,
                    }}>
                         <View style={{
                              borderRadius: 25,
                              paddingHorizontal: 8,
                              paddingVertical: 4,
                              backgroundColor: Color.onSuface,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderWidth: 1,
                              borderColor: Color.text
                         }}>
                              <Text style={{
                                   color: "#FACC15",
                                   fontSize: 16,
                                   fontWeight: 'bold'
                              }}>{value}</Text>
                         </View>
                    </View>
               </TouchableOpacity>
          </Box>
     )
}
function LogoAndNav(props) {
     let {infoUser} = props
     return (
          <View>
               <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 8,
                    borderBottomColor: "#A1A1AA",
                    borderBottomWidth: 1,
                    elevation: 8,
                    borderStyle: 'dashed',
               }}>
                    <View style={{ alignItems: 'center' }}>
                         <VStack>
                              <HStack style={{
                                   alignItems: 'center'
                              }}>
                                   <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                        <Image source={require('../res/logo.png')}>
                                        </Image>
                                   </View >
                                   <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        color: Color.text,
                                        marginHorizontal: 6
                                   }}>
                                        Hello
                                   </Text>
                              </HStack>
                              <Text style={{
                                   fontSize: 24,
                                   fontWeight: 'bold',
                                   color: Color.onSecondary,
                                   letterSpacing: 2,
                              }}>
                                   {infoUser.full_name.split(" ").pop()}
                              </Text>
                         </VStack>
                    </View >
                    <IconButton
                         icon={
                              ({ color, size }) => (
                                   <Icon name='reorder-two-outline' size={size} color={Color.text} />
                              )
                         } />
               </View>
          </View>

     );
}
export default HomeScreen

const styles = StyleSheet.create({
     linearGradian: {
          flex: 1,
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