import * as request from 'supertest';
import { AppMain } from '../../src/app/app.main';
import { injector } from '../helpers/init.spec';
import {DocumentRouter} from '../../src/api/document.api';

let resCount = 0;

const requestFinished = (done) => {
  resCount++;

  if (resCount == 6) {
    done();
  }
}

describe("Document API", () => {
  let appMain = injector.get(AppMain).app;
  let statusConfigFragmenteWithNameBase64True = 0;
  let statusConfigFragmenteWithNameBase64False = 0;
  let statusConfigVorlagenWithNameBase64True = 0;
  let statusConfigVorlagenWithNameBase64False = 0;
  let statusConfigFragmente = 0;
  let statusConfigVorlagen = 0;

  beforeAll(done => {
    let resCount = 0;

    request(appMain).get("/document/fragmente").end((error, response) => {
      statusConfigFragmente = response.status;
      requestFinished(done);
    });

    request(appMain).get("/document/vorlagen").end((error, response) => {
      statusConfigVorlagen = response.status;
      requestFinished(done);
    });

    request(appMain).get("/document/fragmente/test?base64=true").end((error, response) => {
      statusConfigFragmenteWithNameBase64True = response.status;
      requestFinished(done);
    });

    request(appMain).get('/document/fragmente/test?base64=false').end((err, response) => {
      statusConfigFragmenteWithNameBase64False = response.status;
      requestFinished(done);
    });

    request(appMain).get("/document/vorlagen/test?base64=true").end((error, response) => {
      statusConfigVorlagenWithNameBase64True = response.status;
      requestFinished(done);
    });

    request(appMain).get("/document/vorlagen/test?base64=false").end((error, response) => {
      statusConfigVorlagenWithNameBase64False = response.status;
      requestFinished(done);
    });
  });

  it("GET /config/fragmente expects status code 200", () => {
    expect(statusConfigFragmente).toBe(200);
  });

  it("GET /config/vorlagen expects status code 200", () => {
    expect(statusConfigVorlagen).toBe(200);
  });

  it("GET /document/fragmente?name=test&base64=true expect status code 200", () => {
    expect(statusConfigFragmenteWithNameBase64True).toBe(200);
  });

  it("GET /document/fragmente?name=test&base64=false expects status code 200", () => {
    expect(statusConfigFragmenteWithNameBase64False).toBe(200);
  });

  it("GET /document/vorlagen?name=test&base64=true expect status code 200", () => {
    expect(statusConfigVorlagenWithNameBase64True).toBe(200);
  });

  it("GET /document/vorlagen?name=test&base64=false expect status code 200", () => {
    expect(statusConfigVorlagenWithNameBase64False).toBe(200);
  });
});
