
# viewConfig script

The viewConfig script gives info, validates and migrate VIMA view configuration files.

  Usage: viewConfig [options]

  Options:

    -V, --version                 output the version number
    -i, --info <inputFile>        Get information about <inputFile>
    -c, --check <inputFile>       Check if <inputFile> is a valid VIMA view configuration
    -m, --migrate <inputFile>     Migrate <inputFile> to the specified version
    -t, --target <targetVersion>  Sets target version for migration, default 2.0
    -l, --lock <lockFile>         Sets or use existing lock file to remember migrations that have already been applied
    -o, --output <outputFile>     Sets output file to save migrated view configuration
    -h, --help                    output usage information


Each VIMA version comes with a migration folder, 
for example `./scripts/viewConfigurationFiles/migrations/v2.0` which lists all migrations that
are applied when switching to version 2.0.

The `index.js` exports all migrations that are going to be applied :

```
const setVersion = require('./setVersion');

module.exports = {
  setVersion,
};
```

A migration, for example `setVersion`, is an array that maps view types to migration functions 
(pure migration) or migration functions with hook functions:


Pure migration:
```
const ViewConfiguration = require('../../ViewConfiguration');

module.exports = {
  '*': (viewConfiguration, options) => new ViewConfiguration({
    ...viewConfiguration.content,
    version: '2.0',
  }),
};
```

Composed migration (MimicView example):
```
// [...]

module.exports = {
  MimicView: {
    update: (viewConfiguration, { inputPath, outputPath }) => {
      let updatedContent = viewConfiguration.content;

      const svgContentPath =
        path.join(
          '/views',
          `${path.basename(outputPath || inputPath)}.svg`
        );

      updatedContent = _.unset('content', updatedContent);
      updatedContent = _.set('contentPath', svgContentPath, updatedContent);

      return new ViewConfiguration(updatedContent);
    },
    hook: (viewConfiguration, migratedViewConfiguration) => {
      const outputPath =
        path.join(config.ISIS_DOCUMENTS_ROOT, migratedViewConfiguration.content.contentPath);

      const content = viewConfiguration.content.content.toString();

      try {
        fs.writeFileSync(outputPath, content, 'utf8');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
```

In the above example, the `update` function returns the migrated view configuration instance
and the `hook` function is called before returning the migrated view configuration file.

The function (or object in the case of a composed migration) mapped to the key `*` 
is applied to all file types, the other functions are mapped to the view configurations 
corresponding to the key. 

## User usage examples

### Getting view configuration information
```
$ viewConfig --info data/pages/dev.page1.vipg 
The file 'data/pages/dev.page1.vipg' is a Page configuration file for VIMA 2.0
```

### Validating view configuration file
```
$ viewConfig --check data/pages/dev.page1.vipg 
```

### Migrating view configuration file
```
$ viewConfig --migrate data/pages/dev.page1.vipg --target 2.2.1
```
Migrates file data/pages/dev.page1.vipg to target version and outputs the new content to the standard output.
Default version for target value is 2.0.

### Specifying a lock file
```
$ viewConfig --migrate data/pages/dev.page1.vipg --target 2.2 --lock lockfile.json
```

Uses lockFile to store applied migrations. This lock file is used to avoid 
applying many times the same migrations. 

lockfile.json is automatically created if it does not exist.

### Specifying output file
By default, the migrated JSON view configuration is printed to the standard output.

If `--output` option is specified, nothing is printed to the standard output and the migrated
JSON file is saved to the specified path.

```
$ viewConfig --migrate data/pages/dev.page1.vipg --output data/pages/dev.page1.migrated.vipg --target 2.2 --lock lockfile.json
```

### Generate a new schema based on the json file: 

./node_modules/json-schema-generator/bin/cli.js ./PUS11View.schema.json --force --file=/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/main/js/client/data/views/pus11View.pus11

