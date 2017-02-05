var express = require('express')
var path = require('path')
var app = express()
var logger = require('morgan');
var opn = require("opn");

app.use(logger('dev'));
app.use(function(req, res, next){
    next();
});

app.use(express.static(path.join(__dirname, '../build')))


app.listen(3020, function () {
  console.log('Server listening on http://localhost:3020, Ctrl+C to stop')
  opn('http://localhost:3020')
})

