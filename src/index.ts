require("./types");

require("./app/config");

const application = require("./app");

console.log(process.env.APP_PORT);

application.listen(process.env.APP_PORT, () => {
  console.log("jlu");
});

// 部署到 Vercel 需要增加這一行
// export default app;
