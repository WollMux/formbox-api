import { Injectable } from "injection-js";
import * as express from "express";
import * as bodyParser from "body-parser";

@Injectable()
export class AppMain {
  private app: express.Application;

  constructor() {
    console.log("AppMain init.");
    this.app = express();

    this.app.set("port", 4201);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.listen(this.app.get("port"), () => {
      console.log(("App is running at http://localhost:%d."), this.app.get("port"));
    });
  }
}

