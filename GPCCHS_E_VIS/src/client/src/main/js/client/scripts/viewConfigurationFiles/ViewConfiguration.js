
const fs = require('fs');

function getExtension(path) {
  return path.slice((Math.max(0, path.lastIndexOf('.')) || Infinity) + 1);
}

const BASE_VERSION = '2.0.0';
const TYPE_EXTENSION_MAP = {
  viws: 'WorkSpace',
  vipg: 'Page',
  vipv: 'PlotView',
  vidv: 'DynamicView',
  vitv: 'TextView',
  vimv: 'MimicView',
  vihv: 'HistoryView',
  viga: 'GroundAlarmView',
  viba: 'OnBoardAlarmView',
};

class ViewConfiguration {
  static fromFile(path) {
    return new ViewConfiguration({
      ...JSON.parse(fs.readFileSync(path, 'utf8')),
      fileExtension: getExtension(path),
    });
  }

  constructor(content) {
    this.content = content;
  }

  get type() {
    return this.content.type ||
      TYPE_EXTENSION_MAP[this.content.fileExtension];
  }

  get version() {
    return this.content.version || BASE_VERSION;
  }

  get info() {
    return {
      version: this.version,
      type: this.type,
    };
  }

  toString() {
    return JSON.stringify(this.content, null, 2);
  }
}

module.exports = ViewConfiguration;
