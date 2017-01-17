import { writeFile } from 'fs';

/*
* main functions to read/write documents
* filesystem primitives are in lib/common/fs.js
*/

const writeJson = (path, json, callback) => {
  const spaces = 2; // beautify json with 2 spaces indentations
  const data = JSON.stringify(json, null, spaces);
  return writeFile(path, data, callback);
};

const fmd = {
  writeJson,
};

module.exports = fmd;
