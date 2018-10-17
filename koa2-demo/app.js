const Koa = require('koa');
const app = new Koa();
const router = require('koa-simple-router');
const path =require('path');
const serve = require('koa-static');
const co = require('co');
const render = require('koa-swig');

//渲染Html
app.context.render = co.wrap(render({
    root: path.join(__dirname, './views'),
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    writeBody: false
}));
//路由
app.use(router(_ => {
    _.get('/', (ctx, next) => {
        ctx.body = 'hello';
    })
    _.get('/index', async(ctx, next) => {
        ctx.body = await ctx.render('index.html');
    })
}));
//引用静态资源
app.use(serve(path.join(__dirname,'./public')));
//监听
app.listen(8080,()=>{
    console.log('服务已开启')
});
