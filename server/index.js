const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
const multer = require('multer')
const path = require('path')
const Word = require('./API/Word')
const Login = require('./API/Login')
const ImageAvatar = require('./API/ImageAvatar')
const Auth = require('./API/Auth')
const Register = require('./API/Register')
const crypto= require('crypto')


app.use(express.json())

const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, 'images')
     },
     filename: (req, file, cb) => {
          const nameFile = Date.now() + path.extname(file.originalname)
          cb(null, nameFile)
     }
})
const upload = multer({ storage: storage })

app.use(morgan('combined'))
app.set('view engine', 'ejs')
var mysql = require('mysql');
var connection = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'db_course'
});
connection.connect();
Word.getWord(app, connection)

//title word
Word.GetTitleCourse(app, connection)
Word.SearchTitleCourse(app, connection)
Word.DeleteCourse(app, connection)
Word.InsertCourse(app, connection, upload)
Word.UpdateCourse(app, connection)
Word.InsertWord(app, connection)
Word.DeleteWord(app, connection)
Word.UpdateWord(app, connection)


// ImageAvatar.UploadAvatar(app, upload)

Login.CheckLogin(app, connection, crypto)
Register.Register(app, connection, crypto)

Auth.Auth(app, connection)
Auth.AddUser(app, connection)

//public image
app.use(express.static('public'));
app.use('/images', express.static('images'));

//lister port
app.listen(port, () => {
     console.log(`Example app listening on port ${port}`)
})