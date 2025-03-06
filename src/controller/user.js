const { generateAccessJWT } = require('./../utils');

const {
    create,
    search,
    updateAvatarUrlById,
    updateUser,
    getUserName
} = require('./../service/user');



const {
    uploadPost
} = require('./../service/api');

const errorTypes = require('./../constants/error-types');

const config = require('./../app/config');
const { AVATAR_PATH } = require('../constants/file-path');

const path = require("node:path");
// const { AVATAR_PATH, PICTURE_PATH } = require('./../constants/file-path');

class UserController {

    async login (ctx) {
        let userInfo = ctx.request.body;
        console.log(userInfo)
        try {
            const res = await search(userInfo);

            if (res.length === 0) {
                const error = new Error(errorTypes.USER_OR_PASS_ERROR);
                ctx.app.emit('error', error, ctx);
            } else {
                let user = res[0],
                    // 有些信息并不应该发送给客户端
                    response = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        avatar_url: user.avatar_url,
                    };

                // ctx.user = response;
                global.user = response;
                let payload = {
                    id: response.id,
                    name: response.name,
                    email: response.email
                };
                const token = generateAccessJWT(payload, config.SECRET_ACCESS_TOKEN, 60 * 60 * 24);
                console.log('token: ', token);

                let options = {
                    maxAge: 60 * 60 * 24 * 1000,// would expire in 24 hours
                    // sameSite: "None",
                    // secure: true,
                    httpOnly: true
                }
                // // set the token to response header, 
                // so that the client sends it back 
                // on each subsequent request
                ctx.cookies.set("SessionID", token, options);

                ctx.body = response;
            }
        } catch (error) {
            console.log(error);
        }

    }

    async register (ctx, next) {
        let userInfo = ctx.request.body;
        const res = await create(userInfo);
        console.log(res);
        ctx.body = res;
    }

    async upload (ctx, next) {

        let {
            userId
        } = ctx.params;

        let data = ctx.request.body;
        let avatarUrl;
        // console.log(ctx.file);
        // console.log(data)
        if (ctx.file) {
            console.log('herer')

            avatarUrl = "http://" + path.join(`${config.APP_HOST}:${config.APP_PORT}/`, ctx.file.path);
            avatarUrl = avatarUrl.replaceAll('\\', '\/');
            // const avatarUrl = ctx.file.path;
            // console.log(avatarUrl);
            const res = await updateAvatarUrlById(avatarUrl, userId);
            // console.log(res);
            // ctx.body = res;
        }

        let {
            avatar,
            ...other
        } = data;
        console.log(other);
        // 可能顺序不匹配？
        let res = await updateUser(other, userId);
        console.log(res);

        ctx.body = JSON.stringify({
            id: userId,
            name: data.name,
            email: data.email,
            avatar_url: avatarUrl ? avatarUrl : ''
        });
    }

    async uploadBgImg (ctx, next) {

        let {
            userId
        } = ctx.params;

        let data = ctx.request.body;
        let avatarUrl;
        // console.log(ctx.file);
        // console.log(data)
        if (ctx.file) {
            console.log('herer')

            avatarUrl = "http://" + path.join(`${config.APP_HOST}:${config.APP_PORT}/`, ctx.file.path);
            avatarUrl = avatarUrl.replaceAll('\\', '\/');
            // const avatarUrl = ctx.file.path;
            // console.log(avatarUrl);
            // const res = await updateAvatarUrlById(avatarUrl, userId);
            // console.log(res);
            // ctx.body = res;
        }

        let {
            avatar,
            ...other
        } = data;
        console.log(other);
        // 可能顺序不匹配？
        let res = await updateUser(other, userId);
        console.log(res);

        ctx.body = JSON.stringify({
            id: userId,
            name: data.name,
            email: data.email,
            avatar_url: avatarUrl ? avatarUrl : ''
        });
    }


    async getName (ctx, next) {
        let {
            user_id
        } = ctx.query;

        let res = await getUserName(user_id);
        ctx.body = JSON.stringify(res);
    }

    //上传一个post
    async uploadPost (ctx, next) {
        try {
            //从地址中得到的
            let {
                userId
            } = ctx.params;

            //信息
            let data = ctx.request.body,
                postUrl;

            //在此之前，已经用中间件进行处理了

            // 这里是对图像的处理
            // 得到一个图片的路径
            if (ctx.file) {
                postUrl = "http://" + path.join(`${config.APP_HOST}:${config.APP_PORT}/`, ctx.file.path);
                postUrl = postUrl.replaceAll('\\', '\/');
            }

            //相关信息
            let postInfo = {
                photo: postUrl ? postUrl : null,
                user_id: userId,
                ...data,
            };

            // 可能顺序不匹配？
            console.log(postInfo);
            let res = await uploadPost(postInfo);

            console.log(res);

            ctx.body = JSON.stringify(res);
        } catch (err) {

            const error = new Error(errorTypes.CONTENT_NOT_SATISFY_REQUIRMENT);
            ctx.app.emit('error', error, ctx);
        }

    }
}

module.exports = new UserController();