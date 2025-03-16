import Koa = require("koa");
import { OutgoingMessage } from "node:http";

const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const useRoutes = require("./../router");
const errorHandler = require("./error-handler");

// 用于存储用户信息
global.user = null;

const app = new Koa();

// 解析接收到的数据
app.use(bodyParser());

app.use(
  cors({
    // origin: (ctx: any) => {
    //   ctx.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    //   //   ctx.setHeader("Access-Control-Allow-Credentials", "true");
    //   return true;
    // },
    origin: "http://localhost:8080",
    credentials: true,
  })
);
// //@ts-expect-error
// app.useRoutes = useRoutes;
//定义路由
// //@ts-expect-error
// app.useRoutes();

useRoutes.call(app);

// emitter.on(eventName, listener)
// emitter.emit(eventName, ...args);
app.on("error", errorHandler);

module.exports = app;
