'use strict';

var express = require('express');
var controller = require('./users.controller');

var router = express.Router();

router.post("/answer",controller.answer);
router.get("/removeByIds/:ids",controller.removeByIds);

router.post("/client1",controller.client1);
router.get("/client2/:ids",controller.client2);


module.exports = router;
