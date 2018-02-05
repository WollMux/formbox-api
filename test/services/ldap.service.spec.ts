import { LDAPService } from '../../src/services/ldap.service';
import { injector } from '../helpers/init.spec';

describe('LDAPService', () => {
  const ldap = injector.get(LDAPService);
  const ldapResult = [{givenName: 'Max', sn: 'Mustermann', uid: 'm.m'}];
  const transResult = [{Vorname: 'Max', Nachname: 'Mustermann', uid: 'm.m'}];
  let result: any;

  beforeAll(done => {
    spyOn(ldap.ldap, 'search').and.returnValue(Promise.resolve(ldapResult));
    ldap.search({uid: 'm.m'}).then((res, rej) => {
        result = res;
        done();
    });
  });

  it('search', () => {
    expect(result.length).toBe(1);
    expect(result).toEqual(transResult);
  });

  it('buildFilter', () => {
    expect(ldap.buildFilter({uid: 'm.m'})).toBe('(&(uid=*m.m*))');
    expect(ldap.buildFilter({vorname: 'Max', nachname: 'Mustermann', ou: 'test'})).toBe('(&(givenName=*Max*)(sn=*Mustermann*)(ou=*test*))');
  })
});
