var express = require('express');
var app =express();
var cheerio = require('cheerio');

app.get('/',function(req,res,next){  
  var request = require('request');
  request('http://tieba.baidu.com/', function (error, response, body) {
    let data = [];
    if(!error && response.statusCode == 200){
      //cheerio开始处理
      const $ = cheerio.load(body);//$为拿到整个body的前端选择器       
      $('.f-d-item-content div > a').each(function(i,elem){  
        let _this = $(elem);
        data.push({
          title: _this.attr('title'),
          href:_this.attr('href')
        }); 
      });
    }
    return res.json(data);
  });
});

app.listen(8080,function(){
  console.log('服务已开启');
})