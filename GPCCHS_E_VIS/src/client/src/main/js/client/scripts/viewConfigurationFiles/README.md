
# viewConfig script

The viewConfig script gives info, validates and migrate VIMA view configuration files.

    Usage: viewConfig [options]
    
    Options:

    -V, --version              output the version number
    -i, --info <inputFile>     Get information about <inputFile>
    -c, --check <inputFile>    Check if <inputFile> is a valid VIMA view configuration
    -m, --migrate <inputFile>  Migrate <inputFile> to the specified version
    -h, --help                 output usage information


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

A migration, for example `setVersion`, is an array that maps view types to migration functions :

```
const ViewConfiguration = require('../../ViewConfiguration');

module.exports = {
  '*': viewConfiguration => new ViewConfiguration({
    ...viewConfiguration.content,
    version: '2.0',
  }),
};
```

The function mapped to the key `*` is applied to all file types, the other functions are mapped 
to the view configurations corresponding to the key. 

For each migration, 0 to 2 migrations functions are applied :

- The common migration function, referenced by `*`
- The migration function corresponding to the view type, referenced by the view type key 
(`Page`, `PlotView`, `HistoryView`, etc.)


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

Note: the scripts does not produce output if the file is valid, 
and outputs error messages if view configuration file is not valid.


### Migrating view configuration file
```
$ viewConfig --migrate data/pages/dev.page1.vipg --target 2.2
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
