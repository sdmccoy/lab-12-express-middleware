'use strict';

//dotenv on a global scope of the dev side server. empty config defualts to .env
const dotenv = require('dotenv').config();

const server = require('./lib/server.js');

server.start();
