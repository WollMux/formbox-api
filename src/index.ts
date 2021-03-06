import 'reflect-metadata';

import * as dotenv from 'dotenv';

import * as express from 'express';
import { ReflectiveInjector } from 'injection-js';
import { Logger } from 'ts-log-debug';

import { DocumentRouter } from './api/document.api';
import { DatabaseRouter } from './api/database.api';
import { FormboxBarRouter } from './api/formboxbar.api';
import { AppMain } from './app/app.main';
import { ConfigurationService } from './services/configuration.service';
import { CommonService } from './services/common.service';
import { StatusRouter } from './api/status.api';
import { LDAPService } from './services/ldap.service';

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

log.debug(__dirname);

// Hier müssen alle Klassen eingetragen werden,
// die injiziert werden sollen.
const injector = ReflectiveInjector.resolveAndCreate([
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

// Startet die Anwendung über Dependency Injection.
injector.get(AppMain);
