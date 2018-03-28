#!/usr/bin/env node

/* eslint-disable no-lonely-if */
const fs = require('fs');
const path = require('path');

const validate = require('./viewConfigurationFiles/func/validate');

const validation = {
  invalidFiles: [],
};

const validateDir = (folder, fileList) => {
  const files = fs.readdirSync(folder);
  const currentFileList = fileList || [];

  files.forEach((file) => {
    const filePath = path.join(folder, file);

    if (fs.statSync(filePath).isDirectory()) {
      validateDir(filePath, currentFileList);
    } else {
      if (file.match('.*.vi.*')) {
        const isValid = validate(filePath);
        if (!isValid) {
          validation.invalidFiles.push(filePath);
        }
      }
    }
  });
};

validateDir(process.argv[2] || '.');

process.stderr.write(
  '[Error] Some view configuration files are invalid. Maybe view configuration schema need to be updated?\n'
);
