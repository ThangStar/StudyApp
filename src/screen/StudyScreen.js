import {
  Alert,
  BackHandler, Button, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text,
  TextInput,
  ToastAndroid, TouchableOpacity, View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import Color from '../value/Color'
import { Avatar, TextInput as TextInputMT, Box, Dialog, DialogActions, DialogContent, DialogHeader, IconButton, Provider, Stack } from '@react-native-material/core'
import Icon from 'react-native-vector-icons/Ionicons'
import AnimatedLottieView from 'lottie-react-native'
import StyleGloble from '../style/StyleGloble'
import Request from '../network/Request'
import Utils from '../utils/Utils'
import DAOTitleCourse from '../network/DAO/DAOTitleCourse'
import MyFabInsert from '../components/MyFabInsert'
import MyUpdateDialog from '../components/MyUpdateDialog'



const StudyScreen = ({ navigation }) => {

  const [titleCourse, setTitleCourse] = useState([])
  useEffect(() => {
    const GetTitleCourse = async () => {
      try {
        const dataTitle = await Request.get('/title-course')
        console.log(dataTitle.data);
        setTitleCourse(dataTitle.data)
      } catch (error) {
        console.log(error);
      }
    }
    GetTitleCourse()
  }, [])

  const [wordSearch, setWordSearch] = useState('')

  useEffect(() => {
    const GetTitleCourse = async () => {
      try {
        const dataTitle = await Request.post('/search-course', {
          data: wordSearch
        })
        setTitleCourse(dataTitle.data)
      } catch (error) {
        console.log(error);
      }
    }
    GetTitleCourse()
  }, [wordSearch])


  const DelItemCourse = (id) => {
    setTitleCourse(titleCourse.filter((item) => item.id != id))
  }
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false)
  const [currentIdUpate, setCurrentIdUpate] = useState(0)
  const [currentNameUpdate, setCurrentNameUpdate] = useState('')

  const [isShowFab, setIsShowFab] = useState(true)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style='light' />
      <LinearGradient
        colors={['#03012C', '#2A005E']}
        style={styles.linearGradian}>
        <ImageBackground
          resizeMode='cover'
          imageStyle={{ opacity: 0.08 }}
          style={{
            flex: 1,
            paddingHorizontal: 12,
            paddingTop: 16
          }}
          source={require('../res/img_onPrimary.png')}>
          <LogoAndProfile />
          <FlatList
            style={{ width: '100%' }}
            data={titleCourse}
            ListHeaderComponent={
              <>
                <View style={{
                  flexDirection: 'column',
                  alignItems: 'flex-end'
                }}>
                  <AnimatedLottieView style={{
                    width: '50%',
                    height: 160
                  }} source={
                    require('../res/68792-cute-astronaut-flying-in-space-animation.json')
                  }
                    autoPlay={true}
                    loop={true} />
                  <Box style={styles.box}>
                    <AnimatedLottieView
                      style={styles.lottie}
                      autoPlay={true}
                      loop={true}
                      source={
                        require('../res/98326-planet-and-stars.json')
                      } />
                    <View style={{ flexWrap: 'nowrap', flex: 1 }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 24,
                          fontWeight: 'bold',
                        }}
                      >Số lượng từ đã học
                      </Text>
                      <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <View style={{
                          marginTop: 14,
                          width: 90,
                          height: 90,
                          borderRadius: 45,
                          borderWidth: 3,
                          borderColor: Color.onSecondary,
                          backgroundColor: Color.onSuface,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                          <Text style={{
                            color: "#FACC15",
                            fontSize: 28,
                            fontWeight: 'bold'
                          }}>100</Text>
                        </View>

                      </View>
                    </View>
                  </Box>
                </View>
                <View style={{ alignItems: 'flex-start' }}>
                  <Text style={StyleGloble.textLeading2}>Dành cho bạn</Text>
                  <MySearch value={wordSearch} onChange={setWordSearch} />

                </View>


              </>
            }
            onScrollEndDrag={() => setIsShowFab(true)}
            onScrollBeginDrag={() => setIsShowFab(false)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <ItemCourse navigation={navigation} title={item.name_title}
                  setCurrentNameUpdate={setCurrentNameUpdate}
                  setCurrentIdUpate={setCurrentIdUpate}
                  visibleUpdate={visibleUpdate}
                  setVisibleUpdate={setVisibleUpdate}
                  key={item.id}
                  id={item.id} nameTitle={item.name_title} DelItemCourse={DelItemCourse} />
              )
            }}
          >
          </FlatList>
          {
            isShowFab ?
              <MyFabInsert setVisibleDialog={setVisibleDialog} />
              : null
          }
          <Provider>
            <MyDialog
              titleCourse={titleCourse}
              setTitleCourse={setTitleCourse}
              visible={visibleDialog}
              setVisible={setVisibleDialog} />

            <MyUpdateDialog id={currentIdUpate}
              currentNameUpdate={currentNameUpdate}
              setTitleCourse={setTitleCourse}
              setVisible={setVisibleUpdate}
              visible={visibleUpdate} />

          </Provider>

        </ImageBackground>
      </LinearGradient>
    </SafeAreaView >
  )
}

