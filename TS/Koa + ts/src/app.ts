import * as Koa from 'koa';
const app = new Koa();
const loggerGenerator  = require('./middleware/logger-generator');

const loggerAsync = require('./middleware/logger-async');
app.use(loggerGenerator());
app.use(loggerAsync());
app.use(async (ctx: Koa.Context) => {
  ctx.body = ctx.request.url;
});
module.exports = app;
