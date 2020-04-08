'use strict';

const koa = require('koa');
const koaRouter = require('koa-router');
const bodyParser = require('koa-bodyparser')();

// ToDo: Add security options later
const helmet = require('koa-helmet')();

// ToDo: add compression options based on client requirements
const compress = require('koa-compress')();

// ToDo: Add logger information based on the client requirements
const logger = require('koa-logger')();

// ToDo: If Microservice, then avoid if used in internal VPN/VPC without authentication/authorization
// ToDo: Although keep a place holder for future projects
const cors = require('@koa/cors')();

const { isDevelopment } = require('./config');
const { port } = require('./config').server;

const app = new koa();
const router = new koaRouter();

const jwt = require('jsonwebtoken');

const errorHandler = require('./middleware/error.middleware');

if(isDevelopment) {
    app.use(logger);
}

function isAuthorized(ctx, next) {
    // implement this function based on bearer token given
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
    // we will be using private key concept here
    // for the template, I'll keep dummy file
    let privateKeyContent = fs.readFileSync('./src/private.pem', 'utf8');
    // I know HS256 is generic one used everywhere
    // use client specific algorithms when required at what level of security
    let token = jwt.sign({body: 'hello'}, privateKeyContent, {algorithm: 'HS256'});
    // this will be returned in body as of now, refactor it to be returned in header instead for clients
    ctx.response.body = token;
});

router.get('/hello', isAuthorized, (ctx) => {
    ctx.response.body = 'This is hello world API';
});

app.use(router.routes());
app.use(errorHandler)
    .use(helmet)
    .use(compress)
    .use(cors)
    .use(bodyParser);

app.listen(port, () => {
    console.log(`🚀 Started KOA application on port ${port}`);
});


