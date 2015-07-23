var Movieinfo = require('../models/crawlerModel');
var request = require("request");
var Crawler = require("../module/Crawler");
var cheerio = require("cheerio");
var fs = require('fs');
var paths = require('path');

exports.crawler = function (req, res) {
    var c = new Crawler();
    var index = function () {
        var url = "http://movie.douban.com/later/wuhan/";
        c.get(url, function (content, status) {
            var $ = cheerio.load(content);
            var root = $('body #content .bd');
            root.find('.item.mod').each(function (i, n) {
                var newInfo = new Movieinfo({
                    title: $(this).find('h3').text(),
                    img: $(this).find('.thumb img').attr('src'),
                    date: $(this).find('ul li').eq(0).text()
                });

                var pathimg = paths.basename(newInfo.img);

                var e = fs.createWriteStream('../public/crawlerImg/' + pathimg, {
                    flags: 'w+'
                });
                request(newInfo.img).pipe(e);

                e.on('finish', function () {
                    newInfo.img = this.path.replace(this.path, '../crawlerImg/' + pathimg);
                    newInfo.save(function (err, result) {
                        if (err) {
                            res.statusCode = 503;
                            res.send({
                                result: result,
                                err: err
                            });
                            return false;
                        }
                        return true;
                    });
                });
            });

        });
        res.render('index', {title: 'Crawler', data: '抓取成功！'});
    };
    index();
};

exports.list = function (req, res) {
    var mi = new Movieinfo();
    mi.list(function (err, result) {
        if (err) {
            res.statusCode = 503;
            res.send({
                result: result,
                err: err
            });
            return;
        }
        res.render('list', {title: 'list', data: result});
    });
};