const {
  request,
  expressApp,
} = require('../utils/test');

describe('routes', () => {
  describe('API 404', () => {
    it('not found', (done) => {
      request(expressApp)
        .post('/subscriptions')
        .set('Content-Type', 'application/vnd.api+json')
        .set('Accept', 'application/vnd.api+json')
        .send(JSON.stringify({}))
        .expect('Content-Type', /json/)
        .expect(res => {
          const body = res.body;
          body.should.be.an('object').that.not.have.property('data');
          body.should.have.a.property('errors')
            .that.is.an('array')
            .and.have.lengthOf(1);
          body.errors[0].should.be.an('object').that.has.properties({
            status: 404,
            title: 'Not Found',
          });
        })
        .expect(404, done);
    });
  });
});
