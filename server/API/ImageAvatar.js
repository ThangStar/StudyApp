const UploadAvatar = (app, upload) => {
     app.post('/upload', upload.single("image"), (req, res) => {
          res.send('uploadSuccess!')
     })
} 
module.exports.UploadAvatar = UploadAvatar