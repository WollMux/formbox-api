import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Router } from 'express-serve-static-core';
import { Inject, Injectable } from 'injection-js';
import * as path from 'path';
import { Logger } from 'ts-log-debug';

@Injectable()
export class AppMain {
  private app: express.Application;
  private log: Logger;

  private db: Router;
  private config: Router;

  constructor(@Inject('Logger') log: Logger,
              @Inject('Application') app: express.Application,
              @Inject('DatabaseApi') db: Router,
              @Inject('ConfigurationApi') config: Router) {

    this.db = db;
    this.config = config;

    this.log = log;
    this.log.debug('AppMain init.');
    this.app = app;
    this.startServer();

  }

  startServer(): void {
    this.log.debug('Starte Server.');

    this.app.set('port', process.env.PORT || 4201);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use('/db', this.db);
    this.app.use('/config', this.config);

    this.app.use('/assets/fragmente', express.static(path.join(process.env.ASSETS, '/fragmente')));
    this.app.use('/assets/vorlagen', express.static(path.join(process.env.ASSETS, '/vorlagen')));

    this.app.listen(this.app.get('port'), () => {
      this.log.info(('App is running at http://localhost:%d.'), this.app.get('port'));
    });
  }
}