const MyDialog = (props) => {
  let { visible, setVisible, setTitleCourse, titleCourse } = props
  const [content, setContent] = useState('')
  return (
    <Dialog visible={visible} onDismiss={() => setVisible(false)}>
      <DialogHeader title="Thêm bài học" />
      <DialogContent>
        <Stack spacing={2}>
          <TextInputMT
            inputContainerStyle={{ marginTop: 8 }}
            label="Nhập tên"
            variant="standard"
            value={content}
            onChangeText={(text => setContent(text))}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          title="Cancel"
          compact
          variant="text"
          onPress={() => setVisible(false)}
        />
        <Button
          title="Ok"
          compact
          variant="text"
          onPress={async () => {
            setVisible(false)
            await DAOTitleCourse.InsertCourse(content)
            DAOTitleCourse.GetTitleCourse(setTitleCourse)
          }}
        />
      </DialogActions>
    </Dialog>
  )
}

const MySearch = (props) => {
  let { value, onChange } = props
  return (
    <View
      style={{
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: "#22c55e4b",
        borderColor: Color.onSecondary,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 4
      }}>
      <View style={{
        flex: 1
      }}>
        <TextInput style={{
          borderRadius: 16,
          color: Color.text
        }}
          value={value}
          onChangeText={text => onChange(text)}
          placeholder='Tìm kiếm..'
          placeholderTextColor={Color.text}
        />
      </View>
      <View>
        <Icon name='search' color={Color.text} size={24} />
      </View>

    </View>
  )
}

const ItemCourse = (props) => {
  let { navigation, nameTitle, title, id, DelItemCourse, setCurrentNameUpdate, setVisibleUpdate, visibleUpdate, setCurrentIdUpate } = props
  const [isExpand, setisExpand] = useState(false)
  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('QuizScreen', {
        id: id
      })
      console.log('id send: '+id);
    }}>

      <View style={{
        width: '100%',
        marginVertical: 16,
        height: 140,
        backgroundColor: '#33ff0021',
        borderRadius: 18,
        borderColor: Color.text,
      }}>
        <ImageBackground
          resizeMode='cover'
          imageStyle={{ opacity: 0.3, borderRadius: 18 }}
          source={require('../res/img_word_tech.png')}
          style={{
            flex: 1,
            width: '100%',
          }}>
          <View style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
          }}>
            <Text style={[StyleGloble.textLeading2, {
              fontWeight: 'normal', textAlign: 'justify', fontSize: 18,
              marginEnd: 36
            }]}>{nameTitle}</Text>
            <IconButton
              onPress={() => setisExpand(!isExpand)}
              style={{
                position: 'absolute',
                right: 0,
                top: 0
              }} icon={({ size }) => (
                <Icon name='ellipsis-vertical' color={Color.text} size={size} />
              )} />
            {
              isExpand ?
                <ListItemUtils
                  setCurrentNameUpdate={setCurrentNameUpdate}
                  title={title}
                  setCurrentIdUpate={setCurrentIdUpate}
                  visibleUpdate={visibleUpdate}
                  setVisibleUpdate={setVisibleUpdate}
                  id={id}
                  DelItemCourse={DelItemCourse} />
                : null
            }
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}


const ListItemUtils = (props) => {
  let { id, title, DelItemCourse, setCurrentNameUpdate, setVisibleUpdate, visibleUpdate, setCurrentIdUpate } = props
  return (
    <View style={{
      position: 'absolute',
      right: 40,
      top: 10,
      backgroundColor: Color.onPrimary,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      overflow: 'hidden'
    }}>
      <TouchableOpacity onPress={
        () =>
          Utils.MyAlert(`Xóa khóa học ${title}?`, "Bạn đã chắc chắn",
            DAOTitleCourse.DeleteCourse, id, DelItemCourse)

      }>

        <View style={{
          backgroundColor: 'blue',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 8,
          paddingHorizontal: 12,
          width: '100%',

        }}>
          <Text style={{
            color: Color.text
          }}>Xóa</Text>
        </View>

      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        setCurrentIdUpate(id)
        setVisibleUpdate(true)
        setCurrentNameUpdate(title)
      }}>

        <View style={{
          backgroundColor: 'blue',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 8,
          paddingHorizontal: 12,

          width: '100%',
        }}>
          <Text style={{
            color: Color.text
          }}>Sửa</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

function LogoAndProfile(props) {
  return (
    <View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        alignItems: 'center'
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
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
        <Profile />
      </View>
    </View>

  );
}

const Profile = () => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'baseline',
      position: 'relative'
    }}>
      <View style={{
        borderColor: Color.primary,
        borderWidth: 1,
        backgroundColor: '#ac58f53a',
        position: 'absolute',
        right: 20,
        bottom: -2,
        paddingRight: 24,
        paddingStart: 4,
        paddingVertical: 4,
        borderRadius: 16,
        margin: 1
      }}>
        <Text style={{ color: 'white', marginHorizontal: 8 }}>Nguyễn Văn A</Text>
      </View>
      <View style={styles.avatar}>
        <Image
          source={require('../res/avatar.jpg')}
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
          }}
        />
      </View>

    </View>
  )
}

export default StudyScreen

const styles = StyleSheet.create({
  linearGradian: {
    flex: 1,
  },
  avatar: {
    borderRadius: 50,
    borderWidth: 1,
    elevation: 10,
    shadowOpacity: 1,
    borderColor: Color.primary,
  },
  box: {
    height: 200,
    width: '100%',
    backgroundColor: '#ac58f544',
    borderRadius: 24,
    flexDirection: 'row',
    marginTop: -30,
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  lottie: {
    width: '50%',
  }
})