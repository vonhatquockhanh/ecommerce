import express from 'express';
import { v4 as uuid } from 'uuid';
import payload from './payload';
import path from 'path';
import { initRouteAPIV1 } from './routes';
import cookies from 'cookie-parser'
import dotenv from 'dotenv';

const expressApp = express();
expressApp.use(cookies());
expressApp.use('/assets', express.static(path.resolve(__dirname, '../assets')));

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const startDev = async () => {
  await payload.init({
    secret: uuid(),
    mongoURL: process.env.MONGO_URL,
    express: expressApp,
    email: {
      logMockCredentials: true,
      fromName: 'Payload',
      fromAddress: 'hello@payloadcms.com',
    },
    onInit: async () => {
      payload.logger.info('Payload Dev Server Initialized');
    },
  });

  // Redirect root to Admin panel
  expressApp.get('/', (_, res) => {
    res.redirect('/admin');
  });

  const externalRouter = express.Router();

  // externalRouter.use(payload.authenticate);
  initRouteAPIV1(expressApp);
  expressApp.listen(process.env.SERVER_PORT, async () => {
    payload.logger.info(`Admin URL on ${payload.getAdminURL()}`);
    payload.logger.info(`API URL on ${payload.getAPIURL()}`);
  });
};

startDev();
