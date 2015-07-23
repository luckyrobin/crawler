var pool = require('./db');
var useDbSql = 'USE test';

function Movieinfo(movie) {
    this.title = ( movie && movie.title) || null;
    this.img = ( movie && movie.img) || null;
    this.date = ( movie && movie.date) || null;
}

module.exports = Movieinfo;

pool.getConnection(function (err, connection) {

    connection.query(useDbSql, function (err) {
        if (err) {
            console.log("USE Error: " + err.message);
            return;
        }
        console.log('USE succeed');
    });

    //保存数据
    Movieinfo.prototype.save = function save(callback) {
        var moveinfo = {
            title: this.title,
            img: this.img,
            date: this.date
        };

        var insertUser_Sql = "INSERT INTO movieinfo(m_id,m_title,m_img,m_date) VALUES(0,?,?,?)";

        connection.query(insertUser_Sql, [moveinfo.title, moveinfo.img, moveinfo.date], function (err, result) {
            if (err) {
                console.log("insertUser_Sql Error: " + err.message);
                return;
            }

            //connection.release();

            console.log("saved...");
            callback(err, result);
        });
    };

    //显示数据
    Movieinfo.prototype.list = function(callback){
        pool.getConnection(function (err, connection) {
            connection.query("select * from movieinfo", function (err, result) {
                //处理数据
                callback(err, result);
            })
        })
    }
});