import { Animated, Button, Dimensions, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '../value/Color'
import MyButton from '../components/MyButton'
import MyTextInput from '../components/MyTextInput'
import { useForm } from 'react-hook-form'
import Request from '../network/Request'
import * as LocalStorage from '../storage/LocalStorage'
import { String } from '../value/String'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const onSubmit = async (data, navigation, setIsProgress) => {
     setIsProgress(true)
     const dataLogin = {
          username: data.userName,
          password: data.passWord
     }
     const res = await Request.post('/login', dataLogin)
     if (res.data.length > 0) {
          //save data 

          //login success!
          var usernamePush = await LocalStorage.PushDataFromStorage("INFO_USER", JSON.stringify(dataLogin))
          console.log(usernamePush);
          navigation.navigate('BottomTabHome', {
               infoUser: res.data
          })
     } else {
          //login faile!
          ToastAndroid.showWithGravity(
               "Tài khoản hoặc mật khẩu không chính xác!",
               ToastAndroid.SHORT,
               ToastAndroid.CENTER
          );

     }
     setIsProgress(false)

}


const LoginScreen = (props) => {
     let { navigation, setIsProgress } = props


     const { control, formState: { errors }, handleSubmit, setValue } = useForm({
          defaultValues: {
               userName: '',
               passWord: ''
          }
     });

     useEffect(() => {

          const initDataLogin = async () => {
               var infoUser = await LocalStorage.GetDataFromStorage("INFO_USER")
               if (infoUser != "NO VALUE") {
                    setValue('userName', JSON.parse(infoUser).username)
                    setValue('passWord', JSON.parse(infoUser).password)
               }
          }
          initDataLogin()

     }, [])

     return (
          <View>

               <MyTextInput
                    label="Tên đăng nhập"
                    icon="mail"
                    control={control}
                    errors={errors}
                    nameController="userName"
                    contentError="Tên đăng nhập 5 đến 10 kí tự, không có kí tự đặc biệt"
                    valuePattern='^[a-zA-Z0-9]{5,10}$'
               />
               <MyTextInput
                    label="Mật khẩu"
                    icon="lock-closed"

                    enablePass={true}
                    nameIconPassEnable="eye"
                    nameIconPassDisable="eye-off"

                    control={control}
                    errors={errors}
                    nameController="passWord"
                    contentError="Mật khẩu 5-20 kí tự"
                    valuePattern='^[a-zA-Z0-9!@#$%^&*()]{5,20}$'

               />
               <MyButton
                    title="ĐĂNG NHẬP"
                    onPress={
                         handleSubmit((data) => {
                              onSubmit(data, navigation, setIsProgress)
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