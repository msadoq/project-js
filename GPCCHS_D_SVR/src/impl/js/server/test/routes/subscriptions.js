const debug = require('../../lib/io/debug')('test:routes:subscriptions');
const {
  chai,
  request,
  expressApp,
} = require('../utils');


/*
* Define API subscriptions tests - Status 400 ("bad request") for each param required aad optionals
* Define API subscriptions test - Status 200 ("ok")for each param in Json
* >>>> Status 404 ("not found") isn't a part of this file : see '404.js' because it's a generic test
*
*-----------------------------------
* PARAMS REQUIRED for subscriptions:
*
* - dataFullName (str)
* - domainId (int)
* - timeLineType (str => enum {'session : sessionID', 'recorset || dataset : setFileName'})
* - subscriptionState (str => enum {'Play : play', 'Pause: pause'})
* - visuWindow (obj) => lower /upper
*-----------------------------------
*
*-----------------------------------
* PARAMS OPTIONAL for subscriptions:
*
* - field (str)
* - visuSpeed (int)
* *-----------------------------------
*/


/*
 * test WORKS + Json
*/
describe('POST API subscriptions', () => {

  it('works', (done) => {
    request(expressApp) 
      .post('/api/subscriptions')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Accept', 'application/vnd.api+json')
      .send({
        dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
        field: 'rawValue',
        domainId: 0,
        timeLineType: 'session',
        sessionId: 1,
        setFileName: '',
        subscriptionState: 'play',
        visuSpeed: 0,
        visuWindow: {
         lower: 0,
         upper: 42,
        },
        filter: [
          {
            dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
            field: 'rawValue',
            operator: 'OP_GT',
            value: 25,
          }, {
            dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
            field: 'rawValue',
            operator: 'OP_LT',
            value: 75,
          },
        ],
      })
      .expect('Content-Type', /json/)
      .expect(res => {
        const body = res.body;
        body.should.be.an('object').and.have.property('subscriptionId', 1);
      })
      .expect(200, done);
  });


/*
* test without dataFullName param
*/
  it('without dataFullName', (done) => {
    request(expressApp)
      .post('/api/subscriptions')
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
          status: 400,
          title: 'dataFullName parameter required',
          source: {
            pointer: '/body/dataFullName',
          },
        });
      })
      .expect(400, done);
  });


/*
 * test without domainId param
*/

it('without domainId', (done) => {
    request(expressApp)
      .post('/api/subscriptions')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Accept', 'application/vnd.api+json')
      .send({dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>'
       ,field: 'rawValue'
      })
      .expect('Content-Type', /json/)
      .expect(res => {
        const body = res.body;
        body.should.be.an('object').that.not.have.property('data');
        body.should.have.a.property('errors')
          .that.is.an('array')
          .and.have.lengthOf(1);
        body.errors[0].should.be.an('object').that.has.properties({
          status: 400,
          title: 'domainId parameter required',
          source: {
            pointer: '/body/domainId',
          },
        });
      })
      .expect(400, done);
  });



/*
* test without timeLineType param
*/

it('without timeLineType', (done) => {
    request(expressApp)
      .post('/api/subscriptions')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Accept', 'application/vnd.api+json')
      .send({dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
       field: 'rawValue',
       domainId: 0 })
      .expect('Content-Type', /json/)
      .expect(res => {
        const body = res.body;
        body.should.be.an('object').that.not.have.property('data');
        body.should.have.a.property('errors')
          .that.is.an('array')
          .and.have.lengthOf(1);
        body.errors[0].should.be.an('object').that.has.properties({
          status: 400,
          title: 'timeLineType parameter required',
          source: {
            pointer: '/body/timeLineType',
          },
        });
      })
      .expect(400, done);
     });
     
 /*
* test sessionId undefined 
*/

it('sessionId undefined', (done) => {
    request(expressApp)
      .post('/api/subscriptions')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Accept', 'application/vnd.api+json')
      .send({dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
       field: 'rawValue',
       domainId: 0,
       timeLineType: 'session',
       setFileName: '',
        subscriptionState: 'play',
        visuSpeed: 0,
        visuWindow: {
         lower: 0,
         upper: 42,
        },
       })
      .expect('Content-Type', /json/)
      .expect(res => {
        const body = res.body;
        body.should.be.an('object').that.not.have.property('data');
        body.should.have.a.property('errors')
          .that.is.an('array')
          .and.have.lengthOf(1);
        body.errors[0].should.be.an('object').that.has.properties({
          status: 400,
          title: 'sessionId parameter required',
          source: {
            pointer: '/body/sessionId',
          },
        });
      })
      .expect(400, done);
     });

/*
* test invalid timeLineType
*/

it('invalid timeLineType', (done) => {
    request(expressApp)
      .post('/api/subscriptions')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Accept', 'application/vnd.api+json')
      .send({dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
       field: 'rawValue',
       domainId: 0,
       timeLineType: 'tintin',
       sessionId: 1,
       setFileName: '',
       subscriptionState: 'play',
       })
      .expect('Content-Type', /json/)
      .expect(res => {
        const body = res.body;
        body.should.be.an('object').that.not.have.property('data');
        body.should.have.a.property('errors')
          .that.is.an('array')
          .and.have.lengthOf(1);
        body.errors[0].should.be.an('object').that.has.properties({
          status: 400,
          title: 'timeLineType should not have this value',
          source: {
            pointer: '/body/timeLineType',
          },
        });
      })
      .expect(400, done);
     });



