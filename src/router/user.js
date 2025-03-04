const Router = require('koa-router');

const {
    register,
    login,
    upload,
    uploadBgImg,
    getName,
    uploadPost
} = require('./../controller/user');

const { avatarHandler, bgImgHandler } = require('./../middleware/user')

const verify = require('./../middleware/verify');

const userRouter = new Router({
    prefix: '/user'
});
// userRouter.get('/', () => {
//     console.log('sdfkad');
// });

// 路径问题
// 也是希望获得一些信息
userRouter.post('/login', verify, login);


// 为啥需要在服务器端处理密码啊，不对啊
userRouter.post('/register', register);


//更新信息，所以用put
userRouter.put('/:userId/upload', avatarHandler, upload);


userRouter.post('/:userId/upload', bgImgHandler, uploadBgImg);

//put 进行处理
userRouter.put('/:userId/uploadPost', bgImgHandler, uploadPost);


// 根据posts里的user_id，找到user里对应id的name
// /user/getname?user_id=xxx
userRouter.get('/getname', getName);



module.exports = userRouter;