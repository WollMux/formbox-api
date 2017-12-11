import { ConfigurationService } from '../../src/services/configuration.service';

describe('ConfigurationService', () => {
    const config = new ConfigurationService();

    it('getFragment()', () => {
        expect(config.getFragment('test')).toBe('assets/fragmente/test.odt');
    });
});
