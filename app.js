var express = require('express');
var app = express();
var db = require('./db.js');
var cron = require('./index.js');
var routes = require('./route.js')
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors({
    exposedHeaders: ["Link"]
}));
app.use(bodyParser.json({
    limit: "100kb"
}));

app.use(bodyParser.json({ type: 'application/*+json' }));

app.use(bodyParser.raw({ type: 'application/vnd.costom-type' }));
app.use('/', routes);
app.use(errorHandler);

function errorHandler(error, req, res, next) {
    if (error.status) {
        console.log(error)
        res.status(error.status).json({ error: error });
    } else {
        console.log(error)
        res.status(400).json({ error })
    }
}
app.listen(6001, function() {
    console.log("Server started at port number: 6001");
});