/*
* test without setFileName param for dataset or recordset
*/

it('without setFileName', (done) => {
    request(expressApp)
      .post('/api/subscriptions')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Accept', 'application/vnd.api+json')
      .send({dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
       field: 'rawValue',
       domainId: 0 ,  
       timeLineType: 'recordSet',
       sessionId: 1,     
      })
      .expect('Content-Type', /json/)
      .expect(res => {
        const body = res.body;
        body.should.be.an('object').that.not.have.property('data');
        body.should.have.a.property('errors')
          .that.is.an('array')
          .and.have.lengthOf(1);
        body.errors[0].should.be.an('object').that.has.properties({
          status: 400,
          title: 'setFileName parameter required',
          source: {
            pointer: '/body/setFileName',
          },
        });
      })
      .expect(400, done);
     });

/*
* test without subscriptionState param
*/

it('without subscriptionState', (done) => {
    request(expressApp)
      .post('/api/subscriptions')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Accept', 'application/vnd.api+json')
      .send({dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
       field: 'rawValue',
       domainId: 0,
       timeLineType: 'session',
       sessionId: 1,
       setFileName: ''})
      .expect('Content-Type', /json/)
      .expect(res => {
        const body = res.body;
        body.should.be.an('object').that.not.have.property('data');
        body.should.have.a.property('errors')
          .that.is.an('array')
          .and.have.lengthOf(1);
        body.errors[0].should.be.an('object').that.has.properties({
          status: 400,
          title: 'subscriptionState parameter required',
          source: {
            pointer: '/body/subscriptionState',
          },
        });
      })
      .expect(400, done);
     });

/*
* test with another subscriptionState param
*/

it('with another subscriptionState param', (done) => {
    request(expressApp)
      .post('/api/subscriptions')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Accept', 'application/vnd.api+json')
      .send({dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
       field: 'rawValue',
       domainId: 0,
       timeLineType: 'session',
       sessionId: 1,
       setFileName: '',
       subscriptionState: 'tintin'
      })
      .expect('Content-Type', /json/)
      .expect(res => {
        const body = res.body;
        body.should.be.an('object').that.not.have.property('data');
        body.should.have.a.property('errors')
          .that.is.an('array')
          .and.have.lengthOf(1);
        body.errors[0].should.be.an('object').that.has.properties({
          status: 400,
          title: 'subscriptionState should not have this value',
          source: {
            pointer: '/body/subscriptionState',
          },
        });
      })
      .expect(400, done);
     });

 
/*
* test without visuWindow param
*/

it('without visuWindow', (done) => {
    request(expressApp)
      .post('/api/subscriptions')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Accept', 'application/vnd.api+json')
      .send({dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
       field: 'rawValue',
       domainId: 0,
       timeLineType: 'session',
       sessionId: 1,
       setFileName: '',
       subscriptionState: 'play'
       ,visuSpeed: 0
      })
      .expect('Content-Type', /json/)
      .expect(res => {
        const body = res.body;
        body.should.be.an('object').that.not.have.property('data');
        body.should.have.a.property('errors')
          .that.is.an('array')
          .and.have.lengthOf(1);
        body.errors[0].should.be.an('object').that.has.properties({
          status: 400,
          title: 'visuWindow parameter required',
          source: {
            pointer: '/body/visuWindow',
          },
        });
      })
      .expect(400, done);
     });

/*
* test missing upper visuWindow param
*/

it('missing upper visuWindow', (done) => {
    request(expressApp)
      .post('/api/subscriptions')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Accept', 'application/vnd.api+json')
      .send({dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
       field: 'rawValue',
       domainId: 0,
       timeLineType: 'session',
       sessionId: 1,
       setFileName: '',
       subscriptionState: 'play'
       ,visuSpeed: 0,
       visuWindow: {
         lower: 0,
        }
      })
      .expect('Content-Type', /json/)
      .expect(res => {
        const body = res.body;
        body.should.be.an('object').that.not.have.property('data');
        body.should.have.a.property('errors')
          .that.is.an('array')
          .and.have.lengthOf(1);
        body.errors[0].should.be.an('object').that.has.properties({
          status: 400,
          title: 'upper parameter required',
          source: {
            pointer: '/body/visuWindow/upper',
          },
        });
      })
      .expect(400, done);
     });
     
     
/*
* test missing lower visuWindow param
*/

it('missing lower visuWindow', (done) => {
    request(expressApp)
      .post('/api/subscriptions')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Accept', 'application/vnd.api+json')
      .send({dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
       field: 'rawValue',
       domainId: 0,
       timeLineType: 'session',
       sessionId: 1,
       setFileName: '',
       subscriptionState: 'play'
       ,visuSpeed: 0,
       visuWindow: {
         upper: 42,
        }
      })
      .expect('Content-Type', /json/)
      .expect(res => {
        const body = res.body;
        body.should.be.an('object').that.not.have.property('data');
        body.should.have.a.property('errors')
          .that.is.an('array')
          .and.have.lengthOf(1);
        body.errors[0].should.be.an('object').that.has.properties({
          status: 400,
          title: 'lower parameter required',
          source: {
            pointer: '/body/visuWindow/lower',
          },
        });
      })
      .expect(400, done);
     });


});