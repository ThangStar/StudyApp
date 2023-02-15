import { Animated, Dimensions, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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

const onSubmit = (data) => {

}
const RegisterScreen = () => {
     const { control, formState: { errors }, handleSubmit } = useForm({
          defaultValues: {
               userName: '',
               passWord: ''
          }
     });
     return (
          <View>
               <MyTextInput
                    label="Địa chỉ email"
                    icon="mail"
                    control = {control}
                    errors = {errors}

                    nameController = "email"
                    contentError = "Địa chỉ email phải dạng: example@email.com"
                    valuePattern = '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'
               />
               <MyTextInput
                    label="Tên đăng nhập"
                    icon="person"

                    control = {control}
                    errors = {errors}
                    nameController = "username"
                    contentError = "Tên đăng nhập 5 đến 10 kí tự, không có kí tự đặc biệt"
                    valuePattern = '^[a-zA-Z]{5,10}$'

               />
               <MyTextInput
                    label="Mật khẩu"
                    icon="lock-closed"

                    control = {control}
                    errors = {errors}
                    nameController = "pass"
                    contentError = "Mật khẩu 5-20 kí tự"
                    valuePattern = '^[a-zA-Z!@#$%^&*()]{5,20}$'

               />
               <MyTextInput
                    label="Nhập lại mật khẩu"
                    icon="lock-closed"

                    control = {control}
                    errors = {errors}
                    nameController = "passAgain"
                    contentError = "Nhập lại mật khẩu 5-20 kí tự"
                    valuePattern = '^[a-zA-Z!@#$%^&*()]{5,20}$'

               />
               <MyButton title="ĐĂNG KÍ" onPress = {handleSubmit(onSubmit)}/>
          </View>
     )
}

export default RegisterScreen

const styles = StyleSheet.create({
     linearGradian: {
          flex: 1,
     },
})