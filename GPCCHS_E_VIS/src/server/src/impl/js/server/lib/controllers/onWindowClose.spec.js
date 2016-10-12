// require('../utils/test');
// const { decode } = require('../protobuf');
// const { stopWindowSubscriptions } = require('./onWindowClose');
// const connectedDataModel = require('../models/connectedData');
// const { getDataId } = require('../stubs/data');
//
// let calls = [];
// const zmqEmulator = (key, payload) => {
//   key.should.be.a('string')
//     .that.equal('dcPush');
//   calls.push(payload);
// };
//
// describe('onWindowClose', () => {
//   beforeEach(() => {
//     connectedDataModel.cleanup();
//     calls = [];
//   });
//   describe('stopWindowSubscriptions', () => {
//     it('none', () => {
//       stopWindowSubscriptions(42, zmqEmulator);
//
//       calls.should.be.an('array')
//         .that.has.lengthOf(0);
//
//       const connectedData = connectedDataModel.find();
//       connectedData.should.be.an('array')
//         .that.have.lengthOf(0);
//     });
//     it('one', () => {
//       const myDataId = getDataId();
//
//       connectedDataModel.addWindowId(myDataId, 42);
//
//       stopWindowSubscriptions(42, zmqEmulator);
//
//       calls.should.be.an('array')
//         .that.has.lengthOf(1);
//
//       calls[0].constructor.should.equal(Buffer);
//       const subscription = decode('dc.dataControllerUtils.DcClientMessage', calls[0]);
//       subscription.should.be.an('object')
//         .that.have.an.property('messageType')
//         .that.equal(2); // 'DATA_SUBSCRIBE'
//       subscription.should.have.an.property('payload');
//       subscription.payload.constructor.should.equal(Buffer);
//       const payload = decode('dc.dataControllerUtils.DataSubscribe', subscription.payload);
//       payload.should.be.an('object')
//         .that.have.an.property('action')
//         .that.equal(2); // 'DELETE'
//       payload.should.have.an.property('dataId')
//         .that.be.an('object');
//       payload.dataId.should.have.properties(myDataId);
//
//       const connectedData = connectedDataModel.find();
//       connectedData.should.be.an('array')
//         .that.have.lengthOf(0);
//     });
//     it('multi', () => {
//       const myDataId = [
//         getDataId(),
//         getDataId({
//           parameterName: 'test2',
//         }),
//       ];
//
//       connectedDataModel.addWindowId(myDataId[1], 42);
//       connectedDataModel.addWindowId(myDataId[0], 42);
//
//       stopWindowSubscriptions(42, zmqEmulator);
//
//       calls.should.be.an('array')
//         .that.has.lengthOf(2);
//
//       for (let i = 0; i < 2; i += 1) {
//         calls[i].constructor.should.equal(Buffer);
//         const subscription = decode('dc.dataControllerUtils.DcClientMessage', calls[i]);
//         subscription.should.be.an('object')
//           .that.have.an.property('messageType')
//           .that.equal(2); // 'DATA_SUBSCRIBE'
//         subscription.should.have.an.property('payload');
//         subscription.payload.constructor.should.equal(Buffer);
//         const payload = decode('dc.dataControllerUtils.DataSubscribe', subscription.payload);
//         payload.should.be.an('object')
//           .that.have.an.property('action')
//           .that.equal(2); // 'DELETE';
//         payload.should.have.an.property('dataId')
//           .that.be.an('object');
//         payload.dataId.should.have.properties(myDataId[i]);
//       }
//
//       const connectedData = connectedDataModel.find();
//       connectedData.should.be.an('array')
//         .that.have.lengthOf(0);
//     });
//     it('multi window', () => {
//       const myDataId = [
//         getDataId(),
//         getDataId({
//           parameterName: 'test2',
//         }),
//       ];
//
//       connectedDataModel.addWindowId(myDataId[0], 42);
//       connectedDataModel.addWindowId(myDataId[1], 91);
//
//       stopWindowSubscriptions(42, zmqEmulator);
//
//       calls.should.be.an('array')
//         .that.has.lengthOf(1);
//
//       calls[0].constructor.should.equal(Buffer);
//       const subscription = decode('dc.dataControllerUtils.DcClientMessage', calls[0]);
//       subscription.should.be.an('object')
//         .that.have.an.property('messageType')
//         .that.equal(2); // 'DATA_SUBSCRIBE'
//       subscription.should.have.an.property('payload');
//       subscription.payload.constructor.should.equal(Buffer);
//       const payload = decode('dc.dataControllerUtils.DataSubscribe', subscription.payload);
//       payload.should.be.an('object')
//         .that.have.an.property('action')
//         .that.equal(2); // 'DELETE'
//       payload.should.have.an.property('dataId')
//         .that.be.an('object');
//       payload.dataId.should.have.properties(myDataId[0]);
//
//       const connectedData = connectedDataModel.find();
//       connectedData.should.be.an('array')
//         .that.have.lengthOf(1);
//       connectedData[0].should.be.an('object')
//         .that.has.properties({
//           dataId: myDataId[1],
//           intervals: {
//             all: [],
//             received: [],
//             requested: {},
//           },
//           windows: [91],
//         });
//     });
//   });
// });
