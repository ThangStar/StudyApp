export const String = {
     SAVE_DATA_SUCCESS: "SAVE DATA SUCCESS!",
     SAVE_DATA_ERROR: "SAVE DATA ERROR!",
     JS_CODE_CRAW_DATA: `
     var dataWord = [];
     for (let i = 36; i < 148; i++) {
     try {
     var objWord = { title: "", answer: "", read: "" }
     objWord.title = document.querySelector('#main-content > p:nth-child('+i+')').children[0].innerHTML; 
     const readAndAnswer = document.querySelector('#main-content > p:nth-child('+i+')').children[1].innerHTML.split(":"); 
     objWord.answer = readAndAnswer.pop();
     objWord.read = readAndAnswer.join(":");
     dataWord.push(objWord)
     } catch { }
     }; console.log(dataWord) ;
     var arr = [1,2]
     window.ReactNativeWebView.postMessage(JSON.stringify(dataWord))
     `,
     ANY_ERROR: 'Đã xảy ra lỗi!',

     DEL_SUCCESS: 'Đã xóa!',
     DEL_FAILE: 'Xóa thất bại!',

     UPDATE_SUCCESS: 'Cập nhật thành công!',
     UPDATE_FAILE: 'Cập nhật thất bại!',

     ADD_SUCCESS: 'Thêm khóa học thành công!',
     ADD_FAILE: 'Thêm khóa học thất bại!',


}
export const ContentWellcome = {
     TITLE1: "Cải thiện kĩ năng đọc hiểu",
     CONTENT1: "trả lời trắc nghiệm trong quiz",
     
     TITLE2: 'Luyện nghe qua video',
     CONTENT2: 'Phim, bài hát',

     TITLE3: 'Khám phá ngay thôi nào!',
     CONTENT3: '',
}