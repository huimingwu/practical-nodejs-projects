!function(root,moduleA){
    //commonJs
    if(typeof module !== 'undefined' && typeof exports === 'object'){
        module.exports = moduleA();
    //AMD && CMD
    }else if(typeof define === 'function' && (define.amd || define.cmd)){
        define(function(){
            return moduleA();
        });

    }else {
        root.moduleName = moduleA();
    }
}(this,function(){
    function moduleA(req,res){
        res.write("This is moduleA");
    }
    return moduleA;
});