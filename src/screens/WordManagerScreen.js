import { BackHandler, Button, FlatList, Image, ImageBackground, LayoutAnimation, Platform, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, UIManager, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import Color from '../value/Color'
import StyleGloble from '../style/StyleGloble'
import MyToolbar from '../components/MyToolbar'
import DAOWord from '../network/DAO/DAOWord'
import { IconButton, Pressable, TextInput } from '@react-native-material/core'
import Icon from 'react-native-vector-icons/Ionicons'
import { Dialog, Menu, Paragraph, Portal, Provider } from 'react-native-paper'

if (
     Platform.OS === 'android' &&
     UIManager.setLayoutAnimationEnabledExperimental
) {
     UIManager.setLayoutAnimationEnabledExperimental(true);
}

const WordManagerScreen = ({ navigation, route }) => {

     //dialog add
     const [isOpenDialog, setIsOpenDialog] = useState(false)

     //dialog delete
     const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false)

     //dialog update
     const [isOpenDialogUpdate, setIsOpenDialogUpdate] = useState(false)
     const [currentidUpdate, setCurrentidUpdate] = useState()


     let { value } = route.params
     const [word, setWord] = useState([])
     useEffect(() => {
          DAOWord.GetWord(setWord, value.id)
     }, [])
     const [nameInputDialog, setNameInputDialog] = useState('')
     const [pronunciationInputDialog, setPronunciationInputDialog] = useState('')
     const [answerInputDialog, setAnswerInputDialog] = useState('')
     const [isShowCheck, setIsShowCheck] = useState(false)
     //arr id checked
     const [arrChecked, setArrChecked] = useState([])

     return (
          <SafeAreaView style={{ flex: 1 }}>
               <Provider>
                    <StatusBar style='light' />
                    <LinearGradient
                         colors={['#03012C', '#2A005E']}
                         style={styles.linearGradian}>

                         <MyToolbar
                              handleBack={() => {
                                   navigation.goBack()
                              }}
                              title={value.name_title} />
                         <View style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between'
                         }}>
                              <IconButton
                                   onPress={() => {
                                        setIsShowCheck(!isShowCheck)
                                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                   }}
                                   icon={({ size }) => (
                                        <Icon name={!isShowCheck ? 'checkmark-done-outline' : "close"} size={size} color={Color.text} />
                                   )}
                              />
                              {
                                   isShowCheck ?
                                        <IconButton
                                             onPress={() => {

                                                  setIsOpenDialogDelete(true)
                                             }}
                                             icon={({ size }) => (
                                                  <Icon name='trash-outline' size={size} color={Color.text} />
                                             )}
                                        /> : null
                              }
                         <MyFABAdd setIsOpenDialog={setIsOpenDialog} isOpenDialog={isOpenDialog} />
                         </View>
                         <FlatList
                              style={{
                                   marginTop: 20
                              }}
                              data={word}
                              renderItem={({ item, index }) => (
                                   <ItemCourse
                                        setCurrentidUpdate={setCurrentidUpdate}
                                        setIsOpenDialogUpdate={setIsOpenDialogUpdate}
                                        arrChecked={arrChecked}
                                        setArrChecked={setArrChecked}
                                        isShowCheck={isShowCheck}
                                        value={item}
                                        index={index} />
                              )}
                         />

                    </LinearGradient>
                    {/* dialog add */}
                    <Dialog
                         style={{
                              backgroundColor: Color.text
                         }}
                         visible={isOpenDialog}
                         onDismiss={() => setIsOpenDialog(false)}>
                         <Dialog.Title>Thêm từ</Dialog.Title>
                         <Dialog.Content>
                              <Paragraph>{value.name_title}</Paragraph>
                              <MyTextInputDialog
                                   label='Từ vựng'
                                   valueInputDialog={nameInputDialog}
                                   setValueInputDialog={setNameInputDialog} />
                              <MyTextInputDialog
                                   label='Phát âm'
                                   valueInputDialog={pronunciationInputDialog}
                                   setValueInputDialog={setPronunciationInputDialog} />
                              <MyTextInputDialog
                                   label='Nghĩa'
                                   valueInputDialog={answerInputDialog}
                                   setValueInputDialog={setAnswerInputDialog} />
                         </Dialog.Content>
                         <Dialog.Actions>
                              <Button title='Hủy' onPress={() => {
                                   setIsOpenDialog(false)

                              }}></Button>
                              <Button title='OK' onPress={
                                   async () => {
                                        const res = await DAOWord.InsertWord(value.id, {
                                             name: nameInputDialog,
                                             answer: answerInputDialog,
                                             pronunciation: pronunciationInputDialog
                                        })
                                        if (res.length > 0) {
                                             setWord(res)
                                        }
                                        setIsOpenDialog(false)
                                   }}>
                              </Button>
                         </Dialog.Actions>
                    </Dialog>

                    {/* dialog delete */}
                    <Dialog
                         style={{
                              backgroundColor: Color.text
                         }}
                         visible={isOpenDialogDelete}
                         onDismiss={() => setIsOpenDialogDelete(false)}>
                         <Dialog.Title>Xóa?</Dialog.Title>
                         <Dialog.Content>
                              <Paragraph>Xóa toàn bộ từ đã chọn</Paragraph>
                         </Dialog.Content>
                         <Dialog.Actions>
                              <Button title='Hủy' onPress={() => {
                                   setIsOpenDialogDelete(false)

                              }}></Button>
                              <Button title='OK' onPress={
                                   async () => {
                                        // delete in database by arrCheck (array id checked)
                                        arrChecked.forEach(async item => {
                                             console.log("DELETE at id: " + value);
                                             const res = await DAOWord.DeleteWord(item, value.id)
                                             setWord(res)
                                        })
                                        setIsOpenDialogDelete(false)
                                   }}>
                              </Button>
                         </Dialog.Actions>
                    </Dialog>

                    {/* dialog update */}
                    <Dialog
                         style={{
                              backgroundColor: Color.text
                         }}
                         visible={isOpenDialogUpdate}
                         onDismiss={() => setIsOpenDialogUpdate(false)}>
                         <Dialog.Title>Sửa?</Dialog.Title>
                         <Dialog.Content>
                              <Paragraph>Sửa từ đã chọn</Paragraph>
                              <MyTextInputDialog
                                   label='Từ vựng'
                                   valueInputDialog={nameInputDialog}
                                   setValueInputDialog={setNameInputDialog} />
                              <MyTextInputDialog
                                   label='Phát âm'
                                   valueInputDialog={pronunciationInputDialog}
                                   setValueInputDialog={setPronunciationInputDialog} />
                              <MyTextInputDialog
                                   label='Nghĩa'
                                   valueInputDialog={answerInputDialog}
                                   setValueInputDialog={setAnswerInputDialog} />
                         </Dialog.Content>
                         <Dialog.Actions>
                              <Button title='Hủy' onPress={() => {
                                   setIsOpenDialogUpdate(false)
                              }}></Button>
                              <Button title='OK' onPress={
                                   async () => {
                                        const res = await DAOWord.UpdateWord(value.id, currentidUpdate, {
                                             name: nameInputDialog,
                                             answer: answerInputDialog,
                                             pronunciation: pronunciationInputDialog
                                        })
                                        setWord(res)
                                        setIsOpenDialogUpdate(false)
                                   }}>
                              </Button>
                         </Dialog.Actions>
                    </Dialog>

               </Provider>
          </SafeAreaView >
     )
}

