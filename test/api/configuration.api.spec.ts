import * as request from 'supertest';
import { AppMain } from '../../src/app/app.main';
import { injector } from '../helpers/init.spec';

describe("Configuration API", function () {
    let appMain = injector.get(AppMain).app;
    let statusConfigFragmente = 0;
    let statusConfigVorlagen = 0;

    beforeAll(function (done) {
        request(appMain)
            .get("/config/fragmente")
            .end(function (error, response) {
                statusConfigFragmente = response.status;
                done();
            });

        request(appMain)
            .get("/config/vorlagen")
            .end(function (error, response) {
                statusConfigVorlagen = response.status;
                done();
            });
    });

    it("GET /config/fragmente expects status code 200", function () {
        expect(statusConfigFragmente).toBe(200);
    });

    it("GET /config/vorlagen expects status code 200", function () {
        expect(statusConfigVorlagen).toBe(200);
    });
});