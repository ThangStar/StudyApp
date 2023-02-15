import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@react-native-material/core';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, LogBox, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';
import LINK from '../network/Link';
import QuizEnglish from '../network/QuizEnglish';
import { String } from '../value/String';

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      console.log(value);
    }
  } catch (e) {
    console.log(String.SAVE_DATA_ERROR);
  }
}

const storageData = async (value) => {
  try {
    console.log(String.SAVE_DATA_SUCCESS);
    await AsyncStorage.setItem('data1', value)
  } catch (e) {
    console.log('ERROR');
  }
}

var dataWord = []

const GetDataScreen = () => {
  var objWord = {
    name: '1fw',
    heght: 1
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="GET DATA"
        style={{ height: 100, marginTop: 100 }}
        onPress={() => {
          getData("data1")
        }}>

      </Button>
      <Button
        style={{height: 100}}
        title="SAVE DATA"
        onPress={() => {
          storageData("Thang dep trai")
        }}>

      </Button>
      <WebView
        containerStyle={{ width: '100%', flex: 1 }}
        javaScriptEnabled={true}
        injectedJavaScript={String.JS_CODE_CRAW_DATA}
        source={{ uri: LINK.langmaster }}
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data)
          dataWord = data
          console.log('data is: ', data);
          console.log('dataWord is: ', dataWord);
          {
            try {
              dataWord.map((x) => {
                console.log(x);
              })
            } catch { }
          }
        }}
      />

      <Button
        title='SHOW ARRAY'
        onPress={() => {
          // word.map((it) => {
          console.log('hello');
          // })
        }}>

      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
});

export default GetDataScreen