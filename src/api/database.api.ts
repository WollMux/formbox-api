import * as express from 'express';
import { Router } from 'express-serve-static-core';
import { Logger } from 'ts-log-debug';
import * as asyncHandler from 'express-async-handler';

export function DatabaseRouter(log: Logger): Router {
  log.debug('Initialisiere Database API.');
  const api = express.Router();

  api.get('/', asyncHandler( (req, res, next) => {
    res.json({ message: 'FormBox Databse API' });
  }));
  
  return api;
}
