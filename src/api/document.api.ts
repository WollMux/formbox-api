import * as express from 'express';
import { Router } from 'express-serve-static-core';
import { Logger } from 'ts-log-debug';
import * as asyncHandler from 'express-async-handler';
import { isNullOrUndefined } from 'util';
import { CommonService } from '../services/common.service';
import { DocumentService } from '../services/document.service';
import { ConfigurationService } from '../services/configuration.service';

export function DocumentRouter(
    log: Logger,
    common: CommonService,
    document: DocumentService,
    config: ConfigurationService ): Router {
  log.debug('Initialisiere Document API.');
  const api = express.Router();

  api.get('/fragmente', asyncHandler(async (req, res, next) => {
    try {
      config.getFragments().then(fragments => {
        return res.json(Object.keys(fragments));
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

  api.get('/fragmente/:name', asyncHandler(async (req, res, next) => {
    try {
        const name = req.params.name;
        const toBase64 = req.query.base64;

        if (isNullOrUndefined(name)) {
          return res.json({ base64: '' });
        }

        if (!isNullOrUndefined(toBase64) && toBase64 === 'true') {
          document.getFragment(name).then(base64String => {
            return res.json({ base64: base64String });
          }).catch(err => {
            log.error(err);
          });
        } else {
          document.getFragmentFilePath(name).then(filePath => {
            return common.getAssetsFolder().then(assetsFolderPath => {
              return res.sendFile(filePath, { root: assetsFolderPath }, (err): any => {
                if (err) {
                  log.error(err);

                  return res.status(err.status).end();
                }
              });
            });
          });
        }
    } catch (err) {
      log.error(err);
      next(err);
    }
  }));

  api.get('/vorlagen/:name', asyncHandler(async (req, res, next) => {
    try {
      const name = req.params.name;
      const toBase64 = req.query.base64;

      if (isNullOrUndefined(name)) {
        return res.json({ base64: '' });
      }

      if (!isNullOrUndefined(toBase64) && toBase64 === 'true') {
        document.getTemplate(name).then(base64String => {
          return res.json({ base64: base64String });
        }).catch(err => {
          log.error(err);
        });
      } else {
        document.getTemplateFilePath(name).then(filePath => {
          return common.getAssetsFolder().then(assetsFolderPath => {
            return res.sendFile(filePath, { root: assetsFolderPath }, (err): any => {
              if (err) {
                log.error(err);

                return res.status(err.status).end();
              }
            });
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
