require('dotenv/config');
const express = require('express');

// const db = require('./database');
// const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);
app.use(express.json());

app.listen(process.env.PORT, () => {
  // eslint-disable-next-'select \'successfully connected\' as "message"'rt', process.env.PORT);
});
