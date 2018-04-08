const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcryptjs = require('bcryptjs');

let pool = mysql.createPool({
    user: 'root'
});

let app = new express();
app.use(bodyParser.json());

app.post('/signUp', (req, res) => {
    let user = req.body.user;
    let sql = `SELECT * 
                FROM db.user 
                WHERE email = ?`;
    pool.query(sql, [user.email], (err, results) => {
        if (err) throw err;
        if (results.length === 1) {
            // 邮箱存在
            res.send({"status": "exist"});
        }

        sql = `INSERT INTO 
                db.user(email, password) 
                VALUE(?, ?)`;
        let encryptedPassword = bcryptjs.hashSync(user.password,
            bcryptjs.genSaltSync(10));
        pool.query(sql, [user.email, encryptedPassword], (err, results) => {
            if (err) throw err;
            if (results.affectedRows === 1) {
                res.send({"status": "ok","id":results.insertId});
            } else {
                res.send({"status": "err"});
            }
        });
    });
});

app.post('/signIn', (req, res) => {
    let user = req.body.user;
    let sql = `SELECT * 
                FROM db.user 
                WHERE email = ?`;

    pool.query(sql, [user.email], (err, results) => {
        if (err) throw err;
        if (results.length === 1) {
            let encryptedPassword = results[0].password;
            if (bcryptjs.compareSync(user.password, encryptedPassword)) {
                res.send({
                    "status": "ok",
                    "user": results[0]
                });
            }
        }
        res.send({"status": "err"});
    });
});

app.post('/saveUserInfo', (req, res) => {
    let user = req.body.user;
    let sql = `SELECT *
                FROM db.user
                WHERE username = ?
                OR nick = ?`;
    pool.query(sql, [user.username, user.nick], (err, results) => {
        if (err) throw err;
        if (results.length === 2) {
            res.send({"status": "usernameAndNickExist"});
        } else if (results.length === 1) {
            let username = results[0].username;
            let nick = results[0].nick;
            if (username === user.username && nick === user.nick) {
                // username 和 nick 都被占用了
                res.send({"status": "usernameAndNickExist"});
            } else if (username === user.username) {
                // username 被占用了
                res.send({"status": "usernameExist"});
            } else {
                // nick 被占用了
                res.send({"status": "nickExist"});
            }
        }

        // username 和 nick 都可以使用
        sql = `UPDATE db.user
                SET 
                username = ?,
                nick = ?,
                gender = ?,
                dob = ?
              WHERE id = ?`;

        pool.query(sql, [
            user.username,
            user.nick,
            user.gender,
            user.dob,
            user.id], (err, results) => {
            if (err) throw err;
            if (results.affectedRows === 1) {
                res.send({"status": "ok"});
            } else {
                res.send({"status": "err"});
            }
        });
    });
});

app.get('/products/:page',(req,res)=>{//:page占位符,可自定义
    let page=req.params.page;//请求路径的参数设置
    const pageSize=20;
    let sql=`SELECT * FROM db.product LIMIT ${pageSize} OFFSET ? `;
    pool.query(sql,[pageSize*(page-1)],(err,results)=>{
        if(err) throw err;
        res.send(results);
    })
})
app.listen(3000);