import axios from "axios";
import { useState } from "react"
import { String } from "../../value/String";
import Request from "../Request";

const DAOWord = {
     GetWord: async (setState = useState(), id) => {
          try {
               const dataWord = await Request.post('/getWordById', {
                    id: id
               })
               console.log(dataWord.data);
               setState(dataWord.data)
          } catch (error) {
               console.log(error);
          }
     },
     InsertWord: async (idTitleCourse = new Number, data = {}) => {
          try {
               const res = await Request.post('/insert-word', {
                    id_title_course: idTitleCourse,
                    name: data.name,
                    answer: data.answer,
                    pronunciation: data.pronunciation
               })
               return res.data
          } catch (error) {
               console.log(error);
               return String.ANY_ERROR
          }
     },
     DeleteWord: async (id = Number(), idCourse = Number()) => {
          console.log('id is: ', id);
          const res = await Request.post('/delete-word', {
               id_title_course: idCourse,
               id: id
          })
          console.log('response: ' + res.data);
          return res.data
     },
     UpdateWord: async (idTitleCourse = Number(), id = Number(), data = {}) => {
          console.log('id is: ', id);
          const res = await Request.post('/update-word', {
               id_title_course: idTitleCourse,
               id: id,
               data: data
          })
          console.log('response: ' + res.data);
          return res.data
     }
}
export default DAOWord