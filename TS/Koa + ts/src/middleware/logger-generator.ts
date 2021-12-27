import * as Koa from 'koa';
function log(ctx: Koa.BaseContext): void {
  console.log(ctx.method, ctx.header.host + ctx.url);
}

module.exports = function () {
  return function * (next: Promise<any>) {
    log(this);
    if (next) {
      yield next;
    }
  };
};