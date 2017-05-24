// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../stubs/index');

const protobuf = require('../../../index');


describe('protobuf/lpisis/pusGroundModel/Pus014Model', () => {
  const fixture = stubData.getPus014Model();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.pusGroundModel.Pus014Model', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.pusGroundModel.Pus014Model', buffer);
    json.should.be.an('object').that.have.properties({
      groundDate: { type: 'time', value: fixture.groundDate },
      apid: { type: 'uinteger', value: fixture.apid },
      noEventReportPackets: { type: 'uinteger', value: fixture.noEventReportPackets },
      noDiagPackets: { type: 'uinteger', value: fixture.noDiagPackets },
      noHKPackets: { type: 'uinteger', value: fixture.noHKPackets },
      noTMPackets: { type: 'uinteger', value: fixture.noTMPackets },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
    });
    json.pus014EventReportPacket.should.be.an('array').that.have.lengthOf(fixture.pus014EventReportPacket.length);
    for (let i = 0; i < fixture.pus014EventReportPacket.length; i += 1) {
      json.pus014EventReportPacket[i].should.be.an('object').that.have.properties({
        rid: { type: 'uinteger', value: fixture.pus014EventReportPacket[i].rid },
        pus014ForwardedPacket: {
          apid: { type: 'uinteger', value: fixture.pus014EventReportPacket[i].pus014ForwardedPacket.apid },
          forwardingStatus: { type: 'boolean', value: fixture.pus014EventReportPacket[i].pus014ForwardedPacket.forwardingStatus },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: fixture.pus014EventReportPacket[i].pus014ForwardedPacket.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: fixture.pus014EventReportPacket[i].pus014ForwardedPacket.pusElement.lastUpdateTime },
          },
        },
      });
    }
    json.pus014HkPacket.should.be.an('array').that.have.lengthOf(fixture.pus014HkPacket.length);
    for (let i = 0; i < fixture.pus014HkPacket.length; i += 1) {
      json.pus014HkPacket[i].should.be.an('object').that.have.properties({
        subsamplingRatio: { type: 'uinteger', value: fixture.pus014HkPacket[i].subsamplingRatio },
        sid: { type: 'uinteger', value: fixture.pus014HkPacket[i].sid },
        pus014ForwardedPacket: {
          apid: { type: 'uinteger', value: fixture.pus014HkPacket[i].pus014ForwardedPacket.apid },
          forwardingStatus: { type: 'boolean', value: fixture.pus014HkPacket[i].pus014ForwardedPacket.forwardingStatus },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: fixture.pus014HkPacket[i].pus014ForwardedPacket.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: fixture.pus014HkPacket[i].pus014ForwardedPacket.pusElement.lastUpdateTime },
          },
        },
      });
    }
    json.pus014TmPacket.should.be.an('array').that.have.lengthOf(fixture.pus014TmPacket.length);
    for (let i = 0; i < fixture.pus014TmPacket.length; i += 1) {
      json.pus014TmPacket[i].should.be.an('object').that.have.properties({
        serviceTpe: { type: 'uinteger', value: fixture.pus014TmPacket[i].serviceTpe },
        serviceSubType: { type: 'uinteger', value: fixture.pus014TmPacket[i].serviceSubType },
        pus014ForwardedPacket: {
          apid: { type: 'uinteger', value: fixture.pus014TmPacket[i].pus014ForwardedPacket.apid },
          forwardingStatus: { type: 'boolean', value: fixture.pus014TmPacket[i].pus014ForwardedPacket.forwardingStatus },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: fixture.pus014TmPacket[i].pus014ForwardedPacket.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: fixture.pus014TmPacket[i].pus014ForwardedPacket.pusElement.lastUpdateTime },
          },
        },
      });
    }
    json.pus014DiagPacket.should.be.an('array').that.have.lengthOf(fixture.pus014DiagPacket.length);
    for (let i = 0; i < fixture.pus014DiagPacket.length; i += 1) {
      json.pus014DiagPacket[i].should.be.an('object').that.have.properties({
        subsamplingRatio: { type: 'uinteger', value: fixture.pus014DiagPacket[i].subsamplingRatio },
        sid: { type: 'uinteger', value: fixture.pus014DiagPacket[i].sid },
        pus014ForwardedPacket: {
          apid: { type: 'uinteger', value: fixture.pus014DiagPacket[i].pus014ForwardedPacket.apid },
          forwardingStatus: { type: 'boolean', value: fixture.pus014DiagPacket[i].pus014ForwardedPacket.forwardingStatus },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: fixture.pus014DiagPacket[i].pus014ForwardedPacket.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: fixture.pus014DiagPacket[i].pus014ForwardedPacket.pusElement.lastUpdateTime },
          },
        },
      });
    }
  });
});

