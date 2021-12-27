import * as Koa from 'koa';

function log(ctx: Koa.BaseContext): void {
  console.log(ctx.method, ctx.header.host + ctx.url, 'async');
}

module.exports = function () {
  return async function (ctx: Koa.BaseContext, next: AsyncGeneratorFunction) {
    log(ctx);
    await next();
  };
};