const {
    create,
    search,
    updateAvatarUrlById
} = require('./../service/user');

const errorTypes = require('./../constants/error-types');

const config = require('./../app/config');
const { AVATAR_PATH, PICTURE_PATH } = require('../constants/file-path');

const path = require("node:path"),
    fs = require('node:fs');
// const { AVATAR_PATH, PICTURE_PATH } = require('./../constants/file-path');

class FileController {
    async getAvatar (ctx, next) {
        // console.log('here')
        // console.log(ctx.request.avatarPath);
        const { avatarPath } = ctx.params;
        // console.log(avatarPath);
        const p = path.resolve(AVATAR_PATH, avatarPath);
        // console.log(p);
        const temp = fs.readFileSync(p);

        if (temp) {
            // console.log('here');
            ctx.body = fs.createReadStream(p);
        }
    }
    async getBgImg (ctx, next) {
        // console.log('here')
        // console.log(ctx.request.avatarPath);
        const { bgImgPath } = ctx.params;
        // console.log(bgImgPath);
        const p = path.resolve(PICTURE_PATH, bgImgPath);

        const temp = fs.readFileSync(p);

        if (temp) {
            // console.log('here');
            ctx.body = fs.createReadStream(p);
        }
    }

}

module.exports = new FileController();