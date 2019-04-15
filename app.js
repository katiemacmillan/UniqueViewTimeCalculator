var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');

var timeService = require('./service/timeService.js');

var app = express();
var upload = multer();


app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(upload.array());

// generic error handler
app.use(function (err, req, res, next) {
    res.status(500);
    res.render('error', {
        message: "An internal server error occured." + err
    });
});

// base home page
app.get('/', function (req, res, next) {
    res.render('index', {
        title: 'INDEX'
    });
});

// retreive and display results
app.post('/', function (req, res, next) {
    console.log(req.body.timeStamps);
    var result = timeService.calculateUVT(req.body.timeStamps);

    if (result.error) {
        res.status(400);
        res.render('error', {
            message: result.error
        });
    } else {
        console.log(result.fragments);
        console.log(result.totalTime);
        res.render('times', {
            title: 'TIMES',
            fragments: result.fragments,
            time: result.totalTime
        });
    }
});


var server = app.listen(8080, function () {
    var port = server.address().port;
});

module.exports = server;