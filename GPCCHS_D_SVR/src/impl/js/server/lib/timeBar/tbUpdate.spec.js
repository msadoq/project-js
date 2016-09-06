const expect = require('chai').expect;
const should = require('chai').should;
const tbUpdate = require('../../lib/timeBar/tbUpdate');

// input data
let tbRef = require('../../lib/schemaManager/examples/TB.example');

const tb1 = JSON.parse(JSON.stringify(tbRef));

let cmdList;
/* eslint-disable no-unused-expressions */
describe('Timebar update', () => {
  it('No update', () => {
    expect(tbUpdate(tbRef, tbRef)).to.be.undefined;
  });
  it('visuWindow parameter update', () => {
    // tb1 update
    tb1.data.visuWindow.current += -1000;
    tb1.data.visuWindow.lower += 2000;
    tb1.data.visuWindow.upper += 3000;
    tb1.data.slideWindow.lower += 4000;
    tb1.data.slideWindow.upper += 5000;
    tb1.data.extUpperBound += 6000;
    // get updates
    cmdList = tbUpdate(tbRef,tb1);
    // check updates
    cmdList.should.be.an('object');
    cmdList.should.have.property('visuWindowUpdate');
    cmdList.visuWindowUpdate.should.have.all.keys(
      ['lower', 'upper', 'current', 'slideWindow', 'extUpperBound']
    );
    cmdList.visuWindowUpdate.current.should.equal(tb1.data.visuWindow.current);
    cmdList.visuWindowUpdate.lower.should.equal(tb1.data.visuWindow.lower);
    cmdList.visuWindowUpdate.upper.should.equal(tb1.data.visuWindow.upper);
    cmdList.visuWindowUpdate.extUpperBound.should.equal(tb1.data.extUpperBound);
    cmdList.visuWindowUpdate.slideWindow.should.be.an('object').with.all.keys(['lower', 'upper']);
    cmdList.visuWindowUpdate.slideWindow.lower.should.equal(tb1.data.slideWindow.lower);
    cmdList.visuWindowUpdate.slideWindow.upper.should.equal(tb1.data.slideWindow.upper);
    // tbRef update
    tbRef = JSON.parse(JSON.stringify(tb1));
  });
  it('timeline parameter update', () => {
    // tb1 update
    tb1.data.timeLines[0].name = 'newTb1';
    tb1.data.timeLines[0].offset = 2000;
    tb1.data.timeLines[1].offset = 1000;
    tb1.data.masterId = '5';
    tb1.data.offsetFromUTC = 100;
    // console.log('\n\ntb1: ',tb1);
    // get updates
    cmdList = tbUpdate(tbRef, tb1);
    // check updates
    const id0 = tb1.data.timeLines[0].id ;
    const id1 = tb1.data.timeLines[1].id ;
    cmdList.should.be.an('object').with.property('timelineUpdate');
    cmdList.timelineUpdate.should.have.all.keys(['timeLines', 'masterId', 'offsetFromUTC']);
    cmdList.timelineUpdate.timeLines.should.be.an('object').with.all.keys([id0, id1]);
    cmdList.timelineUpdate.timeLines[id0].should.have.all.keys(['offset', 'name']);
    cmdList.timelineUpdate.timeLines[id1].should.have.all.keys(['offset']);
    cmdList.timelineUpdate.timeLines[id0].name.should.equal('newTb1');
    cmdList.timelineUpdate.timeLines[id0].offset.should.equal(2000);
    cmdList.timelineUpdate.timeLines[id1].offset.should.equal(1000);
    cmdList.timelineUpdate.masterId.should.equal('5');
    cmdList.timelineUpdate.offsetFromUTC.should.equal(100);
    // tbRef update
    tbRef = JSON.parse(JSON.stringify(tb1));
  });
  it('timeline addition', () => {
    // tb1 update
    const nb = Math.floor(Math.random() * 100);
    const tlName = 'Session ' + nb.toString();
    const newTl = {
      id: nb,
      name: tlName,
      offset: 0,
      kind: 'Session',
      sessionId: nb
    };
    tb1.data.timeLines.unshift(newTl);
    const newTl2 = JSON.parse(JSON.stringify(newTl));
    newTl2.id = nb + 1;
    tb1.data.timeLines.push(newTl2);
    // get updates
    cmdList = tbUpdate(tbRef, tb1);
    // check updates
    cmdList.should.be.an('object').with.property('timelineAdded');
    cmdList.timelineAdded.should.be.an('array').with.lengthOf(2);
    cmdList.timelineAdded[0].should.deep.equal(newTl);
    cmdList.timelineAdded[1].should.deep.equal(newTl2);
    // tbRef update
    tbRef = JSON.parse(JSON.stringify(tb1));
  });
  it('timeline deletion', () => {
    // tb1 update
    const tl1 = tb1.data.timeLines.splice(0,1);
    const tl2 = tb1.data.timeLines.splice(tb1.data.timeLines.length-1,1);
    // get updates
    cmdList = tbUpdate(tbRef, tb1);
    // check updates
    cmdList.should.be.an('object').with.property('timelineRemoved');
    cmdList.timelineRemoved.should.be.an('array').with.lengthOf(2);
    cmdList.timelineRemoved[0].should.deep.equal(tl1[0]);
    cmdList.timelineRemoved[1].should.deep.equal(tl2[0]);
    // tbRef update
    tbRef = JSON.parse(JSON.stringify(tb1));
  });
  it('other simple parameters update', () => {
    // tb1 update
    tb1.data.mode = 'Extended';
    tb1.data.playingState = 'replay';
    tb1.data.speed = 5;
    tb1.data.timeSpec = 'UTC';
    // get updates
    cmdList = tbUpdate(tbRef, tb1);
    // check updates
    cmdList.should.be.an('object').with.all.keys(
      ['modeUpdate', 'playingStateUpdate', 'speedUpdate', 'timeSpecUpdate']);
    cmdList.modeUpdate.should.equal('Extended');
    cmdList.playingStateUpdate.should.equal('replay');
    cmdList.speedUpdate.should.equal(5);
    cmdList.timeSpecUpdate.should.equal('UTC');
    // tbRef update
    tbRef = JSON.parse(JSON.stringify(tb1));
  });
  it('action = initialUpd', () => {
    // tb1 update
    tb1.data.action = 'initialUpd';
    // get updates
    cmdList = tbUpdate(tbRef, tb1);
    // check updates
    expect(cmdList).to.be.undefined;
  });
  it('action = tbSaving', () => {
    // tb1 update
    tb1.data.action = 'tbSaving';
    // get updates
    cmdList = tbUpdate(tbRef, tb1);
    // check updates
    expect(cmdList).to.be.undefined;
  });
});
