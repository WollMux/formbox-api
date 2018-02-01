import * as express from 'express';
import { Router } from 'express-serve-static-core';
import { Logger } from 'ts-log-debug';
import * as asyncHandler from 'express-async-handler';
import { LDAPService } from '../services/ldap.service';
import { isNullOrUndefined } from 'util';

export function DatabaseRouter(log: Logger, ldap: LDAPService): Router {
  log.debug('Initialisiere Database API.');
  const api = express.Router();

  api.get('/ldap', asyncHandler(async (req, res, next) => {
    try {
      if (isNullOrUndefined(req.query.uid) && isNullOrUndefined(req.query.nachname) &&
          isNullOrUndefined(req.query.vorname) && isNullOrUndefined(req.query.ou)) {
        res.json([]);
      }

      const ans = await ldap.search(req.query);
      res.json(ans);
    } catch (err) {
      log.error(err);
      next(err);
    }
  }));

  return api;
}
