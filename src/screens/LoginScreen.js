import { Animated, Button, Dimensions, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import Color from '../value/Color'
import StyleGloble from '../style/StyleGloble'
import Icon from 'react-native-vector-icons/Ionicons'
import PagerView from 'react-native-pager-view';
import MyButton from '../components/MyButton'
import MyTextInput from '../components/MyTextInput'
import { useForm } from 'react-hook-form'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const onSubmit = (data, navigation) => {
     console.log(data);
     navigation.navigate('BottomTabHome')
}
const LoginScreen = (props) => {
     let { navigation } = props
     const [userName, setUserName] = useState('')
     const [passWord, setPassWord] = useState('')

     const { control, formState: { errors }, handleSubmit } = useForm({
          defaultValues: {
               userName: '',
               passWord: ''
          }
     });
     return (
          <View>
               <MyTextInput
                    label="Tên đăng nhập"
                    icon="mail"
                    setValue={setPassWord}
                    control={control}
                    errors={errors}
                    nameController="userName"
                    contentError="Tên đăng nhập 5 đến 10 kí tự, không có kí tự đặc biệt"
                    valuePattern='^[a-zA-Z]{5,10}$'
               />
               <MyTextInput
                    label="Mật khẩu"
                    icon="lock-closed"

                    enablePass={true}
                    nameIconPassEnable="eye"
                    nameIconPassDisable="eye-off"

                    setValue={setPassWord}
                    control={control}
                    errors={errors}
                    nameController="passWord"
                    contentError="Mật khẩu 5-20 kí tự"
                    valuePattern='^[a-zA-Z!@#$%^&*()]{5,20}$'



               />
               <MyButton
                    title="ĐĂNG NHẬP"
                    onPress={
                         handleSubmit((data) => {
                              onSubmit(data, navigation)
                         })
                 

                    }
               />
          </View>
     )
}



const MyProgress = () => {
     return (
          <View>
               <View style={{
                    width: '100%',
                    height: 10,
                    backgroundColor: 'white',
                    borderRadius: 6,
                    marginBottom: 12,
                    overflow: 'hidden'
               }}>
                    <Animated.View style={{
                         transform: [{
                              translateX: -windowWidth / 2
                         }],
                         width: '100%',
                         backgroundColor: Color.primary,
                         height: 10,
                         borderRadius: 6
                    }}>
                    </Animated.View>

               </View>
          </View>
     )
}

const Logo = () => {
     return (
          <View style={{ flexDirection: 'row', alignItems: 'baseline', paddingHorizontal: 12 }}>
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
     )
}

export default LoginScreen

const styles = StyleSheet.create({
     linearGradian: {
          flex: 1,
     },
})