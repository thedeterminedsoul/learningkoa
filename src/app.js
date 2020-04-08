'use strict';

const koa = require('koa');
const koaRouter = require('koa-router');

const app = new koa();
const router = new koaRouter();

const jwt = require('jsonwebtoken');

function isAuthorized(ctx, next) {
    console.log(`Authorization happening ${Date.now()}`);
    next();
}

// app.use(async (ctx, next) => {
//     await next();
//     // here we will find that the context variable
//     // has the 'X-Response-Time' in response section
//     const rt = ctx.response.get('X-Response-Time');
//     console.log(`${ctx.method} ${ctx.url} - ${rt}`);
// });
//
// app.use(async (ctx, next) => {
//     const start = Date.now();
//     await next();
//     const ms = Date.now() - start;
//     ctx.set('X-Response-Time', `${ms}ms`);
// });
//
// app.use(async ctx => {
//     ctx.body = "Hello world";
//     ctx.response.body = {'message': 'Hello world'};
//     // console.log(`Nodes request ==> `);
//     // console.log(ctx.req);
//     // console.log(`KOAs request`);
//     // console.log(ctx.request);
// });

router.get('/gettoken', (ctx) => {
    // jwt generation code
});

router.get('/hello', isAuthorized, (ctx) => {
    ctx.response.body = 'This is hello world API';
});

app.use(router.routes());

app.listen(3000, () => {
    console.log("Started KOA application");
    console.log(`APP ENV = ${app.env}`);
});

