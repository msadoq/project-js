var http = require('http');

var day = 'default';

days = {
    'default' : {'dInf': 0,'dSup': 0},
    'lu' : {'dInf': 1467583200,'dSup': 1467669600},
    'ma' : {'dInf': 1467669600,'dSup': 1467756000},
    'me' : {'dInf': 1467756000,'dSup': 1467842340},
    'luma' : {'dInf': 1467583200,'dSup': 1467756000},
    'mame' : {'dInf': 1467669600,'dSup': 1467842340},
    'lume' : {'dInf': 1467583200,'dSup': 1467842340}
}

if (process.argv[2] in days) {
    day=process.argv[2];
}

console.log('DAY: '+day+' -> '+days[day].dInf+' - '+days[day].dSup);

jsonData = {
    'jsonElem' : {
        'DataFullName': 'TestDonnees',
        'Field': '',
        'DomainId': 0,
        'TimeLineType': 'session',
        'SessionId': 1,
        'SetFileName': '',
        'SubscriptionState': 'Play',
        'VisuSpeed': 0,
        'VisuWindow': days[day], 
        'Filter': ''
    }
}

//performRequest('/api/subscriptions','POST',jsonData);

var postData = JSON.stringify(jsonData);

var options = {
  hostname: '127.0.0.1',
  port: 1337,
  path: '/api/subscriptions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData, 'utf8')
  }
};

var req = http.request(options, (res) => {
    //console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
    //  console.log("headers: ", res.headers);

    res.on('data', function(d) {
        console.info('POST result:\n');
        process.stdout.write(d);
        console.info('\n\nPOST completed');
    });
    res.on('end', () => {
        //console.log('No more data in response.')
    })
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();
