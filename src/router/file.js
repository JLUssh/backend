const Router = require('koa-router');

const {
    getAvatar,
    getBgImg
} = require('./../controller/file');

const fileRouter = new Router({
    prefix: '/uploads'
});
// fileRouter.get('/', () => {
//     console.log('sdfkad');
// });

// 路径问题
// 也是希望获得一些信息
fileRouter.get('/avatar/:avatarPath', getAvatar);


fileRouter.get('/picture/:bgImgPath', getBgImg);

module.exports = fileRouter;