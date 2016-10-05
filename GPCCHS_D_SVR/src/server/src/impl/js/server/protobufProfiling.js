const stubs = require('./lib/stubs/data');
const protobuf = require('./lib/protobuf');

const payloads = [];
for (let i = 0; i < 1000; i += 1) {
  payloads.push(stubs.getDataPayload());
}

const newDataMessage = stubs.getNewDataMessageProtobuf({
  payloads,
});
const dcMessage = stubs.getWrappedNewDataMessageProtobuf({
  messageType: 1, // 'NEW_DATA_MESSAGE',
  payload: newDataMessage,
});

function fire(method) {
  const m = protobuf.decode('dc.dataControllerUtils.DcServerMessage', dcMessage);
  const newDataMessageIncoming = protobuf.decode('dc.dataControllerUtils.NewDataMessage', m.payload);
  const start = process.hrtime();

  for (let i = 0; i < newDataMessageIncoming.payloads.length; i += 1) {
    protobuf[method]('lpisis.decommutedParameter.ReportingParameter', newDataMessageIncoming.payloads[i].payload);
  }

  const duration = process.hrtime(start);
  console.log(duration[0], Math.floor(duration[1] / 1e6), 's');
}

fire('decode');
