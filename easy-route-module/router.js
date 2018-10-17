!function(root,factory){
    //commonJs
    if(typeof module !== 'undefined' && typeof exports === 'object'){
        module.exports = factory();
    //AMD && CMD
    }else if(typeof define === 'function' && (define.amd || define.cmd)){
        define(function(){
            return factory();
        });

    }else {
        root.moduleName = factory();
    }
}(this,function(req,res){
    //引用模块
    const url = require('url');
    const moduleA  = require('./moduleA');
    const moduleB = require('./moduleB');
    //路由
    function router(req,res){
        //处理URL
        var arg = url.parse(req.url,true).pathname;
        var argSplit = arg.split('/');
        if(argSplit.length > 2){
            arg = '/' + argSplit[1];
        }
        //设置
        var handle = {};
        
        handle['/moduleA'] = moduleA;
        handle['/moduleB'] = moduleB;
        
        //判断
        if(typeof handle[arg] === 'function'){
            handle[arg](req,res);
        }else {
            res.write("404 Not Found");
        }
        
    }
    return router;
});