/* eslint-disable */
const data = require('../lib/stubProcess/utils/sdbStub.json');
const fs = require('fs');

// check parameters
if (process.argv[2] === 'help') {
  console.log('For generate a new textView use this command');
  console.log('node generateTW [number of parameters] [index of first parameter in Reporting.items] [path/of/folder/filename.vitv]');
  console.log('value by default');
  console.log('   number of parameters: 1');
  console.log('   index of first parameter: 0');
  console.log('   path: views/text[nbParam].vitv');
  console.log('data use for generate text view is \'sdvStub.json\'');
  return 0;
}

// init constants
let nbParam = 1;
if (process.argv[2] !== undefined || null) {
  nbParam = parseInt(process.argv[2], 10);
}
let nParam = 0;
if (process.argv[3] !== undefined || null) {
  nParam = parseInt(process.argv[3], 10);
}
let nameFile = `views/text${nbParam}.vitv`;
if (process.argv[4] !== undefined || null) {
  nameFile = process.argv[4];
}
const parameters = Object.keys(data.Reporting.items);

// define header content
let content = '{\n' +
  `  "title": "TextView ${nbParam} parameters",\n` +
  '  "type": "TextView",\n' +
  '  "backgroundColor" : "#fce4ec",\n' +
  '  "entryPoints": [\n';

// define header style textView in html
let htmlContent = '<style>' +
  '   .myTextView {float: left; font-size: 1.2rem; } ' +
  '   .myTextView .myContener { background-color: #0f1051; margin-top: 4px; margin-left: 6px; padding:2px; float: left; border-radius: 1px; border: 1px ridge #0f0041; height: 51px; width: 180px; } ' +
  '   .myContener .name {display: block;  overflow: hidden; background-color: white; color: black; font-weight: bolder; font-size: 11px; padding: 2px; text-align: center;} ' +
  '   .myContener .value { text-align: center; display: block; overflow: hidden; background-color: #0f0041; color: #00ff00; font-weight: bold; padding: 10px; margin-bottom: 10px; }' +
  '</style> ' +
  '<div class=\'myTextView\'> ';

// Add parameters
for (let i = 0; i < nbParam; i++) {
  const index = i + nParam;
  const paramName = parameters[index];
  const unit = data.Reporting.items[paramName].unit;
  content += '    {\n' +
    `      "name": "${paramName}",\n` +
    '      "connectedData": {\n' +
    `        "formula": "Reporting.${paramName}<ReportingParameter>.convertedValue",\n` +
    `        "unit": "${unit}",\n` +
    '        "digits": 8,\n' +
    '        "format": "",\n' +
    '        "domain": "fr.cnes.isis.simupus",\n' +
    '        "timeline": "Session 1"\n' +
    '      }\n' +
    '    }';
  if (i !== nbParam - 1) {
    content += ',\n';
  }
  htmlContent += '<div class=\'myContener\'>' +
    `<span class='name'>${paramName}</span>` +
    `<span class='value'>{{${paramName}}}</span>` +
    '</div> ';
}

// end file
content += '\n  ],\n' +
  '  "defaultRatio": {\n' +
  '    "length": 5,\n' +
  '    "width": 3\n' +
  '  },\n' +
  '  "content": "' +
  `${htmlContent} </div>"\n}`;

// create/edit file
fs.writeFile(nameFile, content, () => {});

// end script
return 0;
