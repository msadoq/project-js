const fs = require('fs');
const path = require('path');

const sdbStructure = {};

const unitArray = ['g', 'V', 'm', 'J', 'T'];

const catalogsPath = path.resolve(__dirname, 'catalogs');
const catalogComObjectFilePath = path.resolve(__dirname, 'catalogToComObjectMap.json');

const catalogComObjectMap = JSON.parse(fs.readFileSync(catalogComObjectFilePath, 'utf8'));

fs.readdir(catalogsPath, (err, fileArray) => {
  fileArray.filter(getExtension).forEach((filename) => {
    // sdbStructure.push(fs.readFileSync(path.resolve(__dirname, filename)));
    const rawJson = fs.readFileSync(path.resolve(catalogsPath, filename), 'utf8');
    const json = JSON.parse(rawJson);
    parseStructure(json);
    // sdbStructure.push(json.Catalog.Name);
  });
  fs.writeFile('generated/sdbStub.json', JSON.stringify(sdbStructure, null, 2));
});

const parseStructure = (json) => {
  const name = json.Catalog.Name;
  sdbStructure[name] = {
    items: {},
    comObject: catalogComObjectMap[name],
  };
  json.Catalog.Items.forEach((item) => {
    sdbStructure[name].items[item.Name] = {
      unit: getRandomUnit(),
    };
  });
};

const getExtension = (element) => {
  const extName = path.extname(element);
  return extName === '.json';
};

const getRandomUnit = () => unitArray[Math.floor(Math.random() * unitArray.length)];
