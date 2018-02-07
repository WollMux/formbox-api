import * as request from 'supertest';
import { AppMain } from '../../src/app/app.main';
import { injector } from '../helpers/init.spec';
import {DocumentRouter} from '../../src/api/document.api';

describe("Document API", function () {
    let appMain = injector.get(AppMain).app;
    let statusConfigFragmenteWithNameBase64True = 0;
    let statusConfigFragmenteWithNameBase64False = 0;
    let statusConfigVorlagenWithNameBase64True = 0;
    let statusConfigVorlagenWithNameBase64False = 0;

    beforeAll(function (done) {
        let resCount = 0;

        request(appMain)
            .get("/document/fragmente?name=test&base64=true")
            .end(function (error, response) {
                statusConfigFragmenteWithNameBase64True = response.status;
                resCount++;

                if(resCount == 4){
                    done();
                }
            });

        request(appMain)
            .get('/document/fragmente?name=test&base64=false')
            .end(function (err, response) {
                statusConfigFragmenteWithNameBase64False = response.status;
                resCount++;

                if(resCount == 4){
                    done();
                }
            });

        request(appMain)
            .get("/document/vorlagen?name=test&base64=true")
            .end(function (error, response) {
                statusConfigVorlagenWithNameBase64True = response.status;
                resCount++;

                if(resCount == 4){
                    done();
                }
            });

        request(appMain)
            .get("/document/vorlagen?name=test&base64=false")
            .end(function (error, response) {
                statusConfigVorlagenWithNameBase64False = response.status;
                resCount++;

                if(resCount == 4){
                    done();
                }
            });
    });

    it("GET /document/fragmente?name=test&base64=true expect status code 200", function () {
        expect(statusConfigFragmenteWithNameBase64True).toBe(200);
    });

    it("GET /document/fragmente?name=test&base64=false expects status code 200", function () {
        expect(statusConfigFragmenteWithNameBase64False).toBe(200);
    });

    it("GET /document/vorlagen?name=test&base64=true expect status code 200", function () {
        expect(statusConfigVorlagenWithNameBase64True).toBe(200);
    });

    it("GET /document/vorlagen?name=test&base64=false expect status code 200", function () {
        expect(statusConfigVorlagenWithNameBase64False).toBe(200);
    });
});