import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

const onSubmit = data => {
     console.log(data.firstName);
}

const Test = () => {
     const { control, handleSubmit, formState: { errors } } = useForm({
          firstName: 'thang1'
     })

     return (
          <View style={{flex: 1, justifyContent: 'center'}}>
               <Controller
                    name='firstName'
                    control={control}
                    rules={{
                         required: true
                    }}
                    render={({field: {name, onBlur, onChange,value}}) => (
                         <TextInput style={{
                              borderWidth: 1
                         }}
                         onBlur = {onBlur}
                         onChangeText = {onChange}
                         value = {value}/>
                    )}
               >
               </Controller>
               {errors.firstName && <Text>ERROR</Text>}
               <Button title='SUBMIT' onPress={handleSubmit(onSubmit)}/>
          </View>
     )
}

export default Test

const styles = StyleSheet.create({})