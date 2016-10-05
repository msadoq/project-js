require('../lib/utils/test');
const timebarUpdate = require('./onTimebarUpdate');
const { getTimebars } = require('../lib/timebars/index');

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
    getTimebars().should.deep.equal({});
    timebarUpdate(payload);
    getTimebars().should.have.an.property('timebars')
      .that.is.an('object')
      .that.have.an.property('tb1')
      .that.have.an.property('timelines')
      .that.is.an('array');
    getTimebars().should.have.an.property('timelines')
      .that.is.an('object')
      .that.have.properties({ tl1: {}, tl2: {} });
  });
});
