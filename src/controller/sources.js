// const {
//     create,
//     search,
//     updateAvatarUrlById,
//     updateUser,
//     getUserName
// } = require('./../service/user');

// const {
//     uploadPost
// } = require('./../service/api');

// const errorTypes = require('./../constants/error-types');

// const config = require('./../app/config');
// const { AVATAR_PATH } = require('../constants/file-path');

// const path = require("node:path"),
//     fs = require('node:fs');
// const { AVATAR_PATH, PICTURE_PATH } = require('./../constants/file-path');

const path = require("node:path"),
    fs = require('node:fs');

// import { path } from 'node:path';

// 负责具体的某一块功能
class SourcesController {

    async getBkImage (ctx, next) {
        const filePath = path.resolve(__dirname, './../sources/bkImage.webp');
        const source = fs.readFileSync(filePath);
        ctx.body = source;
        ////实现强缓存
        ctx.set('Cache-Control', `max-age=${60 * 60 * 24}`)
        // ctx.set('Cache-Control', `max-age=${10}`)
        // ctx.set('Cache-Control', 'no-store')
        ctx.set('Content-Type', 'image/webp');
        //// 实现协商缓存
        // const ifModifiedSince = ctx.request.header['if-modified-since'];
        // const getResource = () => {
        //     return new Promise((res) => {
        //         try {
        //             fs.stat(filePath, (err, stats) => {
        //                 if (err) {
        //                     console.log(err);
        //                 }
        //                 console.log(stats)
        //                 res(stats);
        //             })
        //         } catch (error) {
        //             console.log(err)
        //         }

        //     })
        // }
        // let resource = await getResource();

        // if (ifModifiedSince === resource.mtime.toGMTString()) {
        //     ctx.status = 304;
        // }
        // console.log('herelakdfjslkf')
        // ctx.set('Last-Modified', resource.mtime.toGMTString());

        // ctx.body = resource;

    }

    async getLoginImage (ctx, next) {
        const filePath = path.resolve(__dirname, './../sources/login.webp');
        // ctx.set('Content-Type', 'image/webp');
        ctx.set('Content-Type', 'image/webp');
        const source = fs.readFileSync(filePath);
        ctx.body = source;
    }


    async getRegisterImage (ctx, next) {
        const filePath = path.resolve(__dirname, './../sources/register.jpeg');
        // ctx.set('Content-Type', 'image/webp');
        ctx.set('Content-Type', 'image/jpeg');
        const source = fs.readFileSync(filePath);
        ctx.body = source;
    }
}

module.exports = new SourcesController();