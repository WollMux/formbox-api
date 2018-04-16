import * as express from 'express';
import { Router } from 'express-serve-static-core';
import { Logger } from 'ts-log-debug';
import * as asyncHandler from 'express-async-handler';
import { ConfigurationService } from '../services/configuration.service';

export function FormboxBarRouter(log: Logger, config: ConfigurationService): Router {
  log.debug('Initialisiere FormboxBar API.');
  const api = express.Router();

  api.get('/', asyncHandler(async (req, res, next) => {
    try {
      res.json(config.getFormboxBar());
    } catch (err) {
      log.error(err);
      next(err);
    }
  }));

  return api;
}
