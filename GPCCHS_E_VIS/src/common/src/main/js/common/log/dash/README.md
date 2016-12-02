# Log Dashboard

Watch your logs into HTML and charts !

## Install

```
npm i
```

## How to use it ?

### Launch log server

```
npm start
```

Log server will receive logs over HTTP on port 9003 (can be changed via `PORT` env variable ).

### Launch web site (on port 8889)

```
npm run start:web
```

### Open website with Firefox

```
firefox http://localhost:8889
```

### You need to feed him

On other components like HSS or HSC, you have to send logs over http to receive them on your dashboard.

For example, launch HSS like this :

```
hss
LOG=http:console npm start
```

It will print your logs on console and over http (default target is http://localhost:9003)

Same technique with HSC :

```
hsc
LOG=http:console npm start
```

Enjoy !
