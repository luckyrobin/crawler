var express = require('express');
var router = express.Router();

var request = require("request");
var Crawler = require("../module/Crawler");
var cheerio = require("cheerio");
var Movieinfo = require("../models/crawlerModel");

/* GET home page. */
router.get('/', function (req, res) {
    var c = new Crawler();
    var index = function () {
        var url = "http://movie.douban.com/later/wuhan/";
        c.get(url, function (content, status) {
            var $ = cheerio.load(content);
            var root = $('body #content .bd');
            root.find('.item.mod').each(function(i,n){
                var newInfo = new Movieinfo({
                    title:$(this).find('h3').text(),
                    img:$(this).find('.thumb img').attr('src'),
                    date:$(this).find('ul li').eq(0).text()
                });

                newInfo.save(function (err, result) {
                    if (err) {
                        res.statusCode = 503;
                        res.send({
                            result: result,
                            err: err
                        });
                        return;
                    }
                });
            });
            res.render('index', {title: 'Crawler', data: '抓取成功！'});
        });
    };

    index();
});

module.exports = router;
