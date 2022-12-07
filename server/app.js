const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require("cookie-session");
const logger = require('morgan');
const favicon = require('serve-favicon');

const studentsRouter = require('./routes/students');
const classesRouter = require('./routes/classes');
const classTypesRouter = require('./routes/class_types');
const adminRouter = require('./routes/admin');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');

const app = express();

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  name: 'EasyFit',
  keys:['SecretKey','anotherSecretKey'],
  maxAge: 24* 60 * 60 * 1000
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/students', studentsRouter);
app.use('/classes', classesRouter);
app.use('/classTypes', classTypesRouter);
app.use('/admin', adminRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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