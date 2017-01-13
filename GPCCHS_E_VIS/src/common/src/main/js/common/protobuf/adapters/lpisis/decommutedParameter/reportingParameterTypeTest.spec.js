// Generated file
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');

let json = {};

var fs = require("fs");

function getDifference(a, b)
{
    var i = 0;
    var j = 0;
    var result = "";

    while (j < b.length)
    {
        if (a[i] != b[j] || i == a.length)
            result += b[j];
        else
            i++;
        j++;
    }
if(result.length == 0) console.log("SAME STR");
else console.log(result);

}


describe.only('protobuf/lpisis/decommutedParameter/reportingParameter', () => {
  const bufferInt = ['INTEGER -2147483648', 'INTEGER 22', 'INTEGER 2147483647'];
  const bufferFloat = ['FLOAT -0.000000', 'FLOAT 22.299999', 'FLOAT 0.000000'];
  const bufferUInt = ['UINTEGER 0', 'UINTEGER 2147483647', 'UINTEGER 2147483648', 'UINTEGER 4294967295'];
  const bufferShort = ['SHORT -32768', 'SHORT 123', 'SHORT 32767'];
  const bufferDuration = ['DURATION -2147483648', 'DURATION 22', 'DURATION 2147483647'];
  const bufferIdentifier = ['IDENTIFIER ', 'IDENTIFIER mot', 'IDENTIFIER grande é $ * ê û î'];
  const bufferOctet = ['OCTET m', 'OCTET  ', 'OCTET s'];
  const bufferLong = ['LONG -2147483648', 'LONG 0', 'LONG 2147483647'];
  const bufferULong = ['ULONG 0', 'ULONG 1234567890', 'ULONG 2147483647'];
  const bufferString = ['STRING &', 'STRING ', 'STRING azertyuiopqs'];
  const bufferUri = ['URI motdfsdfsdfsdfsdf', 'URI ', 'URI grande é $ * ê û î'];
  const bufferTime = ['TIME 0', 'TIME 1234567890', 'TIME 2147483647'];

  const valsInt = [-2147483648, 22, 2147483647];
  const valsLong = [-2147483648, 0, 2147483647];
  const valsFloat = [-3.3e-38, 22.3, 3.3e-38];
  const valsDuration = [-2147483648, 22, 2147483647];
  const valsUInt = [0, 2147483647, 2147483648, 4294967295];
  const valsShort = [-32768, 123, 32767];
  const valsOctet = ['m', ' ', 's'];
  const valsIdentifier = ['', 'mot', 'grande é $ * ê û î'];
  const valsULong = [0, 1234567890, 2147483647];
  const valsString = ['&', '', 'azertyuiopqs'];
  const valsUri = ['motdfsdfsdfsdfsdf', '', 'grande é $ * ê û î'];
  const valsTime = [0, 1234567890, 2147483647];


  const rootpath = '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/common/src/main/js/common/protobuf/adapters/lpisis/decommutedParameter/testFiles/';
  let res;


  for(let i = 0; i < 3; i++){
    it(bufferInt[i], (done) => {
      fs.readFile(rootpath.concat(bufferInt[i]), function (err, data) {
        res = null;
        if (err) throw err;
        res = data;
        json = protobuf.decode('lpisis.ccsds_mal.INTEGER', res);
        json.should.be.an('object').that.have.properties({
          value: valsInt[i] });
        done();
      });
    });
  }

  for(let i = 0; i < 3; i++){
    it(bufferFloat[i], (done) => {
      fs.readFile(rootpath.concat(bufferFloat[i]), function (err, data) {
        res = null;
        if (err) throw err;
        res = data;
        console.log(data);
        json = protobuf.decode('lpisis.ccsds_mal.FLOAT', res);
        console.log(json);
        json.should.be.an('object').that.have.properties({
          value: valsFloat[i] });

        done();
      });
    });
  }

  for(let i = 0; i < 4; i++){
    it(bufferUInt[i], (done) => {
      fs.readFile(rootpath.concat(bufferUInt[i]), function (err, data) {
        res = null;
        if (err) throw err;
        res = data;
        json = protobuf.decode('lpisis.ccsds_mal.UINTEGER', res);
        console.log(json);
        json.should.be.an('object').that.have.properties({
          value: valsUInt[i] });

        done();
      });
    });
  }

  for(let i = 0; i < 3; i++){
    it(bufferShort[i], (done) => {
      fs.readFile(rootpath.concat(bufferShort[i]), function (err, data) {
        res = null;
        if (err) throw err;
        res = data;
        console.log(res);
        json = protobuf.decode('lpisis.ccsds_mal.SHORT', res);

        json.should.be.an('object').that.have.properties({
          value: valsShort[i] });
        done();
      });
    });
  }

  for(let i = 0; i < 3; i++){
    it(bufferDuration[i], (done) => {
      fs.readFile(rootpath.concat(bufferDuration[i]), function (err, data) {
        res = null;
        if (err) throw err;
        res = data;

        json = protobuf.decode('lpisis.ccsds_mal.DURATION', res);
        console.log(json);
        json.should.be.an('object').that.have.properties({
          value: valsDuration[i] });
        done();
      });
    });
  }

  for(let i = 0; i < 3; i++){
    it(bufferIdentifier[i], (done) => {
      fs.readFile(rootpath.concat(bufferIdentifier[i]), function (err, data) {
        res = null;
        if (err) throw err;
        res = data;
        console.log("RAW BUFFER: ", res);
        json = protobuf.decode('lpisis.ccsds_mal.IDENTIFIER', res);
        //We can decode Identifier with STRING BUT IDENTIFIER NOT WORKING AS bytes json = protobuf.decode('lpisis.ccsds_mal.STRING', res);

        json.should.be.an('object').that.have.properties({
          value: valsIdentifier[i] });

        done();
      });
    });
  }
  for(let i = 0; i < 3; i++){
    it.only(bufferOctet[i], (done) => {
      fs.readFile(rootpath.concat(bufferOctet[i]), function (err, data) {
        res = null;
        if (err) throw err;
        res = data;

        json = protobuf.decode('lpisis.ccsds_mal.OCTET', res);
        console.log(json);
        json.should.be.an('object').that.have.properties({
          value: valsOctet[i] });

        done();
      });
    });
  }

  for(let i = 0; i < 3; i++){
    it(bufferLong[i], (done) => {
      fs.readFile(rootpath.concat(bufferLong[i]), function (err, data) {
        res = null;
        if (err) throw err;
        res = data;
        json = protobuf.decode('lpisis.ccsds_mal.LONG', res);
        json.value.should.have.properties({
          low: valsLong[i] });
        done();
      });
    });
  }

  for(let i = 0; i < 3; i++){
    it(bufferULong[i], (done) => {
      fs.readFile(rootpath.concat(bufferULong[i]), function (err, data) {
        res = null;
        if (err) throw err;
        res = data;
        json = protobuf.decode('lpisis.ccsds_mal.ULONG', res);
        json.should.be.an('object').that.have.properties({
          value: valsULong[i] });
        done();
      });
    });
  }

  for(let i = 0; i < 3; i++){
    it(bufferString[i], (done) => {
      fs.readFile(rootpath.concat(bufferString[i]), function (err, data) {
        res = null;
        if (err) throw err;
        res = data;
        console.log(data);
        json = protobuf.decode('lpisis.ccsds_mal.STRING', res);
        //getDifference(valsString[i], json.value);
        json.should.be.an('object').that.have.properties({
          value: valsString[i] });
        done();
      });
    });
  }

  for(let i = 0; i < 3; i++){
    it(bufferUri[i], (done) => {
      fs.readFile(rootpath.concat(bufferUri[i]), function (err, data) {
        res = null;
        if (err) throw err;
        res = data;
        json = protobuf.decode('lpisis.ccsds_mal.URI', res);
        json.should.be.an('object').that.have.properties({
          value: valsUri[i] });
        done();
      });
    });
  }

  for(let i = 0; i < 3; i++){
    it(bufferTime[i], (done) => {
      fs.readFile(rootpath.concat(bufferTime[i]), function (err, data) {
        res = null;
        if (err) throw err;
        res = data;
        json = protobuf.decode('lpisis.ccsds_mal.TIME', res);
        console.log(json);
        json.value.should.be.an('object').that.have.properties({
          low: valsTime[i] });
        done();
      });
    });
  }

  it('ATTRIBUTE INTEGER 245 STRING grande é $ * ê û î', (done) => {
    fs.readFile(rootpath.concat('ATTRIBUTE INTEGER 245 STRING grande é $ * ê û î'), function (err, data) {
      res = null;
      if (err) throw err;
      res = data;
      json = protobuf.decode('lpisis.ccsds_mal.ATTRIBUTE', res);
      console.log(json);
      json._integer.should.be.an('object').that.have.properties({
        value: 245 });
      json._string.should.be.an('object').that.have.properties({
        value: 'grande é $ * ê û î' });
      done();
    });
  });

  it('ATTRIBUTE INTEGER 245 STRING grande é $ * ê û î FLOAT 22.35654', (done) => {
    fs.readFile(rootpath.concat('ATTRIBUTE INTEGER 245 STRING grande é $ * ê û î FLOAT 22.35654'), function (err, data) {
      res = null;
      if (err) throw err;
      res = data;
      json = protobuf.decode('lpisis.ccsds_mal.ATTRIBUTE', res);
      console.log(json);
      json._integer.should.be.an('object').that.have.properties({
        value: 245 });
      json._string.should.be.an('object').that.have.properties({
        value: 'grande é $ * ê û î' });
      json._duration.should.be.an('object').that.have.properties({
          value: '22.35654' });
      done();
    });
  });
});
