import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, TextInput as TextInputMT, Stack, DialogActions, Button } from '@react-native-material/core'
import DAOTitleCourse from '../network/DAO/DAOTitleCourse'

const MyUpdateDialog = (props) => {
     let { setVisible, visible, value, currentNameUpdate, id, setTitleCourse } = props
     const [content, setContent] = useState(currentNameUpdate)
     return (
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
               <DialogHeader title="Sửa" />
               <DialogContent>
                    <Stack spacing={2}>
                         <TextInputMT
                              inputContainerStyle={{ marginTop: 8 }}
                              label="Tên bài học"
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
                              await DAOTitleCourse.UpdateTitleCourse(id, content)
                              console.log('id: ' + id + "content: " + content);
                              DAOTitleCourse.GetTitleCourse(setTitleCourse)
                              
                         }}
                    />
               </DialogActions>
          </Dialog>
     )
}

export default MyUpdateDialog

const styles = StyleSheet.create({})