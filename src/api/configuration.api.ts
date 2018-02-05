import * as express from 'express';
import { Router } from 'express-serve-static-core';
import { Logger } from 'ts-log-debug';
import { ConfigurationService } from '../services/configuration.service';
import * as asyncHandler from 'express-async-handler';
import { isNullOrUndefined } from 'util';
import { CommonService } from '../services/common.service';

export function ConfigurationRouter(log: Logger, config: ConfigurationService, common: CommonService): Router {
  log.debug('Initialisiere Configuration API.');
  const api = express.Router();

  api.get('/', asyncHandler((req, res) => {
    res.json({ message: 'FormBox Configuration API' });
  }));

  api.get('/fragmente/:name/:base64?', asyncHandler(async (req, res, next) => {
    try {
        const name = req.params.name;
        const toBase64 = req.params.base64;

        if (isNullOrUndefined(name)) {
          return res.json({ path: '' });
        }

        if (!isNullOrUndefined(toBase64) && toBase64 === 'true') {
          config.getFragment(name).then(base64String => {
            return res.json({ path: base64String });
          }).catch(err => {
            log.error(err);
          });
        } else {
          config.getFragmentFilePath(name).then(filePath => {
            return res.sendFile(filePath, { root: common.getAssetsFolder() }, function(err: any) {
              if (err) {
                log.error(err);

                return res.status(err.status).end();
              }
            });
          });
        }
    } catch (err) {
      log.error(err);
      next(err);
    }
  }));

  api.get('/fragmente', asyncHandler(async (req, res, next) => {
    try {
      config.getFragments().then(result => {
        return res.json({ fragmentList: result });
      }).catch((err: any) => {
        log.error(err);
      });
    } catch (err) {
      log.error(err);
      next(err);
    }
  }));

  api.get('/vorlagen', asyncHandler(async (req, res, next) => {
    try {
      config.getTemplates().then(templates => {
        res.json(Object.keys(templates));
      });
    } catch (err) {
      log.error(err);
      next(err);
    }
  }));

  api.get('/vorlagen/:name/:base64?', asyncHandler(async (req, res, next) => {
    try {
      const name = req.params.name;
      const toBase64 = req.params.base64;
      if (isNullOrUndefined(name)) {
        return res.json({ path: '' });
      }

      if (!isNullOrUndefined(toBase64) && toBase64 === 'true') {
        config.getTemplate(name).then(base64String => {
          return res.json({ path: base64String });
        }).catch(err => {
          log.error(err);
        });
      } else {
        config.getTemplateFilePath(name).then(filePath => {
          return res.sendFile(filePath, { root: common.getAssetsFolder() }, function(err: any) {
            if (err) {
              log.error(err);

              return res.status(err.status).end();
            }
          });
        });
      }
  } catch (err) {
    log.error(err);
    next(err);
  }
}));

  return api;
}
