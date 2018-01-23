import 'reflect-metadata';

import * as dotenv from 'dotenv';

import * as express from 'express';
import { ReflectiveInjector } from 'injection-js';
import { Logger } from 'ts-log-debug';

import { ConfigurationRouter } from './api/configuration.api';
import { DatabaseRouter } from './api/database.api';
import { AppMain } from './app/app.main';
import { ConfigurationService } from './services/configuration.service';
import { CommonService } from './services/common.service';

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
const injector = ReflectiveInjector.resolveAndCreate([
  AppMain,
  ConfigurationService,
  CommonService,
  { provide: 'Logger', useValue: log },
  { provide: 'Application', useValue: app },
  { provide: 'DatabaseApi', useFactory: DatabaseRouter, deps: [ 'Logger' ] },
  { provide: 'ConfigurationApi', useFactory: ConfigurationRouter, deps: [ 'Logger', ConfigurationService ] }
]);

// Startet die Anwendung über Dependency Injection.
injector.get(AppMain);
