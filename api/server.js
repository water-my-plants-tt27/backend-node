const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const authRouter = require('./auth/auth-router.js');
const plantsRouter = require('./plants/plants-router');
const usersRouter = require('./users/users-router');
const myPlantsRouter = require('./my_plants/my_plants-router');

const server = express();
server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use('/api/auth', authRouter);
server.use('/api/plants', plantsRouter);
server.use('/api/users', usersRouter);
server.use('/api/my-plants', myPlantsRouter);

server.use('/', (req, res) => {
  res.json({ message: 'Welcome to the water my plants API' });
});

module.exports = server;
