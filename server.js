const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require ('./posts/postRouter');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
const middleware = [express.json(), helmet(), morgan('dev'), logger];
server.use(middleware);
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);
//=================================================================================================
function logger(req, res, next) {
  console.log(`${req.method} Request`);
  next();
}
//=================================================================================================
module.exports = server;
