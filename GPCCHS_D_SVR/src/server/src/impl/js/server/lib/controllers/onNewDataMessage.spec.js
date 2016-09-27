const debug = require('../io/debug')('controllers:onNewDataMessage.spec');
const _ = require('lodash');
require('../utils/test');
const onNewDataMessage = require('./onNewDataMessage');
const getLocalId = require('../models/getLocalId');
const {
  getDataQuery,
  getReportingParameterProtobuf,
  getNewDataMessage,
  getNewDataMessageProtobuf,
} = require('../stubs/data');
const cacheJsonModel = require('../models/cacheJson');
const connectedDataModel = require('../models/connectedData');
const viewsModel = require('../models/views');
const testView = require('../stubs/TestView');
const TestWebSocket = require('../stubs/testWebSocket');

const testWebSocket = new TestWebSocket();
testWebSocket.init();
const testSpark = testWebSocket.getSpark();
const TestView = testView.adapter;
const testViewInstance = new TestView({ spark: testSpark });

describe('onNewDataMessage', () => {
  beforeEach(() => {
    viewsModel.cleanup();
    cacheJsonModel.cleanup();
    connectedDataModel.cleanup();
    testSpark.resetMessage();
    viewsModel.addRecord('testViewId', testViewInstance);
  });

  afterEach(() => {
    viewsModel.delRecord('testViewId');
  });
  it('Archive Data (but no connected data)', () => {
    const newDataMessage = getNewDataMessage();
    const newDataMessageProto = getNewDataMessageProtobuf(newDataMessage);
    onNewDataMessage(newDataMessageProto);
    // checking Data are not in cacheJson
    const cachedData = cacheJsonModel.find();
    cachedData.should.be.an('array').and.have.lengthOf(0);
    // Check that data are not received in views
    const message = testSpark.getMessage();
    message.should.be.an('object')
      .that.has.properties({});
  });
  it('Archive Data', () => {
    const dataQuery = getDataQuery();
    connectedDataModel.addRequestedInterval(
      dataQuery.dataId,
      dataQuery.id,
      [dataQuery.interval.lowerTs.ms - 1e9, dataQuery.interval.upperTs.ms + 1e9]
    );
    const newDataMessage = getNewDataMessage({
      id: dataQuery.id,
    });
    const newDataMessageProto = getNewDataMessageProtobuf(newDataMessage);
    onNewDataMessage(newDataMessageProto);
    // checking Data are in cacheJson
    const cachedData = cacheJsonModel.find();
    cachedData.should.be.an('array').and.have.lengthOf(newDataMessage.payloads.length);
    for (let i = 0; i < cachedData.length; i++) {
      _.isEqual(
        cachedData[i].timestamp,
        newDataMessage.payloads[i].timestamp.ms
      ).should.equal(true);
      _.isEqual(
        getReportingParameterProtobuf(cachedData[i].payload),
        newDataMessage.payloads[i].payload
      ).should.equal(true);
    }
    // checking interval is still requested
    const connectedData = connectedDataModel.find();
    connectedData.should.be.an('array')
      .and.have.lengthOf(1);
    connectedData[0].should.be.an('object')
      .and.have.property('requested');
    connectedData[0].requested.should.be.an('object')
      .that.have.property(dataQuery.id)
      .that.be.an('array')
      .that.has.lengthOf(2);
    connectedData[0].requested[dataQuery.id][0].should.equal(dataQuery.interval.lowerTs.ms - 1e9);
    connectedData[0].requested[dataQuery.id][1].should.equal(dataQuery.interval.upperTs.ms + 1e9);
    connectedData[0].should.have.property('intervals');
    connectedData[0].intervals.should.be.an('array')
      .that.has.lengthOf(0);
    // Check that data are received in views
    const message = testSpark.getMessage();
    message.should.be.an('object')
      .that.has.a.property('event')
      .that.equal('newData');
    message.should.have.a.property('payload')
      .that.is.an('array');
    const payloads = message.payload;
    payloads.length.should.equal(1);
    payloads[0].should.be.an('object')
      .and.have.property('dataId')
      .that.deep.equal(newDataMessage.dataId);
    payloads[0].should.have.property('payloads')
      .that.have.lengthOf(newDataMessage.payloads.length);
    for (let i = 0; i < payloads[0].payloads.length; i++) {
      _.isEqual(
        payloads[0].payloads[i].timestamp,
        newDataMessage.payloads[i].timestamp
      ).should.equal(true);
      _.isEqual(
        getReportingParameterProtobuf(payloads[0].payloads[i].payload),
        newDataMessage.payloads[i].payload
      ).should.equal(true);
    }
  });
  it('Last Archive Data', () => {
    const dataQuery = getDataQuery();
    connectedDataModel.addRequestedInterval(
      dataQuery.dataId,
      dataQuery.id,
      [dataQuery.interval.lowerTs.ms - 1e9, dataQuery.interval.upperTs.ms + 1e9]
    );
    const newDataMessage = getNewDataMessage({
      id: dataQuery.id,
      isEndOfQuery: true,
    });
    const newDataMessageProto = getNewDataMessageProtobuf(newDataMessage);
    onNewDataMessage(newDataMessageProto);
    // checking Data are in cacheJson
    const cachedData = cacheJsonModel.find();
    cachedData.should.be.an('array').and.have.lengthOf(newDataMessage.payloads.length);
    for (let i = 0; i < cachedData.length; i++) {
      _.isEqual(
        cachedData[i].timestamp,
        newDataMessage.payloads[i].timestamp.ms
      ).should.equal(true);
      _.isEqual(
        getReportingParameterProtobuf(cachedData[i].payload),
        newDataMessage.payloads[i].payload
      ).should.equal(true);
    }
    // checking interval is still requested
    const connectedData = connectedDataModel.find();
    connectedData.should.be.an('array')
      .and.have.lengthOf(1);
    connectedData[0].should.be.an('object')
      .and.have.property('requested');
    connectedData[0].requested.should.be.an('object');
    _.keys(connectedData[0].requested).length.should.equal(0);
    connectedData[0].should.have.property('intervals');
    connectedData[0].intervals.should.be.an('array')
      .that.has.lengthOf(1);
    connectedData[0].intervals[0].should.be.an('array')
      .that.has.lengthOf(2);
    connectedData[0].intervals[0][0].should.equal(dataQuery.interval.lowerTs.ms - 1e9);
    connectedData[0].intervals[0][1].should.equal(dataQuery.interval.upperTs.ms + 1e9);
    // Check that data are received in views
    const message = testSpark.getMessage();
    message.should.be.an('object')
      .that.has.a.property('event')
      .that.equal('newData');
    message.should.have.a.property('payload')
      .that.is.an('array');
    const payloads = message.payload;
    payloads.length.should.equal(1);
    payloads[0].should.be.an('object')
      .and.have.property('dataId')
      .that.deep.equal(newDataMessage.dataId);
    payloads[0].should.have.property('payloads')
      .that.have.lengthOf(newDataMessage.payloads.length);
    for (let i = 0; i < payloads[0].payloads.length; i++) {
      _.isEqual(
        payloads[0].payloads[i].timestamp,
        newDataMessage.payloads[i].timestamp
      ).should.equal(true);
      _.isEqual(
        getReportingParameterProtobuf(payloads[0].payloads[i].payload),
        newDataMessage.payloads[i].payload
      ).should.equal(true);
    }
  });
  it('Real Time Data (but no connected data)', () => {
    const newDataMessage = getNewDataMessage({
      dataSource: 'REAL_TIME',
    });
    const newDataMessageProto = getNewDataMessageProtobuf(newDataMessage);
    onNewDataMessage(newDataMessageProto);
    // checking Data are not in cacheJson
    const cachedData = cacheJsonModel.find();
    cachedData.should.be.an('array').and.have.lengthOf(0);
    // Check that data are not received in views
    const message = testSpark.getMessage();
    message.should.be.an('object')
      .that.has.properties({});
  });
  it('Real Time Data', () => {
    const dataQuery = getDataQuery();
    connectedDataModel.addRequestedInterval(
      dataQuery.dataId,
      dataQuery.id,
      [dataQuery.interval.lowerTs.ms - 1e9, dataQuery.interval.upperTs.ms - 1e6]
    );
    const newDataMessage = getNewDataMessage({
      id: dataQuery.id,
      dataSource: 'REAL_TIME',
    });
    const newDataMessageProto = getNewDataMessageProtobuf(newDataMessage);
    onNewDataMessage(newDataMessageProto);
    // checking Data are not in cacheJson
    const cachedData = cacheJsonModel.find();
    cachedData.should.be.an('array').and.have.lengthOf(0);
    // Check that data are received in views
    const message = testSpark.getMessage();
    message.should.be.an('object')
      .that.has.a.property('event')
      .that.equal('newData');
    message.should.have.a.property('payload')
      .that.is.an('array');
    const payloads = message.payload;
    payloads.length.should.equal(1);
    payloads[0].should.be.an('object')
      .and.have.property('dataId')
      .that.deep.equal(newDataMessage.dataId);
    payloads[0].should.have.property('payloads')
      .that.have.lengthOf(newDataMessage.payloads.length);
    for (let i = 0; i < payloads[0].payloads.length; i++) {
      _.isEqual(
        payloads[0].payloads[i].timestamp,
        newDataMessage.payloads[i].timestamp
      ).should.equal(true);
      _.isEqual(
        getReportingParameterProtobuf(payloads[0].payloads[i].payload),
        newDataMessage.payloads[i].payload
      ).should.equal(true);
    }
  });
  it('Real Time Data associated to a query', () => {
    const dataQuery = getDataQuery();
    connectedDataModel.addRequestedInterval(
      dataQuery.dataId,
      dataQuery.id,
      [dataQuery.interval.lowerTs.ms - 1e9, dataQuery.interval.upperTs.ms + 1e9]
    );
    const newDataMessage = getNewDataMessage({
      id: dataQuery.id,
      dataSource: 'REAL_TIME',
    });
    const newDataMessageProto = getNewDataMessageProtobuf(newDataMessage);
    onNewDataMessage(newDataMessageProto);
    // checking Data are in cacheJson
    const cachedData = cacheJsonModel.find();
    cachedData.should.be.an('array').and.have.lengthOf(newDataMessage.payloads.length);
    for (let i = 0; i < cachedData.length; i++) {
      _.isEqual(
        cachedData[i].timestamp,
        newDataMessage.payloads[i].timestamp.ms
      ).should.equal(true);
      _.isEqual(
        getReportingParameterProtobuf(cachedData[i].payload),
        newDataMessage.payloads[i].payload
      ).should.equal(true);
    }
    // checking interval is still requested
    const connectedData = connectedDataModel.find();
    connectedData.should.be.an('array')
      .and.have.lengthOf(1);
    connectedData[0].should.be.an('object')
      .and.have.property('requested');
    connectedData[0].requested.should.be.an('object')
      .that.have.property(dataQuery.id)
      .that.be.an('array')
      .that.has.lengthOf(2);
    connectedData[0].requested[dataQuery.id][0]
      .should.equal(dataQuery.interval.lowerTs.ms - 1e9);
    connectedData[0].requested[dataQuery.id][1]
      .should.equal(dataQuery.interval.upperTs.ms + 1e9);
    connectedData[0].should.have.property('intervals');
    connectedData[0].intervals.should.be.an('array')
      .that.has.lengthOf(0);
    // Check that data are received in views
    const message = testSpark.getMessage();
    message.should.be.an('object')
      .that.has.a.property('event')
      .that.equal('newData');
    message.should.have.a.property('payload')
      .that.is.an('array');
    const payloads = message.payload;
    payloads.length.should.equal(1);
    payloads[0].should.be.an('object')
      .and.have.property('dataId')
      .that.deep.equal(newDataMessage.dataId);
    payloads[0].should.have.property('payloads')
      .that.have.lengthOf(newDataMessage.payloads.length);
    for (let i = 0; i < payloads[0].payloads.length; i++) {
      _.isEqual(
        payloads[0].payloads[i].timestamp,
        newDataMessage.payloads[i].timestamp
      ).should.equal(true);
      _.isEqual(
        getReportingParameterProtobuf(payloads[0].payloads[i].payload),
        newDataMessage.payloads[i].payload
      ).should.equal(true);
    }
  });
});
