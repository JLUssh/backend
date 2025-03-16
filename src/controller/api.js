const {
    createPost,
    createCategory,
    removePost,
    updatePost,
    getSinglePost,
    getAllPosts,
    getAllCategory,
    getAllPostsOfUser,
    getLabelsOfPost,
    getAllPostsWithCat,
    getAllPostsWithUserId
} = require('./../service/api');

const fetchAllCategory = async (ctx, next) => {
    try {
        const result = await getAllCategory();
        ctx.body = result;
    } catch (error) {
        console.log(error);
    }
};

const addPost = async (ctx, next) => {

    let user = global.user;
    try {
        let postInfo = {};

        Object.assign(postInfo, {
            // id: ctx.user.id
            id: user.id
            // id: 1
        }, ctx.request.body);

        // console.log(postInfo);

        const result = await createPost(postInfo);

        ctx.body = result;
    } catch (error) {
        console.log(error);
    }

};

const deletePost = async (ctx, next) => {
    try {
        // 放置到了params中
        let { postId } = ctx.params;
        const result = await removePost(postId);
        ctx.body = JSON.stringify(result);
        console.log(result);
        console.log('aslfjkasdfklasjfdlkf---------')
    } catch (error) {
        console.log(error);
    }
}

const fetchSinglePost = async (ctx, next) => {
    try {
        // 放置到了params中
        let { postId } = ctx.params;
        const result = await getSinglePost(postId);
        ctx.body = result[0];
    } catch (error) {
        console.log(error);
    }
}

const fetchAllPostsOfUser = async (ctx, next) => {
    try {
        // 放置到了params中
        // let { userId } = ctx.user;
        // console.log('asldkfjskldfj')
        let userId = ctx.query.user;
        const result = await getAllPosts(userId);
        // console.log(result);
        ctx.body = JSON.stringify(result);
    } catch (error) {
        console.log(error);
    }
}

const fetchAllPosts = async (ctx, next) => {
    try {
        let {
            user_id,
            cat_id
        } = ctx.query;

        // 可能是有条件的查询
        let result
        if (user_id) {
            result = await getAllPostsWithUserId(user_id);
            console.log(result);
            ctx.body = JSON.stringify(result);
        } else if (cat_id) {
            // console.log('aksdjlflskdfj')
            result = await getAllPostsWithCat(cat_id);

            ctx.body = JSON.stringify(result);
        } else {
            result = await getAllPosts();

            ctx.body = JSON.stringify(result);
        }
    } catch (error) {
        console.log(error);
    }
}

const fetchLabelsOfPost = async (ctx, next) => {
    try {
        let { postId } = ctx.params;
        const result = await getLabelsOfPost(postId);
        // console.log(result);
        let res = result[0];

        if (!res) {
            res = {
                labels: []
            };
        }

        ctx.body = JSON.stringify(res);
    } catch (error) {
        console.log(error);
    }
}

const changePost = async (ctx, next) => {
    try {
        let { postId } = ctx.params;
        let postInfo = {};
        Object.assign(postInfo, {
            id: postId
        }, ctx.request.body);

        const result = await updatePost(postInfo);
        ctx.body = result;
    } catch (error) {

    }
}

const addCategory = async (ctx, next) => {
    // console.log(user);
    try {
        let { name } = ctx.request.body;
        const result = await createCategory(name);
        ctx.body = result;
    } catch (error) {
        console.log(error);
    }
};

const deleteCategory = async (ctx, next) => {
    try {
        let { id } = ctx.params;
        const result = await deleteCategory(id);
        ctx.body = result;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    fetchAllCategory,
    addPost,
    addCategory,
    deletePost,
    changePost,
    deleteCategory,
    fetchSinglePost,
    fetchAllPosts,
    fetchAllPostsOfUser,
    fetchLabelsOfPost
};