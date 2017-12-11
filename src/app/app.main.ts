import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Logger } from 'ts-log-debug';
import { Router } from 'express-serve-static-core';
import { Inject, Injectable } from 'injection-js';
import * as path from 'path';
import * as filesystem from 'fs';
import * as https from 'https';

@Injectable()
export class AppMain {
  private log: Logger;
  private app: express.Application;
  private db: Router;
  private config: Router;

  constructor( @Inject('Logger') log: Logger,
    @Inject('Application') app: express.Application,
    @Inject('DatabaseApi') db: Router,
    @Inject('ConfigurationApi') config: Router) {

    this.db = db;
    this.config = config;
    this.app = app;
    this.log = log;
    this.log.debug('AppMain init.');

    this.configServer();
    this.startServer();
  }

  configServer(): void {
    this.app.set('port', process.env.PORT || 4201);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use('/db', this.db);
    this.app.use('/config', this.config);

    this.app.use('/assets/fragmente', express.static(path.join(process.env.ASSETS, '/fragmente')));
    this.app.use('/assets/vorlagen', express.static(path.join(process.env.ASSETS, '/vorlagen')));
  }

  startServer(): void {
    this.log.debug('Starte Server.');
    const privateKey = filesystem.readFileSync(process.env.CERT_KEY_PATH, 'utf8');
    const certificate = filesystem.readFileSync(process.env.CERT_CRT_PATH, 'utf8');
    const credentials = { key: privateKey, cert: certificate };
    const httpsServer = https.createServer(credentials, this.app);
    httpsServer.listen(this.app.get('port'), () => {
      this.log.info(('App is running at https://localhost:%d.'), this.app.get('port'));
    });
  }
}
