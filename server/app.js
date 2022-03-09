const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const usersRouter = require('./routes/user');
const gameRouter = require('./routes/game')

const app = express();
const PORT = process.env.PORT || 3000;
// const redis = require('redis');
// let RedisStore = require('connect-redis')(session);
// let redisClient = redis.createClient();
const FileStore = require('session-file-store')(session);


app.use(logger('dev'));
app.use(express.json());
// const corsOptions ={
//   origin:'http://localhost:3000', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
app.use(cors());

const fileStoreOptions = {};

const sessionConfig = {
  name: 'myHome',
  // store: new RedisStore({ client: redisClient }),
  store: new FileStore(fileStoreOptions),
  secret: process.env.COOKIE_SECRET,
  resave: false,                    
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 10,
  },
}
app.use(session(sessionConfig));


app.use((req, res, next) => {
  
  res.locals.username = req.session?.user?.name;
  
  console.log("\n\x1b[33m", 'req.session.user :', req.session.user);
  console.log("\x1b[35m", 'res.locals.username:', res.locals.username);
  next();
});
app.use('/', gameRouter);
app.use('/user', usersRouter);

app.use((req, res, next) => {
  const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
  next(error);
});

app.use(function (err, req, res, next) {
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

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
})
