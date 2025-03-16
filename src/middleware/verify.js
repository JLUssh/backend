const errorTypes = require('./../constants/error-types')
const config = require('./../app/config');
const jwt = require('jsonwebtoken');

//// 需要有权限
//// 一些内容的访问，需要进行验证
// 验证token是否有效

//// authentication and authorization
async function verify (ctx, next) {
    try {

        // console.log(ctx.headers);
        // request / response
        let cookies = ctx.headers['cookie'];

        if (cookies) {
            let cookiesArr = cookies.split('; '),
                sessionId = cookiesArr.filter((item) => item.split('=').includes('SessionID'));

            if (sessionId.length) {
                sessionId = sessionId[0].split('=')[1];
                // 还得发送回去验证下吗？
                // 是否过期
            } else {
                ///// 没有相应的权限
                //// 没有相应的cookie
                ctx.app.emit(new Error(errorTypes.UNAUTHORIZATION));
                return;
            }
            // 可能中间件断掉了
            // 还得看下账户是否存在 查询数据库
            try {
                const decoded = jwt.verify(sessionId, config.SECRET_ACCESS_TOKEN);
                console.log('decoded')
                console.log(decoded);
                await next();
            } catch (error) {
                ctx.app.emit(new Error(errorTypes.UNAUTHORIZATION));
                return;
            }

        }
    } catch (error) {
        console.log(error)
    }

}

module.exports = verify