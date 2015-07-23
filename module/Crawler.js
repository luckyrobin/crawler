var Crawler = function() {};
var http = require('http');
var request = require('request');
Crawler.prototype.get = function(url, callback) {
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body, response.statusCode);
        }
    })
};
module.exports = Crawler;