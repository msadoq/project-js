/* eslint-disable no-unused-expressions */
const { should } = require('../utils/test');
const _ = require('lodash');
const compareTimebars = require('./tbUpdate');

let tbRef = require('./tb.fixtures.json');

const tb1 = _.cloneDeep(tbRef);

describe('Timebar update', () => {
  it('No update', () => {
    should.not.exist(compareTimebars(tbRef, tbRef));
  });
  it('visuWindow parameter update', () => {
    // tb1 update
    tb1.visuWindow.current += -1000;
    tb1.visuWindow.upper += 3000;
    tb1.slideWindow.lower += 4000;
    tb1.extUpperBound += 6000;
    // get updates
    const differences = compareTimebars(tbRef, tb1);
    // check updates
    differences.should.be.an('object');
    differences.should.have.property('visuWindowUpdate');
    differences.visuWindowUpdate.should.have.all.keys(
      ['bounds', 'current', 'slideWindow', 'extUpperBound']
    );
    differences.visuWindowUpdate.current.should.equal(tb1.visuWindow.current);
    differences.visuWindowUpdate.bounds.should.be.an('object').with.all.keys(['lower', 'upper']);
    differences.visuWindowUpdate.bounds.lower.should.equal(tbRef.visuWindow.lower);
    differences.visuWindowUpdate.bounds.upper.should.equal(tb1.visuWindow.upper);
    differences.visuWindowUpdate.extUpperBound.should.equal(tb1.extUpperBound);
    differences.visuWindowUpdate.slideWindow.should.be.an('object')
      .with.all.keys(['lower', 'upper']);
    differences.visuWindowUpdate.slideWindow.lower.should.equal(tb1.slideWindow.lower);
    differences.visuWindowUpdate.slideWindow.upper.should.equal(tbRef.slideWindow.upper);
    // tbRef update
    tbRef = JSON.parse(JSON.stringify(tb1));
  });
  it('timeline parameter update', () => {
    // tb1 update
    tb1.timelines[0].name = 'newTb1';
    tb1.timelines[0].offset = 2000;
    tb1.timelines[1].offset = 1000;
    tb1.masterId = '5';
    tb1.offsetFromUTC = 100;
    // console.log('\n\ntb1: ',tb1);
    // get updates
    const differences = compareTimebars(tbRef, tb1);
    // check updates
    const id0 = tb1.timelines[0].id;
    const id1 = tb1.timelines[1].id;
    differences.should.be.an('object').with.property('timelineUpdate');
    differences.timelineUpdate.should.have.all.keys(['timelines', 'masterId', 'offsetFromUTC']);
    differences.timelineUpdate.timelines.should.be.an('object').with.all.keys([id0, id1]);
    differences.timelineUpdate.timelines[id0].should.have.all.keys(['offset', 'name']);
    differences.timelineUpdate.timelines[id1].should.have.all.keys(['offset']);
    differences.timelineUpdate.timelines[id0].name.should.equal('newTb1');
    differences.timelineUpdate.timelines[id0].offset.should.equal(2000);
    differences.timelineUpdate.timelines[id1].offset.should.equal(1000);
    differences.timelineUpdate.masterId.should.equal('5');
    differences.timelineUpdate.offsetFromUTC.should.equal(100);
    // tbRef update
    tbRef = JSON.parse(JSON.stringify(tb1));
  });
  it('timeline addition', () => {
    // tb1 update
    const nb = Math.floor(Math.random() * 100);
    const tlName = 'Session ${nb}';
    const newTl = {
      id: nb,
      name: tlName,
      offset: 0,
      kind: 'Session',
      sessionId: nb,
    };
    tb1.timelines.unshift(newTl);
    const newTl2 = JSON.parse(JSON.stringify(newTl));
    newTl2.id = nb + 1;
    tb1.timelines.push(newTl2);
    // get updates
    const differences = compareTimebars(tbRef, tb1);
    // check updates
    differences.should.be.an('object').with.property('timelineAdded');
    differences.timelineAdded.should.be.an('array').with.lengthOf(2);
    differences.timelineAdded[0].should.deep.equal(newTl);
    differences.timelineAdded[1].should.deep.equal(newTl2);
    // tbRef update
    tbRef = JSON.parse(JSON.stringify(tb1));
  });
  it('timeline deletion', () => {
    // tb1 update
    const tl1 = tb1.timelines.splice(0, 1);
    const tl2 = tb1.timelines.splice(tb1.timelines.length - 1, 1);
    // get updates
    const differences = compareTimebars(tbRef, tb1);
    // check updates
    differences.should.be.an('object').with.property('timelineRemoved');
    differences.timelineRemoved.should.be.an('array').with.lengthOf(2);
    differences.timelineRemoved[0].should.deep.equal(tl1[0]);
    differences.timelineRemoved[1].should.deep.equal(tl2[0]);
    // tbRef update
    tbRef = JSON.parse(JSON.stringify(tb1));
  });
  it('other simple parameters update', () => {
    // tb1 update
    tb1.mode = 'Extended';
    tb1.playingState = 'replay';
    tb1.speed = 5;
    tb1.timeSpec = 'UTC';
    // get updates
    const differences = compareTimebars(tbRef, tb1);
    // check updates
    differences.should.be.an('object').with.all.keys(
      ['modeUpdate', 'playingStateUpdate', 'speedUpdate', 'timeSpecUpdate']);
    differences.modeUpdate.should.equal('Extended');
    differences.playingStateUpdate.should.equal('replay');
    differences.speedUpdate.should.equal(5);
    differences.timeSpecUpdate.should.equal('UTC');
    // tbRef update
    tbRef = JSON.parse(JSON.stringify(tb1));
  });
  it('action = initialUpd', () => {
    // tb1 update
    tb1.action = 'initialUpd';
    // get updates
    const differences = compareTimebars(tbRef, tb1);
    // check updates
    should.not.exist(differences);
  });
  it('action = tbSaving', () => {
    // tb1 update
    tb1.action = 'tbSaving';
    // get updates
    const differences = compareTimebars(tbRef, tb1);
    // check updates
    should.not.exist(differences);
  });
});
