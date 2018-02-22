# SDB STUB GENERATOR

This node script create a SDB structure handled by DC stubs

## Use

### CLI
```node
node sdbStubGenerator.js
```
### Generated

File <i>sdbStub.json</i> in <i>./generated</i>

## Prerequisites

In folder <i>./catalogs</i>, the list of catalogs in json format should be present

The file <i>catalogToComObjectMap.json</i> is a map of all available <b>comObject</b> for a given catalog

## Model generated

```json
{
    "<CatalogName1>" : {
        "item" : [
            "<ItemName1>",
            "<ItemName2>",
        ],
        "comObject": [
            "<comObjectName1>",
            "<comObjectName2>"
        ]
    },
    "<CatalogName2>": {
        ...
    },
    ...
}
```