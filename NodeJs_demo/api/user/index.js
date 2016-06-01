'use strict';

var express = require('express');
var controller = require('./users.controller');

var router = express.Router();

router.post("/answer",controller.answer);
router.get("/removeByIds/:ids",controller.removeByIds);

module.exports = router;
