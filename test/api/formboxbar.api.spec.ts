// tslint:disable-next-line:no-implicit-dependencies
import * as request from 'supertest';
import { AppMain } from '../../src/app/app.main';
import { injector } from '../helpers/init.spec';

describe('FormboxBar API', () => {
  const appMain = injector.get(AppMain).app;
  let response;

  beforeAll(done => {

    request(appMain).get('/formboxbar').end((error, res) => {
      response = res.body;
      done();
    });

  });

  it('GET /formboxbar', () => {
    expect(response.length).toBe(2);
  });
});
