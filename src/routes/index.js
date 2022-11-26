var express = require('express');
var app = express();
var router = express.Router();
var fetchAll = require("../controller")

router.get('/fetch/koinex', fetchAll);

module.exports = router;