function CheckLogin(app, connection, crypto = require('crypto')) {
     app.post('/login', async (res, req) => {
          console.log("im in");
          console.log("req: " + res.body.username);
          console.log("res: " + res.body.password);
          const passEncode = crypto.createHash('sha256').update(res.body.password).digest('hex')
          console.log("PASS ENCODE: "+passEncode);
          connection.query(`SELECT * FROM user WHERE username = '${res.body.username}' AND password = '${passEncode}'`, function (error, results, fields) {
               if (error) throw error;
               req.send(results)
          });
     })
}
module.exports.CheckLogin = CheckLogin