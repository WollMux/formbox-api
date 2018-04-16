// tslint:disable-next-line:no-implicit-dependencies
import * as request from 'supertest';
import { AppMain } from '../../src/app/app.main';
import { injector } from '../helpers/init.spec';
import { LDAPService } from '../../src/services/ldap.service';

let resCount = 0;

const requestFinished = done => {
  resCount++;

  if (resCount === 2) {
    done();
  }
};

describe('Database API', () => {
  const appMain = injector.get(AppMain).app;
  const ldap = injector.get(LDAPService);
  let ldapResponse;

  beforeAll(done => {
    spyOn(ldap, 'search');

    request(appMain).get('/db/ldap').end((error, response) => {
      ldapResponse = response.body;
      requestFinished(done);
    });

    request(appMain).get('/db/ldap?uid=max.mustermann').end((error, response) => {
      requestFinished(done);
    });
  });

  it('GET /db/ldap', () => {
    expect(ldapResponse).toEqual([]);
  });

  it('GET /db/ldap?uid=max.mustermann', () => {
    expect(ldap.search).toHaveBeenCalledWith({uid: 'max.mustermann'});
  });
});
