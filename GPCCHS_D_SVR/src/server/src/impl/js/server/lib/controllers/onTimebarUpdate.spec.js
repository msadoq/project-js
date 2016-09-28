require('../utils/test');
const timebarUpdate = require('./onTimebarUpdate');
const { getTimebar } = require('../timebar');

describe('onTimebarUpdate', () => {
  it('update', () => {
    const payload = {
      timebars: {
        tb1: {
          timelines: ['tl1'],
        },
        tb2: {
          timelines: ['tl2'],
        },
      },
      timelines: {
        tl1: {},
        tl2: {},
      },
    };
    getTimebar().should.deep.equal({});
    timebarUpdate(payload);
    getTimebar().should.have.an.property('timebars')
      .that.is.an('object')
      .that.have.an.property('tb1')
      .that.have.an.property('timelines')
      .that.is.an('array');
    getTimebar().should.have.an.property('timelines')
      .that.is.an('object')
      .that.have.properties({ tl1: {}, tl2: {} });
  });
});
