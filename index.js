const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("It Works!");
})

//Database connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jyothisri',
    database: 'node_app'
});
connection.connect(function (err) {
    if (err) throw err;
    console.log('Database Connected');
});

//Registration
app.post('/register', function (req, res) {
    let details = req.body;
    let fullName = details.fullname;
    let userName = details.username;
    let password = details.password;
    if (userName && password) {
        var sql = `insert into users (username,fullname,password) values ('${userName}','${fullName}','${password}')`;
        connection.query(sql, function (err, result) {
            if (err) {
                res.json({
                    'msg': 'Username already exists'
                });
            } else {
                console.log('Insertion successfully');
                res.json({
                    'msg': 'Registration successfully'
                });
            }
        });
    } else {
        res.json({
            'msg': 'Enter username and password'
        });
    }

});

//Login
app.post('/login', function (req, res) {
    let details = req.body;
    let userName = details.username;
    let password = details.password;
    if (userName && password) {
        var sql = 'select * from users where username = ? and password = ?';
        connection.query(sql, [userName, password], function (err, result) {
            if (result.length > 0) {
                res.json({
                    'msg': 'login successfully'
                });
            } else {
                res.json({
                    'msg': 'Incorrect username or password'
                })
            }
        });
    } else {
        res.json({
            'msg': 'Enter username and password'
        });
    }
})


//To get list of Products
app.get('/products', function (req, res) {

    var sql = 'select * from products';
    connection.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            res.json({
                'msg': 'Product catalog is empty'
            });
        } else {
            res.json(result);
        }

    });

})

app.listen(3000, function () {
    console.log('listening on port 3000');
})