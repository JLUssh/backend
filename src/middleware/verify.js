const config = require('./../app/config');
const jwt = require('jsonwebtoken');
//// 一些内容的访问，需要进行验证
// 验证token是否有效
async function verify (ctx, next) {
    try {

        // console.log(ctx.headers);
        let cookies = ctx.headers['cookie'];

        if (cookies) {
            let cookiesArr = cookies.split('; '),
                sessionId = cookiesArr.filter((item) => item.split('=').includes('SessionID'));

            if (sessionId.length) {
                sessionId = sessionId[0].split('=')[1];
                // 还得发送回去验证下吗？
                // 是否过期
            } else {
                //// 没有相应的cookie
                ctx.status = 401;
                ctx.body = JSON.stringify({
                    message: "unauthorized!"
                });
                return;
            }
            console.log('headers:')
            console.log(cookies);
            console.log(sessionId);

            // 还得看下账户是否存在 查询数据库
            jwt.verify(sessionId, config.SECRET_ACCESS_TOKEN, async (error, decoded) => {
                // 过期
                if (error) {
                    ctx.status = 401;
                    ctx.body = JSON.stringify({
                        message: "unauthorized!"
                    });
                    return;
                }

                console.log(decoded);
                await next();
            });
        }




    } catch (error) {
        console.log(error)
    }

}

module.exports = verify