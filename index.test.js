const expect = require('expect');
const request = require('supertest');

const { app } = require('./index');

describe('GET /api/timestamp/:date_string', () => {
    it('should return timestamp for 15 Dec 2015', (done) => {
        request(app)
            .get('/api/timestamp/1450137600000')
            .expect(200)
            .expect((res) => {
                // {"unix":1450137600000,"utc":"Tue, 15 Dec 2015 00:00:00 GMT"}
                expect(res.body.unix).toBe(1450137600000);
                expect(res.body.utc).toBe('Tue, 15 Dec 2015 00:00:00 GMT');
            })
            .end(done);
    });
    
    it('should return timestamp for 15 Dec 2015', (done) => {
        request(app)
            .get('/api/timestamp/2015-12-25')
            .expect(200)
            .expect((res) => {
                // {"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
                expect(res.body.unix).toBe(1451001600000);
                expect(res.body.utc).toBe('Fri, 25 Dec 2015 00:00:00 GMT');
            })
            .end(done);
    });
    
    it('should return current date', (done) => {
        request(app)
            .get('/api/timestamp/')
            .expect(200)
            .expect((res) => {
                let today = new Date();
                let resDate = new Date(parseInt(res.body.unix));

                expect(resDate.toDateString()).toBe(today.toDateString());
            })
            .end(done);
    });

    it('should return an error indicating an invalid date', (done) => {
        request(app)
            .get('/api/timestamp/not_a_valid_date')
            .expect(200)
            .expect((res) => {
                expect(res.body.error).toBe("Invalid Date");
            })
            .end(done);

    });
});
