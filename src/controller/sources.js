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

    // async getLoginImage (ctx, next) {
    //     try {

    //         const filePath = path.resolve(__dirname, './../sources/login.webp');
    //         // ctx.set('Content-Type', 'image/webp');
    //         ctx.set('Content-Type', 'image/webp');

    //         const fsStatus = fs.statSync(filePath);
    //         const source = fs.readFileSync(filePath);

    //         // 要求是UTC格式的时间
    //         const mtimeStr = fsStatus.mtime.toUTCString();

    //         const ifModifiedSince = ctx.headers['if-modified-since'];
    //         // console.log(ctx.headers);
    //         // console.log(ifModifiedSince)
    //         console.log(mtimeStr);
    //         console.log("ifModifiedSince:")
    //         console.log(ifModifiedSince);
    //         console.log(ctx.lastModified);
    //         if (ifModifiedSince) {
    //             console.log('客户端传入的时间:', ifModifiedSince);
    //             // 重新设置这个时间

    //             if (mtimeStr > ifModifiedSince) {
    //                 // 发生了修改
    //                 ctx.set('Last-Modified', mtimeStr);
    //                 console.log('200');
    //                 ctx.status = 200;
    //                 ctx.body = source;
    //             } else {
    //                 console.log('304');
    //                 // 资源没有发生修改
    //                 // not modified 常用于协商缓存
    //                 ctx.status = 304;
    //                 ctx.body = undefined;
    //             }

    //         } else {
    //             // 第一次资源发送请求时，需要携带 Last-Modified 字段
    //             ctx.set('Last-Modified', mtimeStr);
    //             ctx.body = source;
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }

    // async getLoginImage (ctx, next) {
    //     try {
    //         const filePath = path.resolve(__dirname, './../sources/login.webp');
    //         ctx.set('Content-Type', 'image/webp');

    //         const fsStatus = await fs.promises.stat(filePath);
    //         const source = await fs.promises.readFile(filePath);

    //         // 要求是 UTC 格式的时间
    //         const mtimeStr = fsStatus.mtime.toUTCString();

    //         const ifModifiedSince = ctx.headers['if-modified-since'];
    //         console.log(mtimeStr);
    //         console.log("ifModifiedSince:");
    //         console.log(ifModifiedSince);
    //         // 正确获取响应头中的 Last-Modified
    //         console.log(ctx.get('Last-Modified'));
    //         console.log('fresh:');
    //         console.log(ctx.fresh);
    //         if (ifModifiedSince) {
    //             console.log('客户端传入的时间:', ifModifiedSince);

    //             // 将日期字符串转换为 Date 对象进行比较
    //             const mtimeDate = new Date(mtimeStr);
    //             const ifModifiedSinceDate = new Date(ifModifiedSince);

    //             if (mtimeDate > ifModifiedSinceDate) {
    //                 // 发生了修改
    //                 ctx.set('Last-Modified', mtimeStr);
    //                 console.log('200');
    //                 ctx.status = 200;
    //                 ctx.body = source;
    //             } else {
    //                 console.log('304');
    //                 // 资源没有发生修改
    //                 // not modified 常用于协商缓存
    //                 ctx.status = 304;
    //                 return;
    //             }
    //         } else {
    //             // 第一次资源发送请求时，需要携带 Last-Modified 字段
    //             ctx.set('Last-Modified', mtimeStr);
    //             ctx.body = source;
    //         }
    //     } catch (error) {
    //         console.log("error");
    //         console.log(error);
    //         // 给客户端返回合适的错误响应
    //         ctx.set('Content-Type', 'application/json');
    //         ctx.status = 500;
    //         ctx.body = JSON.stringify({ error: 'Internal Server Error' });
    //     }
    // }

    // async getLoginImage (ctx, next) {
    //     try {
    //         const filePath = path.resolve(__dirname, './../sources/login.webp');
    //         const fsStatus = await fs.promises.stat(filePath);
    //         const source = await fs.promises.readFile(filePath);
    //         const mtimeStr = fsStatus.mtime.toUTCString();

    //         ctx.set('Content-Type', 'image/webp');
    //         ctx.set('Last-Modified', mtimeStr);

    //         if (ctx.fresh) {
    //             ctx.status = 304;
    //             return;
    //         }

    //         ctx.body = source;
    //     } catch (error) {
    //         console.error('Error:', error);
    //         ctx.status = 500;
    //         ctx.type = 'json';
    //         ctx.body = { error: 'Internal Server Error' };
    //     }
    // }

    async getLoginImage (ctx) {
        try {
            const filePath = path.resolve(__dirname, './../sources/login.webp');
            const stats = await fs.promises.stat(filePath);
            const mtime = stats.mtime;
            const mtimeStr = mtime.toUTCString();

            // 设置必要的缓存头
            ctx.set('Content-Type', 'image/webp');
            ctx.set('Last-Modified', mtimeStr);
            // ctx.set('Cache-Control', 'public, max-age=0'); // 关键！
            // 打印调试信息
            console.log('[Server] Last-Modified:', mtimeStr);
            console.log('[Client] If-Modified-Since:', ctx.headers['if-modified-since']);

            // 依赖 Koa 的缓存验证逻辑
            if (ctx.fresh) {
                ctx.status = 304;
                return;
            }

            // 返回实际内容
            ctx.body = await fs.promises.readFile(filePath);
        } catch (error) {
            ctx.status = 500;
            ctx.type = 'json';
            ctx.body = { error: 'Internal Server Error' };
        }
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