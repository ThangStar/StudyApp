import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import StyleGloble from '../style/StyleGloble'
import { Button, IconButton } from '@react-native-material/core'
import { Controller, useForm } from 'react-hook-form'
import Color from '../value/Color'


const MyTextInput = (props) => {
     const [isInputting, setIsInputting] = useState(false)
     const [isShowPass, setIsShowPass] = useState()
     let { label, icon, nameIconPassEnable, nameIconPassDisable,
          setValue, control, errors, handleSubmit, nameController,
          valuePattern } = props
     return (

          <Controller
               rules={
                    {
                         required: "This field is required",
                         pattern: {
                              value: new RegExp(valuePattern),
                              message: 'Lỗi'
                         }
                    }
               }
               name={nameController}
               control={control}
               render={({ field: { name, onBlur, onChange, value } }) =>
                    <Input name={name} onBlur={onBlur}
                         onChange={onChange} value={value}
                         isShowPass={isShowPass}
                         handleSubmit={handleSubmit}
                         setIsInputting={setIsInputting}
                         errors={errors} {...props} />
               }
          >
          </Controller>
     )
}

const Input = (props) => {
     let { name, onChange, onBlur, value, label, isShowPass,
          nameIconPassDisable, nameIconPassEnable, handleSubmit, errors,
          isInputting, icon, setIsInputting, nameController, contentError} = props
     return (
          <View>

               <View style={{
                    paddingHorizontal: 12,
                    marginTop: 18,
                    flexDirection: 'row',
                    backgroundColor: isInputting ? "#fcf8fb2c" : "#03012c1e",
                    padding: 12,
                    marginHorizontal: 12,
                    borderRadius: 8,
                    justifyContent: 'space-between'
               }}>
                    <Icon name={icon} color={"white"} size={24} />
                    <>
                         <TextInput
                              onFocus={() => setIsInputting(true)}
                              onEndEditing={() => setIsInputting(false)}
                              placeholder={label}
                              placeholderTextColor={'#ffffff93'}
                              style={{
                                   marginHorizontal: 12,
                                   color: 'white',
                                   width: '100%',
                              }}
                              secureTextEntry={isShowPass}
                              onChangeText={(text) => {
                                   onChange(text)
                              }}
                              value={value}
                         />
                         <View style={{
                              position: 'absolute',
                              end: 12,
                              top: 0,
                              bottom: 0,
                              justifyContent: "center",
                              alignItems: "center",
                         }}>
                              <Icon name={
                                   isShowPass ? nameIconPassEnable : nameIconPassDisable
                              } color={"white"} size={24}
                              />

                         </View>
                    </>
               </View>
               <View style={{
                    width: '100%',
                    marginHorizontal: 12,
                    paddingVertical: 2,
                    paddingHorizontal: 12
               }}>
                    {errors[nameController] && <Text style={{
                         color: 'red',
                         fontWeight: 'bold'
                    }}>{contentError}</Text>}
               </View>
          </View>
     )
}

export default MyTextInput

const styles = StyleSheet.create({})