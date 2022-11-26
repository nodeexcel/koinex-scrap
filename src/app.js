var express = require('express');
var app = express();
var db = require('./koinex_db.js');
var routes = require('./routes');
var cors = require('cors');
var bodyParser = require('body-parser');
var errorHandler = require('./lib/errorHandler');

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

app.listen(6001, function () {
    console.log("Server started at port number: 6001");
});