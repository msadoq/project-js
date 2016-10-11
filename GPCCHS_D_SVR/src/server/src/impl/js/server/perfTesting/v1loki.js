const database = require('../lib/io/loki');
// const Loki = require('lokijs');
//
// const database = new Loki('test.db');
//var randomData = database.addCollection('randomData');
var randomData = database.addCollection('randomData');

let initTime = 3568;
let tstamp = 0;
function genRandomVal() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

for (let i = 1; i < 1000; i++) {
  if (i % 3 === 0) {
    tstamp = i * initTime;
    randomData.insert({
      timestamp: tstamp,
      stringData: genRandomVal()
    });
  }
  if (i % 2 === 0) {
    tstamp = initTime / i;
    randomData.insert({
      timestamp: tstamp,
      stringData: genRandomVal()
    });
  }
  else {
    tstamp = initTime + i*i;
    randomData.insert({
      timestamp: tstamp,
      stringData: genRandomVal()
    });
  }

}



let startTime = process.hrtime();
for(let i = 1; i <= 1e4; i++){
  if(i%2 === 0){
      var results = randomData.where(function(obj) {
        return (obj.timestamp >= 35 + i && obj.timestamp <=  50 + i );
      });
  }
  else{

    randomData.insert({
      timestamp: i * 10,
      stringData: genRandomVal()
    });
  }
}

let stoptime = process.hrtime(startTime);


console.log(stoptime);
//console.log(results);
