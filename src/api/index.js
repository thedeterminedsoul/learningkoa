'use strict';

const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

const { apiVersion } = require('../config').server;
const baseName = path.basename(__filename);

function applyMiddleware(app) {
    const router = new Router({
        prefix: `/api/${apiVersion}`,
    });


    // Require all the folders and create a sub-router for each of the feature api
    fs.readdirSync(__dirname)
        .filter(file => file.indexOf('.') !==0 && file !== baseName)
        .forEach(file => {
            const api = require(path.join(__dirname, file))(Router);
            router.use(api.routes());
        })
}

module.exports = applyMiddleware;