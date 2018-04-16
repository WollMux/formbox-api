import 'reflect-metadata';

import * as dotenv from 'dotenv';

import * as express from 'express';
import { ReflectiveInjector } from 'injection-js';
import { Logger } from 'ts-log-debug';

import { DocumentRouter } from '../../src/api/document.api';
import { DatabaseRouter } from '../../src/api/database.api';
import { FormboxBarRouter } from '../../src/api/formboxbar.api';
import { AppMain } from '../../src/app/app.main';
import { ConfigurationService } from '../../src/services/configuration.service';
import { CommonService } from '../../src/services/common.service';
import { StatusRouter } from '../../src/api/status.api';
import { LDAPService } from '../../src/services/ldap.service';
import * as path from 'path';

dotenv.config();

const app = express();

const log = new Logger('FormBoxApi');

log.appenders
  .set('stdout', {
    levels: ['debug', 'info', 'trace'],
    type: 'stdout'
  })
  .set('stderr', {
    layout: {
      pattern: '%d %p %c %X{user} %m%n',
      type: 'pattern'
    },
    levels: ['fatal', 'error', 'warn'],
    type: 'stderr'
  });

process.env.CONFIG = path.join(__dirname, '../config');

// Hier müssen alle Klassen eingetragen werden,
// die injiziert werden sollen.
export const injector = ReflectiveInjector.resolveAndCreate([
  AppMain,
  ConfigurationService,
  CommonService,
  LDAPService,
  { provide: 'Logger', useValue: log },
  { provide: 'Application', useValue: app },
  { provide: 'DatabaseApi', useFactory: DatabaseRouter, deps: ['Logger', LDAPService] },
  { provide: 'DocumentApi', useFactory: DocumentRouter, deps: ['Logger', CommonService, ConfigurationService] },
  { provide: 'FormboxBarApi', useFactory: FormboxBarRouter, deps: [ 'Logger', ConfigurationService ] },
  { provide: 'StatusApi', useFactory: StatusRouter, deps: ['Logger'] }
]);
