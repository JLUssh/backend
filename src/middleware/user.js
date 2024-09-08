const multer = require('@koa/multer');

const { AVATAR_PATH, PICTURE_PATH } = require('./../constants/file-path');

const verifyUser = async (ctx, next) => {
}

const avatarStore = multer.diskStorage({
    destination: (req, file, cb) => {
        // 这个路径应该是配置项，放置到一个文件中
        // console.log('here');
        try {
            cb(null, AVATAR_PATH);
        } catch (error) {
            console.log(error);
        }
    },
    filename: (req, file, cb) => {
        // 主要目的，让图片名字unique
        const filename = Date.now() + '-' + Math.round(Math.random() * 10000);
        cb(null, filename);
    }
});


// 主要用处理post的背景图片
const bgImgStore = multer.diskStorage({
    destination: (req, file, cb) => {
        // 这个路径应该是配置项，放置到一个文件中
        // console.log('here');
        try {
            cb(null, PICTURE_PATH);
        } catch (error) {
            console.log(error);
        }
    },
    filename: (req, file, cb) => {
        // 主要目的，让图片名字unique
        const filename = Date.now() + '-' + Math.round(Math.random() * 10000);
        cb(null, filename);
    }
});

const avatarUpload = multer({
    storage: avatarStore
    // dest: AVATAR_PATH
});

const bgImgUpload = multer({
    storage: bgImgStore
    // dest: PICTURE_PATH
});

const avatarHandler = avatarUpload.single('avatar');

const bgImgHandler = bgImgUpload.single('bgImg');


module.exports = {
    verifyUser,
    avatarHandler,
    bgImgHandler
};