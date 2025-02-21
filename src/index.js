require('./app/config');

const app = require('./app');



console.log(process.env.APP_PORT)
app.listen(process.env.APP_PORT, () => {
    console.log('jlu');
});

// 部署到 Vercel 需要增加這一行
// export default app;