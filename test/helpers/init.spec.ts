import 'reflect-metadata';

import * as dotenv from 'dotenv';

import * as express from 'express';
import { ReflectiveInjector } from 'injection-js';
import { Logger } from 'ts-log-debug';

import { DocumentRouter } from '../../src/api/document.api';
import { DatabaseRouter } from '../../src/api/database.api';
import { AppMain } from '../../src/app/app.main';
import { ConfigurationService } from '../../src/services/configuration.service';
import { DocumentService } from '../../src/services/document.service';
import { CommonService } from '../../src/services/common.service';
import { StatusRouter } from '../../src/api/status.api';
import { ConfigurationRouter } from '../../src/api/config.api';
import { LDAPService } from '../../src/services/ldap.service';

dotenv.config();

const app = express();

const log = new Logger('FormBoxApi');

log.appenders
  .set('stdout', {
    levels: [ 'debug', 'info', 'trace' ],
    type: 'stdout'
  })
  .set('stderr', {
    layout: {
      pattern: '%d %p %c %X{user} %m%n',
      type: 'pattern'
    },
    levels: [ 'fatal', 'error', 'warn' ],
    type: 'stderr'
  });

log.debug(__dirname);

// Hier müssen alle Klassen eingetragen werden,
// die injiziert werden sollen.
export const injector = ReflectiveInjector.resolveAndCreate([
  AppMain,
  ConfigurationService,
  DocumentService,
  CommonService,
  LDAPService,
  { provide: 'Logger', useValue: log },
  { provide: 'Application', useValue: app },
  { provide: 'DatabaseApi', useFactory: DatabaseRouter, deps: [ 'Logger', LDAPService ] },
  { provide: 'ConfigurationApi', useFactory: ConfigurationRouter, deps: [ 'Logger', ConfigurationService ] },
  { provide: 'DocumentApi', useFactory: DocumentRouter, deps: [ 'Logger', CommonService, DocumentService ] },
  { provide: 'StatusApi', useFactory: StatusRouter, deps: [ 'Logger' ] }
]);
