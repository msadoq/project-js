const { join } = require('path');
const fs = require('fs');
const _each = require('lodash/each');
const { execSync } = require('child_process');

const readConf = () => JSON.parse(fs.readFileSync('./config.default.json', 'utf8'));

const conf = readConf();

_each(conf.MESSAGES_NAMESPACES, (adapter) => {
  const path = join(adapter.path, adapter.ns);
  execSync('npm i', { stdio: [0, 1, 2], cwd: path });
});
