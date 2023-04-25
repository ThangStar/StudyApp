function GetWord(app, connection) {
     app.post('/getWordById', (res, req) => {
          console.log('res is: ', res.body);
          connection.query(`SELECT * FROM WORD WHERE id_title_course = ${res.body.id}`, function (error, results, fields) {
               if (error) throw error;
               console.log('WORD is: ', results);
               req.send(JSON.stringify(results))
          });
     })
}

function GetTitleCourse(app, connection) {
     app.get('/title-course', (req, res) => {
          connection.query('SELECT * FROM title_course', function (error, results, fields) {
               if (error) throw error;
               console.log('TITLE CORSE is: ', results);
               res.send(JSON.stringify(results))
          });
     })
}

function SearchTitleCourse(app, connection) {
     app.post('/search-course', async (res, req) => {
          console.log('res is: ', res.body.data);

          connection.query(`SELECT * FROM title_course WHERE name_title LIKE '%${res.body.data}%'`, function (error, results, fields) {
               if (error) throw error;
               console.log('TITLE CORSE is: ', results);
               req.send(JSON.stringify(results))
          });
     })
}

function DeleteCourse(app, connection) {
     app.post('/delete-course', async (res, req) => {
          console.log('res is: ', res.body.id);
          connection.query(`DELETE FROM title_course WHERE id = ${res.body.id}`, function (error, results, fields) {
               if (error) throw error;
               console.log('results is: ', results);
               console.log('error is: ', error);
               console.log('fields is: ', fields);
               if (error == null) {
                    req.send("Đã xóa id ")
               }
          });
     })
}

function InsertCourse(app, connection, upload) {
     app.post('/insert-course', upload.single("image"), async (req, res) => {
          if (!req.file) {
               console.log("No file upload");
          } else {
               console.log('name file is: ', req?.file.filename);
               console.log("title add is: " + req?.body.title)
               connection.query(`INSERT INTO title_course(name_title, url_image) VALUES ('${req?.body.title}', '/images/${req?.file.filename}')`, function (error, results, fields) {
                    if (error) throw error;
                    console.log('error is: ', error);
                    if (error == null) {
                         res.send("Đã thêm! ")
                    }
               });
          }
     })
}

function InsertWord(app, connection) {
     app.post('/insert-word', async (res, req) => {
          console.log('res is: ', res.body.id_title_course);
          console.log('name is: ', res.body.name);
          console.log('answer is: ', res.body.answer);
          console.log('pronunciation is: ', res.body.pronunciation);
          let { id_title_course, name, answer, pronunciation } = res.body

          const query = `INSERT INTO word(id_title_course, name, answer, pronunciation) VALUES (${id_title_course}, '${name}', '${answer}', '${pronunciation}')`
          connection.query(query, function (error, results, fields) {
               if (error) {
                    req.send("Đã xảy ra lỗi!")
                    // throw error;
               }
               console.log('error is: ', error);
               if (error == null) {
                    connection.query(`SELECT * FROM WORD WHERE id_title_course = ${id_title_course}`, function (error, results, fields) {
                         if (error) throw error;
                         console.log('WORD is: ', req.statusCode);

                         req.send(JSON.stringify(results))
                    });
               }
          });
     })
}

function UpdateCourse(app, connection) {
     app.post('/update-course', async (res, req) => {
          console.log('res is: ', res.body.id);
          console.log('res is: ', res.body.titleCourse);
          connection.query(`UPDATE title_course SET name_title='${res.body.titleCourse}' WHERE id = ${res.body.id}`, function (error, results, fields) {
               if (error) throw error;
               console.log('error is: ', error);
               if (error == null) {
                    req.send("Đã cập nhật! ")
               }
          });
     })
}
function DeleteWord(app, connection) {
     app.post('/delete-word', async (res, req) => {
          let { id_title_course, id } = res.body
          connection.query(`DELETE FROM word WHERE id = ${id}`, function (error, results, fields) {
               if (error) throw error;
               console.log('error is: ', error);

               if (error == null) {
                    connection.query(`SELECT * FROM WORD WHERE id_title_course = ${id_title_course}`, function (error, results, fields) {
                         if (error) throw error;
                         req.send(JSON.stringify(results))
                    });

               }
          });
     })
}

function UpdateWord(app, connection) {
     app.post('/update-word', async (res, req) => {
          let { id, data, id_title_course} = res.body
          connection.query(`UPDATE word SET name = '${data.name}', answer = '${data.answer}', pronunciation = '${data.pronunciation}' WHERE id = ${id}`, function (error, results, fields) {
               if (error) throw error;
               if (error == null) {
                    connection.query(`SELECT * FROM WORD WHERE id_title_course = ${id_title_course}`, function (error, results, fields) {
                         if (error) throw error;
                         req.send(JSON.stringify(results))
                    });

               }
          });
     })
}
module.exports.getWord = GetWord
module.exports.GetTitleCourse = GetTitleCourse
module.exports.SearchTitleCourse = SearchTitleCourse
module.exports.DeleteCourse = DeleteCourse
module.exports.InsertCourse = InsertCourse
module.exports.UpdateCourse = UpdateCourse
module.exports.InsertWord = InsertWord
module.exports.DeleteWord = DeleteWord
module.exports.UpdateWord = UpdateWord





