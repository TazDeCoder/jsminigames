const consola = require('consola');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const indexRouter = require('./routes/index');

const { MONGODB_URI, ALLOWLIST_HOSTS } = require('./data/configValues');

const app = express();

// setup mongoose connection
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on('error', (err) => consola.error(err));

app.use(logger('dev'));
app.use(cors({ origin: ALLOWLIST_HOSTS, credentials: true }));
app.use('/', indexRouter);

module.exports = app;
