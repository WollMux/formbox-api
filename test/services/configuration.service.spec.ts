import { ConfigurationService } from '../../src/services/configuration.service';
import { CommonService } from '../../src/services/common.service';

describe('ConfigurationService', () => {
    const commonService = new CommonService();
    const config = new ConfigurationService(commonService);

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
});
