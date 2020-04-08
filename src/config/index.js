
'use strict';

// file for all project related configurations
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const config = {};
const basePath = path.join(__dirname, 'components');

// require all the files from the components directory
fs.readdirSync(basePath).forEach(file => {
    const componentConfig = require(path.join(basePath, file));
    Object.assign(config, componentConfig);
});

module.exports = config;