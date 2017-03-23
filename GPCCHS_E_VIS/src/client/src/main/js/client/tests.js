const _ = require('lodash/fp');

let stateLayout = [{ collapsed: true, x: 1, y: 2, i: 'view1' }, { x: 1, y: 2, i: 'view2' }];
let actionLayout = [{ x: 10, y: 20, i: 'view1' }, { x: 1, y: 2, i: 'view2' }];

_.reduce((geo, newGeo) => { console.log(geo, newGeo); }, stateLayout, actionLayout)
