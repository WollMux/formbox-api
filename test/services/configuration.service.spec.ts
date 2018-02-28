import { ConfigurationService } from '../../src/services/configuration.service';
import { injector } from '../helpers/init.spec';

describe('ConfigurationService', () => {
    const config = injector.get(ConfigurationService);

    it('getFragments(): Promise<any> expects fragment list', function (done) {
        config.getFragments().then(result => {
            expect(result).toEqual(jasmine.objectContaining({ test: 'fragmente/test.docx' }));
            done();
        });
    });

    it('getTemplates(): Promise<any> expects template list', function (done) {
        config.getTemplates().then(result => {
            expect(result).toEqual(jasmine.objectContaining({ test: 'vorlagen/test.docx' }));
            done();
        });
    });

    it('getLDAP()', () => {
        expect(config.getLDAP('config').url).toBe('ldap://formbox-ldap-test.de');
        expect(config.getLDAP('attributes')).toContain('givenName');
        expect(config.getLDAP('mapping').Vorname).toBe('givenName');
    })
});
