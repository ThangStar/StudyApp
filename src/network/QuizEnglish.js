import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LINK from './Link';

const QuizEnglish = (props) => {
     return fetch(LINK.tienganhnghenoi)
          .then(response => {
               console.log('RESPONSE base', response);
               console.log('RESPONSE text', response.text());
          
          })
          .catch(error => {
               console.error(error);
          });

};


export default QuizEnglish
