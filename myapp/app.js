var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();
app.use(session({secret: 'ssshhhhh'}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var sess;
app.use('/', index);
//app.use('/users', users);



//login user 
app.post('/login',function(req,res){
  sess = req.session;
//In this we are assigning email to sess.email variable.
//email comes from HTML page.
  sess.email=req.body.email; 
  sess.pass=req.body.pass;
    if(sess.email == 'ina@test.com'){
        res.end('done');
    }else{
        res.end('false');
    }
  
});


// dashboard admin
app.get('/admin',function(req,res){
  sess = req.session;
    console.log("Admin:" + sess.email);
    if(sess.email) {
    res.write('<h1>Hello '+sess.email+',' + sess.pass +'</h1>');
    res.end('<a href="http://localhost:3000/logout">Logout</a>');
    } else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href="http://localhost:3000/">Login</a>');
    }
});

// log out user
app.get('/logout',function(req,res){
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
});    

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;