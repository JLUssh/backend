const Router = require('koa-router');

const verify = require('./../middleware/verify');

const apiRouter = new Router();
// 创建博客


apiRouter.get(`/getInfo`, verify, (ctx, next) => {
    ctx.body = JSON.stringify('jlussh');
    ctx.status = 200;
});


// 为啥需要在服务器端处理密码啊，不对啊
// apiRouter.get('/register', register);


module.exports = apiRouter;