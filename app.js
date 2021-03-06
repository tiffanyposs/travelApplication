var express = require('express')
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var relationship = require("mongoose-relationship");
var bcrypt = require("bcrypt");
var MongoStore = require('connect-mongo')(session);
var moment = require('moment');
var request = require('request')
var domain = require('domain');
var d = domain.create();


var app = express();

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add headers
app.use(function (req, res, next) {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', 'http://45.55.221.131');
    // res.setHeader('Access-Control-Allow-Origin', 'http://104.131.57.112');
    // res.setHeader('Access-Control-Allow-Origin', 'http://tripper.co');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


var routes = require('./routes/index');
var users = require('./routes/users');
var trips = require('./routes/trips');
var categories = require('./routes/categories');
var suggestions = require('./routes/suggestions');
var chats = require('./routes/chats');
var analysis = require('./routes/analysis');
var sessions = require('./routes/sessions');
var betas = require('./routes/betas')
var notes = require('./routes/notes')
var invites = require('./routes/invites')
var maps = require('./routes/maps')


// mongoose.connect('mongodb://localhost/Users/tiffany_poss/Desktop/TravelTest/data/db', function(err) {
mongoose.connect('mongodb://localhost/data/db', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

//for bcrypt
var fileName = "./secrets/secrets.json";
var config;


try {
  config = require(fileName)
}
catch (err) {
  config = {}
}

app.use(session({
  secret: config.sessionSecret, //this is from secrets.json
  resave: false,
  saveUninitialized: true,
  // cookie: {maxAge: 30000},
  store: new MongoStore({
    url: 'mongodb://localhost/data/db',
    // url: 'mongodb://localhost/Users/tiffany_poss/Desktop/TravelTest/data/db',
    autoRemove: 'disabled',
    touchAfter: 4 * 3600 // time period in seconds wont make a new session
  })
}));

// for routes
app.use('/', routes);
app.use('/users', users);
app.use('/trips', trips);
app.use('/categories', categories);
app.use('/suggestions', suggestions);
app.use('/chats', chats);
app.use('/analysis', analysis);
app.use('/sessions', sessions);
app.use('/betas', betas)
app.use('/notes', notes)
app.use('/invites', invites)
app.use('/maps', maps)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//catches all of the errors 
d.on('error', function(err) {
  console.error(err);
});

module.exports = app;

// app.listen(3000)
app.listen(80)
