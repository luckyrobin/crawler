var express = require('express');
var router = express.Router();
var pool = require('../models/db');

/* GET home page. */
router.get('/', function (req, res) {
    pool.getConnection(function(err,conn){
        conn.query("select * from movieinfo", function(err, rs, fields){
            //处理数据
            console.log(rs);
            res.render('list', {title: 'list', data: rs});
        })
    })
});

module.exports = router;
