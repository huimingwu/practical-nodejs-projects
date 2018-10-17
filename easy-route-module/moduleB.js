!function(root,moduleB){
    //commonJs
    if(typeof module !== 'undefined' && typeof exports === 'object'){
        module.exports = moduleB();
    //AMD && CMD
    }else if(typeof define === 'function' && (define.amd || define.cmd)){
        define(function(){
            return moduleB();
        });

    }else {
        root.moduleName = moduleB();
    }
}(this,function(){
    function moduleB(req,res){
        res.write("This is moduleB");
    }
    return moduleB;
});