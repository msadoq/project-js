const { join } = require('path');
const fs = require('fs');

const { error } = console;
const npmDependenciesTypes = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
  'bundledDependencies',
];
const stringify = json => `${JSON.stringify(json, null, 2)}\n`;
const getDepDir = dep => join(process.env.dependencies_dir, 'lib/js', dep);
const readPackageJson = () => JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const writePackageJson = packageJson => fs.writeFileSync('./package.json', stringify(packageJson));

if (process.env.dependencies_dir) { // maven build only
  const packageJson = readPackageJson();
  const mavenDeps = packageJson.mavenDependencies || [];
  mavenDeps.forEach((dep) => {
    npmDependenciesTypes.forEach((depType) => {
      if (packageJson[depType]) {
        delete packageJson[depType][dep];
      }
    });
    packageJson.dependencies[dep] = getDepDir(dep);
  });
  writePackageJson(packageJson);
} else {
  error('Error: this script should be used by Maven generate.sh script only');
}
