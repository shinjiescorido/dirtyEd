var express = require('express'),
    path = require('path'),
    wines = require('./routes/employee');
 
var app = express();
app.configure(function () {
    //app.set('port', process.env.PORT || 3000);
    app.use(require('less-middleware')({ src: __dirname + '/public' }));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/employees/:id/reports', wines.findByManager);
app.get('/employees/:id', wines.findById);
app.get('/employees', wines.findAll);
app.get('/api/employees/search/:id', wines.findAll)

app.listen(3000);
console.log('Listening on port 3000...');