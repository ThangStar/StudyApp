import { Animated, Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MyButton from '../components/MyButton'
import MyTextInput from '../components/MyTextInput'
import { useForm } from 'react-hook-form'
import Request from '../network/Request'

const onSubmit = async (data) => {
     let { fullname, email, password, username } = data
     console.log('fullname: ' + data.fullname);
     console.log('email: ' + data.email);
     console.log('username: ' + data.username);
     console.log('password: ' + data.password);
     const rs = await Request.post('/register', {
          fullname: fullname,
          email: email,
          username: username,
          password: password
     })
     if (rs.status == 200) {
          ToastAndroid.showWithGravity(
               rs.data,
               ToastAndroid.SHORT,
               ToastAndroid.CENTER
          );
     }else{
          ToastAndroid.showWithGravity(
               "Lỗi mạng!",
               ToastAndroid.SHORT,
               ToastAndroid.CENTER
          );
     }

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
               <ScrollView showsVerticalScrollIndicator={false}>

                    <MyTextInput
                         label="Họ và tên"
                         icon="text"
                         control={control}
                         errors={errors}
                         nameController="fullname"
                         contentError="Địa chỉ email phải dạng: example@email.com"
                         valuePattern="^(([a-zA-Z\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*)([a-zA-Z\s\'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*)([a-zA-Z\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]))*$"
                    />

                    <MyTextInput
                         label="Địa chỉ email"
                         icon="mail"
                         control={control}
                         errors={errors}

                         nameController="email"
                         contentError="Địa chỉ email phải dạng: example@email.com"
                         valuePattern='^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'
                    />
                    <MyTextInput
                         label="Tên đăng nhập"
                         icon="person"

                         control={control}
                         errors={errors}
                         nameController="username"
                         contentError="Tên đăng nhập 5 đến 10 kí tự, không có kí tự đặc biệt"
                         valuePattern='^[a-zA-Z]{5,10}$'

                    />
                    <MyTextInput
                         label="Mật khẩu"
                         icon="lock-closed"

                         control={control}
                         errors={errors}
                         nameController="password"
                         contentError="Mật khẩu 5-20 kí tự"
                         valuePattern='^[a-zA-Z!@#$%^&*()]{5,20}$'

                    />
                    <MyButton title="ĐĂNG KÍ" onPress={handleSubmit(onSubmit)} />
               </ScrollView>
          </View>
     )
}

export default RegisterScreen

const styles = StyleSheet.create({
     linearGradian: {
          flex: 1,
     },
})