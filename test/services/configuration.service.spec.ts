import { ConfigurationService } from '../../src/services/configuration.service';
import { injector } from '../helpers/init.spec';

describe('ConfigurationService', () => {
  const config: ConfigurationService = injector.get(ConfigurationService);

  it('getFragments() expects fragment list', () => {
    expect(config.getFragments()).toEqual(jasmine.objectContaining({ test: 'fragmente/test.docx' }));
  });

  it('getTemplates() expects template list', () => {
    expect(config.getTemplates()).toEqual(jasmine.objectContaining({ test: 'vorlagen/test.docx' }));
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

  it('getFormboxBar()', () => {
    expect(config.getFormboxBar().length).toBe(2);
  });
});
