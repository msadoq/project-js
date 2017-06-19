# How to use logManager ?

Each call to a logger will dispatch logs to enabled transports (console, file, ...).

You can add as many transports as you want. For example, 1 for console, that display all levels of logs. And 2 others for files, 1 for error logs and a other 1 for all kind of levels.

You can configure how to display/send logs in `LOG` parameter.

## Syntax

```
<transport1>?<param1>=<value1>,<param2>=<value2>:<transport2>?<param1>=<value1>,...:...
```

Transport configuration are serialized into `LOG` parameter

- Each transport is separated with `:` : `console:file`
- Transport parameters begin with `?` and set with `=` : `console?level=debug`
- Each transport parameter is separated with `,` : `level=debug,include=view`

## Examples

Log into console, accept level debug and include exclusively logs with category View

```
console?level=debug,include=View
```

Log into console and also over http

```
console:http
```

# Transports

Each transport can be configured.

For main process, they accept also [Winston](https://github.com/winstonjs/winston) [transports](https://github.com/winstonjs/winston/blob/master/docs/transports.md) options.

## Filtering on category

You can filter logs on category with `include` and `exclude` parameters

They accept regular expressions

For example, this is how to exclude logs with category view, View or stubs.

```
console?level=debug,exclude=(v|View)|(stubs)
```

## Filtering on level

Default value: `info`

You can filter logs on their level with `level` parameter

List of available levels
- silly
- debug
- verbose
- info
- warn
- error

For example, filter on `error` level for `console` transport

```
console?level=error
```

## In main process

- console ([parameters](https://github.com/winstonjs/winston/blob/master/docs/transports.md#console-transport))
- file ([parameters](https://github.com/winstonjs/winston/blob/master/docs/transports.md#file-transport))
- http ([parameters](https://github.com/winstonjs/winston/blob/master/docs/transports.md#http-transport))

## In renderer process

- console
- electronIPC (send logs to main process)
