var express = require('express');
var app = express();
var mysql = require('mysql');
app.use(express.static('public'));
//配置swig
var swig = require('swig');
app.set('view engine','html');
app.engine('html',swig.renderFile);
//设置mysql
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodejs-test'
});
connection.connect();
//路由
app.get('/',function(req,res,next){
    res.render('index',{
        title:'express小程序'
    }); 
})
app.get('/receive',function(req,res,next){
    console.log(req.query.username);
    res.json({
        data:123
    });
    var post  = {
        username:req.query.username
    };
    var query = connection.query('INSERT INTO userinfo SET ?', post, function (error, results, fields) {
        if (error){
            res.json({
                success:'no',
                msg:'插入失败'
            })
        }else{
            res.json({
                success:'ok',
                msg:'插入成功'
            })
        }
        
    });
});
//容错机制
//404
app.get('*',function(req,res,next){
    res.status(404);
    res.end('404');
});
//500
app.use(function(err,req,res,next){
    res.status(500);
    res.end('error..')
});
//启动服务
app.listen(8081,function(){
    console.log('已启动');
})