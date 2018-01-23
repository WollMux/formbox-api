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
    this.setApiRoutes();
    this.startServer(this.readCertificates());
  }

  configServer(): void {
    this.app.set('port', process.env.PORT || 4201);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  setApiRoutes(): void {
    this.app.use('/db', this.db);
    this.app.use('/config', this.config);
  }

  setFSPathes(): void {
    this.app.use(`/${process.env.ASSETS}/fragmente`, express.static(path.join(process.env.ASSETS, '/fragmente')));
    this.app.use(`/${process.env.ASSETS}/vorlagen`, express.static(path.join(process.env.ASSETS, '/vorlagen')));
  }

  readCertificates(): https.ServerOptions {
    const serverOptions: https.ServerOptions = {
      key: filesystem.readFileSync(process.env.CERT_KEY_PATH, 'utf8'),
      cert: filesystem.readFileSync(process.env.CERT_CRT_PATH, 'utf8')
    };

    return serverOptions;
  }

  startServer(serverOptions: https.ServerOptions): void {
    this.log.debug('Starte Server.');

    const httpsServer = https.createServer(serverOptions, this.app);
    httpsServer.listen(this.app.get('port'), process.env.HOST, () => {
      this.log.info(('App is running at https://%s:%d.'), process.env.HOST, this.app.get('port'));
    });
  }
}
