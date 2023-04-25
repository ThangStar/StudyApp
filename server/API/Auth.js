const GetLogin = (app, connection) => {
     app.get('/auth', (req, res) => {
          connection.query('SELECT * FROM user', function (error, results, fields) {
               if (error) throw error;
               res.send(JSON.stringify(results))
          });
     })
}

const AddUser = (app, connection) => {
     app.post('/post-user', async (req, res) => {
          if(req.body.userName != undefined && req.body.userName != undefined){
               connection.query(`SELECT * FROM user WHERE user_name = ${req.body.userName} AND pass = ${req.body.password}`,
               function (error, results, fields) {
                    if (error) throw error;
                    res.send(JSON.stringify(results))
               });
          }
          console.log("req: " + req.body.userName);
          res.send('ADD USER success!')
     })
}
module.exports.Auth = GetLogin
module.exports.AddUser = AddUser

