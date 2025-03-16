const Router = require('koa-router');

//// 验证，都得跟用户操作相关吧？
const verify = require('./../middleware/verify');

const {
    getCategories,
    addPost,
    addCategory,
    deletePost, changePost,
    fetchSinglePost,
    fetchAllCategory,
    fetchAllPostsOfUser,
    fetchAllPosts,
    fetchLabelsOfPost
} = require('./../controller/api');

const apiRouter = new Router({
    prefix: '/api'
});
// 创建博客

let pf = '/post';
apiRouter.post(`${pf}`, addPost);

// 删除
apiRouter.del(`${pf}/:postId`, verify, deletePost);

//更新
apiRouter.put(`${pf}/:postId`, verify, changePost);

//获取单个
apiRouter.get(`${pf}/:postId`, fetchSinglePost);

//获取全部
apiRouter.get(`${pf}`, fetchAllPosts);

//获取指定博客所对应的标签
apiRouter.get(`${pf}/:postId/labels`, fetchLabelsOfPost);


pf = '/category'
apiRouter.get(`${pf}`, fetchAllCategory);
apiRouter.post(`${pf}`, addCategory);

// 为啥需要在服务器端处理密码啊，不对啊
// apiRouter.get('/register', register);


module.exports = apiRouter;