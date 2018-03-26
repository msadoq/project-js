
const fs = require('fs');

const BASE_VERSION = '2.0';

class ViewConfiguration {
  static fromFile(path) {
    return new ViewConfiguration({
      ...JSON.parse(fs.readFileSync(path, 'utf8')),
    });
  }

  constructor(content) {
    this.content = content;
  }

  get type() {
    return this.content.type;
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
