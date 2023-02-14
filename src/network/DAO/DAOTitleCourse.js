import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React from 'react'
import Request from '../Request';
import { String } from '../../value/String';

const DAOTitleCourse = {
     DeleteCourse: async (id) => {
          console.log('ddax xoa');
          try {
               console.log('loadAgain');
               const res = await Request.post('/delete-course', {
                    id: id
               })
               if(res.status == 200){
                    ToastAndroid.showWithGravity(
                         String.DEL_SUCCESS,
                         ToastAndroid.SHORT,
                         ToastAndroid.CENTER
                    );
               }else {
                    ToastAndroid.showWithGravity(
                         String.DEL_FAILE,
                         ToastAndroid.SHORT,
                         ToastAndroid.CENTER
                    );
               }
          } catch (error) {
               console.log(error);
               ToastAndroid.showWithGravity(
                    String.ANY_ERROR,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
               );
          }
     },

     InsertCourse: async (nameTitle) => {
          try {
               console.log('loadAgain');
               const data = await Request.post('/insert-course', {
                    nameTitle: nameTitle
               })
               console.log(data.data);
               if (data.status == 200) {
                    ToastAndroid.showWithGravity(
                         String.ADD_SUCCESS,
                         ToastAndroid.SHORT,
                         ToastAndroid.CENTER
                    );
               }else {
                    ToastAndroid.showWithGravity(
                         String.ADD_FAILE,
                         ToastAndroid.SHORT,
                         ToastAndroid.CENTER
                    );
               }
          } catch (error) {
               console.log(error);
               ToastAndroid.showWithGravity(
                    String.ANY_ERROR,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
               );
          }
     },
     GetTitleCourse: async (setTitleCourse) => {
          try {
               const dataTitle = await Request.get('/title-course')
               console.log(dataTitle.data);
               setTitleCourse(dataTitle.data)
          } catch (error) {
               console.log(error);
          }
     },
     UpdateTitleCourse: async (id, titleCourse) => {
          try {
               const res = await Request.post('/update-course', {
                    id: id,
                    titleCourse: titleCourse
               })
               console.log(res.status);
               if (res.status == 200) {
                    ToastAndroid.showWithGravity(
                         String.UPDATE_SUCCESS,
                         ToastAndroid.SHORT,
                         ToastAndroid.CENTER
                    );
               }else {
                    ToastAndroid.showWithGravity(
                         String.UPDATE_FAILE,
                         ToastAndroid.SHORT,
                         ToastAndroid.CENTER
                    );
               }

          } catch (error) {
               console.log(error);
               ToastAndroid.showWithGravity(
                    String.ANY_ERROR,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
               );
          }
     }
}

export default DAOTitleCourse

const styles = StyleSheet.create({})