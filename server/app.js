/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
require('dotenv').config();
const ws = require('ws');

const redis = require('redis');
const RedisStore = require('connect-redis')(session);
// const FileStore = require('session-file-store')(session);
const servicesRouter = require('./routes/benefitServices');

const globalNewsRouter = require('./routes/globalNews');
const localNewsRouter = require('./routes/localNews');
const locationRouter = require('./routes/location');
const usersRouter = require('./routes/user');
const baraholkaRouter = require('./routes/baraholka');
const bidsRouter = require('./routes/bids');

const app = express();
const PORT = process.env.PORT || 3000;

const redisClient = redis.createClient();

app.use(logger('dev'));
app.use(express.json());

app.use(cors());

const fileStoreOptions = {};

const sessionConfig = {

  name: 'myHome',
  store: new RedisStore({ client: redisClient }),
  // store: new FileStore(fileStoreOptions),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 10,
  },
};
app.use(session(sessionConfig));

app.use((req, res, next) => {
  res.locals.username = req.session?.user?.name;
  res.locals.userId = req.session?.user?.id;

  console.log('\n\x1b[33m', 'req.session.user :', req.session.user);
  console.log('\x1b[35m', 'res.locals.username:', res.locals.username);
  next();
});

app.use('/bids', bidsRouter);
app.use('/services', servicesRouter);
app.use('/baraholka', baraholkaRouter);
app.use('/globalNews', globalNewsRouter);
app.use('/localNews', localNewsRouter);
app.use('/user', usersRouter);
app.use('/global', locationRouter);

app.use((req, res, next) => {
  const error = createError(
    404,
    'Запрашиваемой страницы не существует на сервере.',
  );
  next(error);
});

app.use((err, req, res) => {
  const appMode = req.app.get('env');

  let error;

  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }

  res.locals.message = err.message;
  res.locals.error = error;

  res.status(err.status || 500);
});

const httpServer = app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});


const wsServer = new ws.WebSocketServer({
  server: httpServer,
});

wsServer.on('connection', (currentClient) => {
  currentClient.on('message', (data, req) => {
    const message = data.toString('utf-8');
    wsServer.clients.forEach((client) => {
      client.send(message);
    });
  });

  currentClient.on('close', (client) => {
  });
});
