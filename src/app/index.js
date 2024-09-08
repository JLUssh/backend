const Koa = require('koa'),
    bodyParser = require('koa-bodyparser');

const useRoutes = require('./../router');
const errorHandler = require('./error-handler');

// 用于存储用户信息
global.user = null;


const app = new Koa();


app.useRoutes = useRoutes;


// 解析接收到的数据
app.use(bodyParser());

//定义路由
app.useRoutes();

app.on('error', errorHandler);

module.exports = app;