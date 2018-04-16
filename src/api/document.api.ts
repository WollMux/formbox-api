import * as express from 'express';
import { Router } from 'express-serve-static-core';
import { Logger } from 'ts-log-debug';
import * as asyncHandler from 'express-async-handler';
import { isNullOrUndefined } from 'util';
import { CommonService } from '../services/common.service';
import { ConfigurationService } from '../services/configuration.service';

export function DocumentRouter(
  log: Logger,
  common: CommonService,
  config: ConfigurationService): Router {
  log.debug('Initialisiere Document API.');
  const api = express.Router();

  api.get('/fragmente', asyncHandler(async (req, res, next) => {
    try {
      return res.json(Object.keys(config.getFragments()));
    } catch (err) {
      log.error(err);
      next(err);
    }
  }));

  api.get('/vorlagen', asyncHandler(async (req, res, next) => {
    try {
      res.json(Object.keys(config.getTemplates()));
    } catch (err) {
      log.error(err);
      next(err);
    }
  }));

  api.get('/fragmente/:name', asyncHandler(async (req, res, next) => {
    try {
      const name = req.params.name;
      const p = `${common.getAssetsFolder()}/${config.getFragmentFilePath(name)}`;

      return res.json(p);
    } catch (err) {
      log.error(err);
      next(err);
    }

  }));

  api.get('/vorlagen/:name', asyncHandler(async (req, res, next) => {
    try {
      const name = req.params.name;
      const p = `${common.getAssetsFolder()}/${config.getTemplateFilePath(name)}`;

      return res.json(p);
    } catch (err) {
      log.error(err);
      next(err);
    }
  }));

  return api;
}
