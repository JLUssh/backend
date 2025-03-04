import Koa = require("koa");
import fs = require("node:fs");
import path = require("node:path");

function useRoutes(this: Koa) {
  const files = fs.readdirSync(__dirname);
  for (const file of files) {
    if (file.includes("index")) {
      continue;
    }

    const p = path.resolve(__dirname, file);
    // const p = `./${file}`;
    // console.log(p);

    const router = require(p);
    // console.log(router);
    this.use(router.routes());
    this.use(router.allowedMethods());
  }
}

module.exports = useRoutes;
