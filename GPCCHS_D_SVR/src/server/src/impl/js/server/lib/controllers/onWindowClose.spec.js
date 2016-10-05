// require('../utils/test');
// const { decode } = require('../protobuf');
// const { stopWindowSubscriptions } = require('./onWindowClose');
// const subscriptionsModel = require('../models/subscriptions');
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
//     subscriptionsModel.cleanup();
//     calls = [];
//   });
//   describe('stopWindowSubscriptions', () => {
//     it('none', () => {
//       stopWindowSubscriptions(42, zmqEmulator);
//
//       calls.should.be.an('array')
//         .that.has.lengthOf(0);
//
//       const subscriptions = subscriptionsModel.find();
//       subscriptions.should.be.an('array')
//         .that.have.lengthOf(0);
//     });
//     it('one', () => {
//       const myDataId = getDataId();
//
//       subscriptionsModel.addWindowId(myDataId, 42);
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
//         .that.equal('DATA_SUBSCRIBE');
//       subscription.should.have.an.property('payload');
//       subscription.payload.constructor.should.equal(Buffer);
//       const payload = decode('dc.dataControllerUtils.DataSubscribe', subscription.payload);
//       payload.should.be.an('object')
//         .that.have.an.property('action')
//         .that.equal('DELETE');
//       payload.should.have.an.property('dataId')
//         .that.be.an('object');
//       payload.dataId.should.have.properties(myDataId);
//
//       const subscriptions = subscriptionsModel.find();
//       subscriptions.should.be.an('array')
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
//       subscriptionsModel.addWindowId(myDataId[1], 42);
//       subscriptionsModel.addWindowId(myDataId[0], 42);
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
//           .that.equal('DATA_SUBSCRIBE');
//         subscription.should.have.an.property('payload');
//         subscription.payload.constructor.should.equal(Buffer);
//         const payload = decode('dc.dataControllerUtils.DataSubscribe', subscription.payload);
//         payload.should.be.an('object')
//           .that.have.an.property('action')
//           .that.equal('DELETE');
//         payload.should.have.an.property('dataId')
//           .that.be.an('object');
//         payload.dataId.should.have.properties(myDataId[i]);
//       }
//
//       const subscriptions = subscriptionsModel.find();
//       subscriptions.should.be.an('array')
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
//       subscriptionsModel.addWindowId(myDataId[0], 42);
//       subscriptionsModel.addWindowId(myDataId[1], 91);
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
//         .that.equal('DATA_SUBSCRIBE');
//       subscription.should.have.an.property('payload');
//       subscription.payload.constructor.should.equal(Buffer);
//       const payload = decode('dc.dataControllerUtils.DataSubscribe', subscription.payload);
//       payload.should.be.an('object')
//         .that.have.an.property('action')
//         .that.equal('DELETE');
//       payload.should.have.an.property('dataId')
//         .that.be.an('object');
//       payload.dataId.should.have.properties(myDataId[0]);
//
//       const subscriptions = subscriptionsModel.find();
//       subscriptions.should.be.an('array')
//         .that.have.lengthOf(1);
//       subscriptions[0].should.be.an('object')
//         .that.has.properties({
//           dataId: myDataId[1],
//           windows: [91],
//           filters: {},
//         });
//     });
//   });
// });
