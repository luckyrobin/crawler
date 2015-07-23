var express = require('express');
var router = express.Router();

var crawlerController = require('./controllers/crawlerController');

/* GET home page. */
router.get('/', crawlerController.crawler);

router.get('/list', crawlerController.list);

module.exports = router;
