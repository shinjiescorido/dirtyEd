var express = require('express'),
    path = require('path'),
    wines = require('./routes/employee');
   
 
var app = express();
app.configure(function () {
    //app.set('port', process.env.PORT || 3000);
    app.use(require('less-middleware')({ src: __dirname + '/public' }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.bodyParser());
   // app.use(express.cookieParser());
    //app.use(express.session({secret: '1234567890QWERTY'}));
    //app.use(express.bodyParser());
app.use(express.cookieParser('shhhh, very secret'));
app.use(express.session());
});

/**
* MODELS
* __________________________________________________________________________
* Model file for each major area of functionality in the site
**/
var models = require('./models/models');

/**
* ROUTES
* __________________________________________________________________________
* Route file for each major area of functionality in the site
**/

require('./routes/custom_fields')(app, models);
require('./routes/users')(app, models);
require('./routes/notifications')(app, models);
require('./routes/session')(app, models);

// require('./routes/custom_fields')(app);




app.get('/employees/:id/reports', wines.findByManager);
app.get('/employees/:id', wines.findById);
app.get('/employees', wines.findAll);
app.get('/api/employees/search/:id', wines.findAll)

var port = 8091;

app.listen(port);
console.log('Listening on port ' + port + '...');