const zmq = require('zmq');
const socketOut = zmq.socket('push');

socketOut.bind('tcp://127.0.0.1:49159', (err) => {
    if (err) throw err;
    console.log('Binding Done');
})


const fs = require('fs');
const readline = require('readline');

const file = process.argv[2];

let reader = null;

let lineIndex = 0;

try {
  reader = readline.createInterface({
      input: fs.createReadStream(file),
  });
} catch (err) {
    console.log(`Invalid file: ${file}`);
    process.exit(1);
}

reader.on('line', function (line) {
    if (lineIndex > 2) {
      const modifiedLine = line.replace(/^(\d{4})\/(\d{2})\/(\d{2}) (\d{2}:\d{2}:\d{2}\.\d{3})/g, '$1-$2-$3T$4Z');
      const tokens = modifiedLine.split(/ |\t/g);
      const timestamp = new Date(tokens[0]).getTime();
      const value = tokens[1];
      const unit = tokens[2];
      const misc = tokens[3];
      console.log(`TIME: ${tokens[0]} | TIMESTAMP: ${timestamp} | VALUE: ${tokens[1]} | UNIT: ${unit} | MISC: ${misc}`);
      const OID = "000100010100010001" + Math.floor((Math.random() * 99999999) + 1);
      const obj = {
        'catalog' : 'Reporting',
        'fullDataId' : 'Reporting.FDS_DATA<FdsData>',
        'oid' : OID,
        'parameter' : 'FDS_DATA',
        'session'  : 1,
        'timestamp' : timestamp,
        'type' : 'FdsData'
      };
      const payload = {
          rawValue: value,
          unit,
          misc, 
      };
      const metaData = new Buffer(JSON.stringify(obj));
      socketOut.send([null, metaData, JSON.stringify(payload)]);
    }
    lineIndex++;
});

