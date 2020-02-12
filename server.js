// default route
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
  }
  
  app.use(cors(corsOptions))

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
  
  
// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aa9909817814',
    database: 'attenc'
});
  
// connect to database
dbConn.connect(); 
 
 
// Retrieve all users 
app.get('/users', function (req, res) {
    dbConn.query('SELECT * FROM student', function (error, results) {
        if (error) throw error;
        return res.send( results);
    });
});
  
// Retrieve user with id 
app.get('/users/:id', function (req, res) {
  
    let user_id = req.params.id;
  
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
  
    dbConn.query('SELECT * FROM student where student_id=?', user_id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'users list.' });
    }); 
});
 
// Add a new user  
app.post('/student', function (req, res) {
  
    let user =JSON.parse( req.body.users);
    var f_name = user.firstName;
    var l_name  = user.lastName;
    var username = user.userName;
    var email = user.email;
    
  
    if (!user) {
        return res.status(400).send({ error:true, message: 'Please provide user' });
    }

    dbConn.query("INSERT INTO student (username,first_name,last_name,email) VALUES ( '"+username+"','"+f_name+"','"+l_name+"' , '"+email+"') ",
     function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Account has been created succesfully.'  });        
    });
});
 
//  Update user with id
app.put('/user', function (req, res) {
  
    let user_id = req.body.user_id;
    let user = req.body.user;
  
    if (!user_id || !user) {
        return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
    }
  
    dbConn.query("UPDATE users SET user = ? WHERE id = ?", [user, user_id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
    });
});

//  Delete user
app.delete('/user', function (req, res) {
  
    let user_id = req.body.user_id;
  
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
    });
}); 
 
// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
 
module.exports = app;