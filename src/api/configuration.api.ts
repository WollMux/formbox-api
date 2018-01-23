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

  api.get('/fragmente/:name', asyncHandler(async (req, res, next) => {
    try {
        const name = req.params.name;

        if (name) {
          config.getFragment(name).then(base64String => {
            return res.json({ path: base64String });
          }).catch(err => {
            console.log(err);
          });
        }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }));

  api.get('/fragmentList', asyncHandler(async (req, res, next) => {
    try {
      config.getFragmentList().then(result => {
        return res.json({fragmentList: result});
      }).catch((err: any) => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }));

  api.get('/vorlagen', asyncHandler(async (req, res, next) => {
    try {
      config.getTemplates().then(templates => {
        res.json(Object.keys(templates));
      })
    } catch (err) {
      console.log(err);
      next(err);
    }
  }));

  api.get('/vorlagen/:name', asyncHandler(async (req, res, next) => {
    const name = req.params.name;
    
    try {
      if (name) {
      config.getTemplate(name).then(template => {
        res.json({ path: template });
      })
    }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }));


  return api;
}
