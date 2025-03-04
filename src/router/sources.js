const Router = require('koa-router');
const verify = require('./../middleware/verify')
const {
    getBkImage,
    getLoginImage,
    getRegisterImage
} = require('../controller/sources');

const sourceRouter = new Router({
    prefix: '/api'
});
// sourceRouter.get('/', () => {
//     console.log('sdfkad');
// });


// 根据posts里的user_id，找到user里对应id的name
// /user/getname?user_id=xxx
sourceRouter.get('/bkImg', getBkImage);
sourceRouter.get('/loginImg', getLoginImage);
sourceRouter.get('/registerImg', getRegisterImage);



module.exports = sourceRouter;