function Register(app, connection, crypto = require('crypto')) {
     app.post('/register', async (res, req) => {
          console.log("im in");
          console.log("req: " + res.body.email);
          console.log("req: " + res.body.username);
          console.log("res: " + res.body.password);
          const passEncode = crypto.createHash('sha256').update(res.body.password).digest('hex')
          connection.query(`INSERT INTO user(username, password, full_name, email) VALUES ('${res.body.username}', '${passEncode}', '${res.body.fullname}', '${res.body.email}')`, function (error, results, fields) {
               if (error) throw error;
               req.send("đăng kí thành công!")
          });
     })
}
module.exports.Register = Register