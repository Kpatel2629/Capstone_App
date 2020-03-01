
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
/* app.get('/students/:userName', function (req, res) {
  
    let UserName = req.params.userName;
    
    if (!UserName) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
  
    dbConn.query('SELECT * FROM student where username=?', UserName, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'users list.' });
    }); 
}); */

//Get the all classes assigned to specific Instructor
app.get('/getClasses/:instructorid', function(req,res){
    
    var instructorid = req.params.instructorid;
    
    if (!instructorid) {
        return res.status(400).send({ error: true, message: 'Please provide Instructor_id' });
    }
    
    dbConn.query('SELECT * FROM class where instructor_id=?', instructorid,function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    }); 
});

//check if userName and password exist for login purpose
app.post('/Checkstudent', function (req, res) {
  
    let user = JSON.parse(req.body.userObject);
    var username = user.userName;
    var password = user.password;
    
  
    if (!user) {
        return res.status(400).send({ error:true, message: 'Please provide user' });
    }
    var sql = 'SELECT * FROM student WHERE username = ? AND password = ?';
    dbConn.query(sql,[username,password],
     function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Account exists.'});        
    });
});


// for the Instructors
app.post('/Checkinstructor', function (req, res) {
  
    let user = JSON.parse(req.body.userObject);
    var username = user.userName;
    var password = user.password;
    
  
    if (!user) {
        return res.status(400).send({ error:true, message: 'Please provide user' });
    }
    
    var sql = 'SELECT * FROM instructor WHERE username = ? AND password = ?';
    dbConn.query(sql,[username,password],
     function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Account exists.'});        
    });
});
 

 
// Add a new user  
app.post('/student', function (req, res) {
  
    let user =JSON.parse( req.body.users);
    var f_name = user.firstName;
    var l_name  = user.lastName;
    var username = user.userName;
    var email = user.email;
    var password = user.password;
    
  
    if (!user) {
        return res.status(400).send({ error:true, message: 'Please provide user' });
    }

    dbConn.query("INSERT INTO student (username,first_name,last_name,email,password) VALUES ( '"+username+"','"+f_name+"','"+l_name+"' , '"+email+"','"+password+"') ",
     function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Account has been created succesfully.'  });        
    });
});

//To add a new class 
app.post('/class', function (req, res) {
  
    let classes = req.body.classes;
    var className = classes.className;
    var instructor = classes.Instructor;
    
    if (!classes) {
        return res.status(400).send({ error:true, message: 'Please provide user' });
    }

    dbConn.query("INSERT INTO class (class_name,instructor_id) VALUES ( '"+className+"','"+instructor+"') ",
     function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: ' A Class has been added.'  });        
    });
});


//To delete class 
app.delete('/class/:className', function (req, res) {
  
    var className = req.params.className;
    
    if (!className) {
        return res.status(400).send({ error:true, message: 'Please provide class' });
    }

    dbConn.query("DELETE FROM  class WHERE class_name = ? ", [className],
     function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: ' A Class has been deleted.'  });        
    });
});

//to add student to class
app.post('/addStudentToclass', function (req, res) {
  
    let studentObj = req.body.studentObj;
    var studentEmail = studentObj.studentEmail;
    var className = studentObj.className
    var sData;
    if (!studentObj) {
        return res.status(400).send({ error:true, message: 'Please provide class' });
    }


     dbConn.query("SELECT * FROM enrolled_student WHERE student_id = (select student_id from student where email = '"+studentEmail+"') AND class_id = (select class_id from class where class_name = '"+className+"')",
      function (error, results, fields) {
        
         if (error) throw error;
         else{

            if(results.length == 0){

                dbConn.query("INSERT INTO enrolled_student (student_id,class_id,attendence) VALUES ((select student_id from student where email = '"+studentEmail+"') , (select class_id from class where class_name = '"+className+"') , '2')",
                function(error,results,fields){
                
                    if(error) throw error;
                    return res.send({error:false , data:results , message : 'student has been added to class' });
                });
            }
            else{
                return res.send({ error: false,data: results, message: 'a user already exists'  });  
            }
         }
           
     }); 

});


//Add a New Instructor to database
app.post('/instructor', function (req, res) {
  
    let user =JSON.parse( req.body.users);
    var f_name = user.firstName;
    var l_name  = user.lastName;
    var username = user.userName;
    var email = user.email;
    var password = user.password;
    
  
    if (!user) {
        return res.status(400).send({ error:true, message: 'Please provide user' });
    }

    dbConn.query("INSERT INTO instructor (username,first_name,last_name,email,password) VALUES ( '"+username+"','"+f_name+"','"+l_name+"' , '"+email+"','"+password+"') ",
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