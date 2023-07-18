const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const usersRouter = require('./routes/api/users');
const transactionsRouter = require('./routes/api/transactions');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WalletApp API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/api/*.js'],
};

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));

// if (process.env.NODE_ENV === 'production') {
//   const corsOptions = {
//     origin: 'https://wallet-app-goit.netlify.app',
//     optionsSuccessStatus: 200,
//   };
//   app.use(cors(corsOptions));
// } else {
//   app.use(cors());
// }

app.use(cors());

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionsRouter);

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsDoc(swaggerOptions))
);

app.use((req, res) => {
  res.status(404).json({
    status: 'Not found',
    code: 404,
    data: null,
    message:
      'Not found. Please visit documentation at: https://wallet-app-backend-3z9p.onrender.com/docs',
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'Internal server error',
    code: 500,
    data: null,
    message: err.message,
  });
});

module.exports = app;
