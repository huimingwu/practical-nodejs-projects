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
}(this,function(){
    function server(){
        const http = require('http');
        const url = require('url');

        const hostname = '127.0.0.1';
        const port = '3000';
        const router = require('./router');

        const server = http.createServer((req,res)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type','text/plain');
            //路由
            router(req,res);
            res.end();
        })

        server.listen(port,hostname,()=>{
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    }
    return server;
});