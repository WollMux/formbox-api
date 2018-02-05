import * as asyncRequest from 'request-promise-native';

var base_url = "https://" + process.env.HOST + ":" + process.env.PORT;

describe("/config", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
        asyncRequest.get(base_url + "/config", function(err, res, body) {
        }).then(result => {
            expect(result.status).toBe(200);
        })
    });
  });
});