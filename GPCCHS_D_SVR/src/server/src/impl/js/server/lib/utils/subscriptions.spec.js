// require('../utils/test');
// const { decode } = require('../protobuf');
// const subscriptions = require('./subscriptions');
// const connectedDataModel = require('../models/connectedData');
// const cacheJsonModel = require('../models/cacheJson');
// const { getDataId } = require('../stubs/data');
//
// describe('subscriptions', () => {
//   beforeEach(() => {
//     connectedDataModel.cleanup();
//   });
//   describe('start', () => {
//     it('messageHandler error', () => {
//       const myDataId = getDataId();
//       (() => subscriptions.start(
//         {
//           parameterName: myDataId.parameterName,
//           catalog: myDataId.catalog,
//           comObject: myDataId.comObject,
//           sessionId: myDataId.sessionId,
//           domainId: myDataId.domainId,
//           windowId: 42,
//         },
//         (key, buffer, callback) => {
//           callback(new Error());
//         }
//       )).should.throw(Error);
//       const connectedData = connectedDataModel.find();
//       connectedData.should.be.an('array')
//         .that.have.lengthOf(1);
//       connectedData[0].should.be.an('object')
//         .that.have.properties({
//           localId: connectedDataModel.getLocalId(myDataId),
//           dataId: {
//             parameterName: myDataId.parameterName,
//             catalog: myDataId.catalog,
//             comObject: myDataId.comObject,
//             sessionId: myDataId.sessionId,
//             domainId: myDataId.domainId,
//           },
//           intervals: [],
//           requested: {},
//           windows: [],
//         });
//     });
//     it('start subscription', () => {
//       const myDataId = getDataId();
//       subscriptions.start(
//         {
//           parameterName: myDataId.parameterName,
//           catalog: myDataId.catalog,
//           comObject: myDataId.comObject,
//           sessionId: myDataId.sessionId,
//           domainId: myDataId.domainId,
//           windowId: 42,
//         },
//         (key, buffer, callback) => {
//           key.should.be.an('string')
//             .that.equal('dcPush');
//           buffer.constructor.should.equal(Buffer);
//           const subscription = decode('dc.dataControllerUtils.DcClientMessage', buffer);
//           subscription.should.be.an('object')
//             .that.have.an.property('messageType')
//             .that.equal('DATA_SUBSCRIBE');
//           subscription.should.have.an.property('payload');
//           subscription.payload.constructor.should.equal(Buffer);
//           const payload = decode('dc.dataControllerUtils.DataSubscribe', subscription.payload);
//           payload.should.be.an('object')
//             .that.have.an.property('action')
//             .that.equal('ADD');
//           payload.should.have.an.property('id');
//           payload.should.have.an.property('dataId')
//             .that.be.an('object');
//           payload.dataId.should.have.properties({
//             parameterName: myDataId.parameterName,
//             catalog: myDataId.catalog,
//             comObject: myDataId.comObject,
//             sessionId: myDataId.sessionId,
//             domainId: myDataId.domainId,
//           });
//           const connectedData = connectedDataModel.find();
//           connectedData.should.be.an('array')
//             .that.have.lengthOf(1);
//           connectedData[0].should.be.an('object')
//             .that.have.properties({
//               localId: connectedDataModel.getLocalId(myDataId),
//               dataId: {
//                 parameterName: myDataId.parameterName,
//                 catalog: myDataId.catalog,
//                 comObject: myDataId.comObject,
//                 sessionId: myDataId.sessionId,
//                 domainId: myDataId.domainId,
//               },
//               intervals: [],
//               requested: {},
//               windows: [42],
//             });
//           callback(null);
//         }
//       );
//     });
//   });
//   describe('stop', () => {
//     it('messageHandler error', () => {
//       const myDataId = getDataId();
//       (() => subscriptions.stop(
//         {
//           parameterName: myDataId.parameterName,
//           catalog: myDataId.catalog,
//           comObject: myDataId.comObject,
//           sessionId: myDataId.sessionId,
//           domainId: myDataId.domainId,
//           windowId: 42,
//         },
//         (key, buffer, callback) => {
//           callback(new Error());
//         }
//       )).should.throw(Error);
//       const connectedData = connectedDataModel.find();
//       connectedData.should.be.an('array')
//         .that.have.lengthOf(1);
//       connectedData[0].should.be.an('object')
//         .that.have.properties({
//           localId: connectedDataModel.getLocalId(myDataId),
//           dataId: {
//             parameterName: myDataId.parameterName,
//             catalog: myDataId.catalog,
//             comObject: myDataId.comObject,
//             sessionId: myDataId.sessionId,
//             domainId: myDataId.domainId,
//           },
//           intervals: [],
//           requested: {},
//           windows: [42],
//         });
//     });
//     it('stop subscription', () => {
//       const myDataId = getDataId();
//       subscriptions.start(
//         {
//           parameterName: myDataId.parameterName,
//           catalog: myDataId.catalog,
//           comObject: myDataId.comObject,
//           sessionId: myDataId.sessionId,
//           domainId: myDataId.domainId,
//           windowId: 42,
//         },
//         (k, b, cb) => {
//           subscriptions.stop(
//             {
//               parameterName: myDataId.parameterName,
//               catalog: myDataId.catalog,
//               comObject: myDataId.comObject,
//               sessionId: myDataId.sessionId,
//               domainId: myDataId.domainId,
//               windowId: 42,
//             },
//             (key, buffer, callback) => {
//               key.should.be.an('string')
//                 .that.equal('dcPush');
//               buffer.constructor.should.equal(Buffer);
//               const subscription = decode('dc.dataControllerUtils.DcClientMessage', buffer);
//               subscription.should.be.an('object')
//                 .that.have.an.property('messageType')
//                 .that.equal('DATA_SUBSCRIBE');
//               subscription.should.have.an.property('payload');
//               subscription.payload.constructor.should.equal(Buffer);
//               const payload = decode('dc.dataControllerUtils.DataSubscribe', subscription.payload);
//               payload.should.be.an('object')
//                 .that.have.an.property('action')
//                 .that.equal('DELETE');
//               payload.should.have.an.property('dataId')
//                 .that.be.an('object');
//               payload.dataId.should.have.properties({
//                 parameterName: myDataId.parameterName,
//                 catalog: myDataId.catalog,
//                 comObject: myDataId.comObject,
//                 sessionId: myDataId.sessionId,
//                 domainId: myDataId.domainId,
//               });
//               const connectedData = connectedDataModel.find();
//               connectedData.should.be.an('array')
//                 .that.have.lengthOf(1);
//               connectedData[0].should.be.an('object')
//                 .that.have.properties({
//                   localId: connectedDataModel.getLocalId(myDataId),
//                   dataId: {
//                     parameterName: myDataId.parameterName,
//                     catalog: myDataId.catalog,
//                     comObject: myDataId.comObject,
//                     sessionId: myDataId.sessionId,
//                     domainId: myDataId.domainId,
//                   },
//                   intervals: [],
//                   requested: {},
//                   windows: [],
//                 });
//               callback(null);
//             }
//           );
//           cb(null);
//         }
//       );
//     });
//   });
//   describe('cleanupModels', () => {
//     const myDataId = getDataId();
//     subscriptions.cleanupModels(myDataId);
//     connectedDataModel.find().should.be.an('array')
//       .that.have.lengthOf(0);
//     cacheJsonModel.find().should.be.an('array')
//       .that.have.lengthOf(0);
//   });
// });
