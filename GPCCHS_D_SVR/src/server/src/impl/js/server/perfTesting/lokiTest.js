const databaseLokiv1 = require('../lib/io/loki');
const Loki = require('lokijs');
const databaseLokiv2 = new Loki('test.db');


var v1 = databaseLokiv1.addCollection('randomData');
var v2 = databaseLokiv2.addCollection('randomData');
var v1Indexed = databaseLokiv1.addCollection('randomData', { indices: ['timestamp'] });
var v2Indexed = databaseLokiv2.addCollection('randomData', { indices: ['timestamp'] });
var v1adptive = databaseLokiv1.addCollection('randomData', { adaptiveBinaryIndices: true, indices: ['timestamp'] });
var v2adptive = databaseLokiv2.addCollection('randomData', { adaptiveBinaryIndices: true, indices: ['timestamp'] });
let initTime = 3568;
let tstamp = 0;

function genRandomVal() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function generateCollection(collection, numberOfEntrtys){
  for (let i = 1; i < numberOfEntrtys; i++) {
    if (i % 3 === 0) {
      tstamp = i * initTime;
      collection.insert({
        timestamp: tstamp,
        stringData: genRandomVal()
      });
    }
    if (i % 2 === 0) {
      tstamp = initTime / i;
      collection.insert({
        timestamp: tstamp,
        stringData: genRandomVal()
      });
    }
    else {
      tstamp = initTime + i*i;
      collection.insert({
        timestamp: tstamp,
        stringData: genRandomVal()
      });
    }
  }
}

function testWR(collection, numberOfOperations){
  for (let i = 1; i <= numberOfOperations; i++){
    if(i%2 === 0){
      collection.insert({
        timestamp: i * 10,
        stringData: genRandomVal()
      });
    }
    else {
        var results = collection.where(function(obj) {
          return (obj.timestamp >= 35 + i && obj.timestamp <=  50 + i);
        });
    }
  }
}

generateCollection(v1adptive);
generateCollection(v2adptive);
generateCollection(v1Indexed);
generateCollection(v2Indexed);

let startTime = process.hrtime();

for (let i = 0 ;i < 100 ;i++){
  testWR(v1adptive, 100);

}
let stoptime = process.hrtime(startTime);
let timeinSec = (stoptime[0]+stoptime[1]*1e-9)/100;

console.log("v1 with index and Adaptative", timeinSec);


/////////////////////////////////////////////////////
startTime = process.hrtime();
for (let i = 0 ;i < 100 ;i++){
  testWR(v2adptive, 100);

}
stoptime = process.hrtime(startTime);
timeinSec = (stoptime[0]+stoptime[1]*1e-9)/100;

console.log("v2 with index and Adaptative", timeinSec);

/////////////////////////////////////////////////////
startTime = process.hrtime();
for (let i = 0 ;i < 100 ;i++){
  testWR(v1Indexed, 100);

}
stoptime = process.hrtime(startTime);
timeinSec = (stoptime[0]+stoptime[1]*1e-9)/100;

console.log("v1 with index", timeinSec);

/////////////////////////////////////////////////////
startTime = process.hrtime();
for (let i = 0 ;i < 100 ;i++){
  testWR(v2Indexed, 100);

}
stoptime = process.hrtime(startTime);
timeinSec = (stoptime[0]+stoptime[1]*1e-9)/100;
console.log("v2 with index", timeinSec);

/////////////////////////////////////////////////////
startTime = process.hrtime();
for (let i = 0 ;i < 100 ;i++){
  testWR(v1, 100);

}
stoptime = process.hrtime(startTime);
timeinSec = (stoptime[0]+stoptime[1]*1e-9)/100;

console.log("v1", timeinSec);

/////////////////////////////////////////////////////
startTime = process.hrtime();
for (let i = 0 ;i < 100 ;i++){
  testWR(v2, 100);

}
stoptime = process.hrtime(startTime);
timeinSec = (stoptime[0]+stoptime[1]*1e-9)/100;

console.log("v2", timeinSec);
