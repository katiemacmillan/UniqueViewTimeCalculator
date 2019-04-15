var request = require('supertest');
var assert = require('assert');

describe('validate loading of uvt application', function () {
    var server;
    beforeEach(function () {
        server = require('../app');
    });
    afterEach(function () {
        server.close();
    });
    it('Can reach base endpoint \'/\'', function testBaseGet(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });
    it('Test ability to reach and response from post request to \'/\' endpoint', function testBadTimeStampCharacters(done) {
        let timeStamps = {
            timeStamps: "55,60,10,20,8,12,18,26,31,40,15,20,7,28,25,39"
        };
        request(server)
            .post('/')
            .set("Content-Type", "application/json")
            .type("form")
            .send(timeStamps)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200, done)
    });
    it('400 response to bad number of timestamps', function testBadTimeStampCount(done) {
        let timeStamps = {
            timeStamps: "55,60,10,20,8,12,18,26,31,40,15,20,7,28,25"
        };
        request(server)
            .post('/')
            .set("Content-Type", "application/json")
            .type("form")
            .send(timeStamps)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(400, done);
    });
    it('400 response to timestamp list containing non numeric characters', function testBadTimeStampCharacters(done) {
        let timeStamps = {
            timeStamps: "55,6wer0,10,20,8,12,18,26,31,40,15,20,7,28,25,39"
        };
        request(server)
            .post('/')
            .set("Content-Type", "application/json")
            .type("form")
            .send(timeStamps)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(400, done)
    });
    it('400 response to timestamp list containing start timestamps larger than end timestamps', function testBadTimeStampOrdering(done) {
        let timeStamps = {
            timeStamps: "60,55,10,20,8,12,18,26,31,40,15,20,7,28,25,39"
        };
        request(server)
            .post('/')
            .set("Content-Type", "application/json")
            .type("form")
            .send(timeStamps)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(400, done)
    });
    it('404 response to bad endpoint', function testBadPath(done) {
        request(server)
            .get('/someEndPoint')
            .expect(404, done);
    });
});