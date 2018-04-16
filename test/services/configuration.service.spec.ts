import { ConfigurationService } from '../../src/services/configuration.service';
import { injector } from '../helpers/init.spec';

describe('ConfigurationService', () => {
  const config: ConfigurationService = injector.get(ConfigurationService);

  it('getFragments(): Promise<any> expects fragment list', done => {
    config.getFragments().then(result => {
      expect(result).toEqual(jasmine.objectContaining({ test: 'fragmente/test.docx' }));
      done();
    });
  });

  it('getTemplates(): Promise<any> expects template list', done => {
    config.getTemplates().then(result => {
      expect(result).toEqual(jasmine.objectContaining({ test: 'vorlagen/test.docx' }));
      done();
    });
  });

  it('getFragmentFilePath(name: string) valid parameter, expect relative file path', () => {
    const result = config.getFragmentFilePath('test');
    expect(result).toBe('fragmente/test.docx');
  });

  it('getTemplateFilePath(name: string) valid parameter, expect relative file path', () => {
    const result = config.getTemplateFilePath('test');
    expect(result).toBe('vorlagen/test.docx');
  });

  it('getLDAP()', () => {
    expect(config.getLDAP('config').url).toBe('ldap://formbox-ldap-test.de');
    expect(config.getLDAP('attributes')).toContain('givenName');
    expect(config.getLDAP('mapping').Vorname).toBe('givenName');
  });
});