const MyTextInputDialog = (props) => {
     let { label = '', valueInputDialog, setValueInputDialog } = props
     return (
          <TextInput
               label={label}
               onChangeText={text => setValueInputDialog(text)}
               value={valueInputDialog} />
     )
}
const MyFABAdd = (props) => {
     let { setIsOpenDialog, isOpenDialog } = props
     return (
          <View>
               <IconButton
                    onPress={() => setIsOpenDialog(true)}
                    style={{
                         justifyContent: 'center',
                         alignItems: 'center',
                    }}
                    icon={({ size, color }) => (
                         <Icon name='add' size={size} color={Color.text} />
                    )} />
          </View >
     )
}

const ItemCourse = (props) => {
     let { value, index, isShowCheck, setArrChecked, arrChecked, setIsOpenDialogUpdate, setCurrentidUpdate } = props
     const [isShowMenuPopup, setIsShowMenuPopup] = useState(false)
     const [isCheck, setIsCheck] = useState(false)
     return (
          <View style={{
               flexDirection: 'row',
          }}>
               {
                    isShowCheck ? <TouchableOpacity style={{
                         borderColor: Color.onSecondary,
                         borderWidth: 1,
                         width: '15%',
                         backgroundColor: "#22c55e48",
                         justifyContent: 'center',
                         alignItems: 'center'
                    }}>
                         <IconButton
                              onPress={() => {
                                   setIsCheck(!isCheck)
                                   !isCheck ? setArrChecked([...arrChecked, value.id])
                                        :
                                        setArrChecked(prevData => prevData.filter(item => item != value.id))
                                   console.log(arrChecked);
                              }}
                              icon={({ size }) => (
                                   <Icon size={size} color={Color.text}
                                        name={isCheck ? 'checkmark-outline' : null} />
                              )}
                         />
                    </TouchableOpacity> : null
               }
               <TouchableOpacity
                    onLongPress={
                         () => setIsShowMenuPopup(!isShowMenuPopup)
                    }
                    style={{
                         flexDirection: 'row',
                         paddingVertical: 12,
                         justifyContent: 'space-between',
                         flexWrap: 'wrap',
                         borderWidth: 1,
                         borderColor: 'white',
                         width: isShowCheck ? '85%' : '100%',

                    }}>

                    <Text style={[StyleGloble.textTralling, { marginHorizontal: 24, fontWeight: 'bold', color: Color.item2, textAlign: 'left' }]}>{value.name}</Text>
                    <Text style={[StyleGloble.textTralling, { marginHorizontal: 24, fontWeight: 'bold', color: Color.text, textAlign: 'left' }]}>{value.pronunciation}</Text>
                    <Text style={[StyleGloble.textTralling, { marginHorizontal: 24, fontWeight: 'bold', color: Color.item3, textAlign: 'left' }]}>{value.answer}</Text>

               </TouchableOpacity >
               {
                    isShowMenuPopup ?
                         <View style={{
                              position: 'absolute',
                              right: 0,
                              zIndex: 1
                         }
                         } >
                              <PopupMenuItem setCurrentidUpdate={setCurrentidUpdate} value={value} setIsOpenDialogUpdate={setIsOpenDialogUpdate} title="Sửa" />

                         </View >
                         : null
               }
          </View >
     )
}

const PopupMenuItem = (props) => {
     let { title, setIsOpenDialogUpdate, value, setCurrentidUpdate } = props
     return (
          <TouchableOpacity
               onPress={() => {
                    setIsOpenDialogUpdate(true)
                    setCurrentidUpdate(value.id)
               }}
               style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    backgroundColor: Color.text,
               }}>
               <Text>{title}</Text>
          </TouchableOpacity>
     )
}
export default WordManagerScreen

const styles = StyleSheet.create({
     linearGradian: {
          flex: 1,
          paddingHorizontal: 12,
          paddingVertical: 20,
     },
     imageItem: {
          width: 80,
          height: 80
     }
})