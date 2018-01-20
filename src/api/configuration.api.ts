import * as express from 'express';
import { Router } from 'express-serve-static-core';
import { Logger } from 'ts-log-debug';
import { ConfigurationService } from '../services/configuration.service';
import * as asyncHandler from 'express-async-handler';

export function ConfigurationRouter(log: Logger, config: ConfigurationService): Router {
  log.debug('Initialisiere Configuration API.');
  const api = express.Router();

  api.get('/', asyncHandler((req, res) => {
    res.json({ message: 'FormBox Configuration API' });
  }));

  api.get('/fragmente', asyncHandler((req, res, next) => {
    try {
        const name = req.query.name;

        if (name) {
          config.getFragment(name).then(base64String =>{
            return res.json({ path: base64String });
          }).catch(err => {
            console.log(err);
          });
        }
    } catch(err) {
      next(err);
    }
  }));
  
  return api;
}
