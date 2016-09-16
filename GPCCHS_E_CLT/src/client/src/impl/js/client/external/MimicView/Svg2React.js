const replace = require('estraverse').replace;
const generate = require('escodegen').generate;
import svg2js from 'svgo/lib/svgo/svg2js';
import FS from 'fs';
import PATH from 'path';
import SVGO from 'svgo';

// i is used to identify the acctual node when going through AST
let i = 0;

let id = 0;
// Gloabal Svg as String that we can modify to obtain our final SVG
let svgStr = null;
// InitState is a dictionary of all svg's elements's state at svg first loading
let initState = {};
// ladId is used when we need to remember lastId while we browse through the AST
let lastId = null;

// generateInitialState is used to get the initialState
export function generateInitialState(svgString) {
  let tmp = {};
  initState = {};
  // We identify texts zone to animate them later
  const xmlDoc = new DOMParser().parseFromString(svgString, 'image/svg+xml');
  let textIds = xmlDoc.getElementsByTagName('text');
  // We generate the AST
  let trans = babel.transform(svgString, {
    code: false,
    sourceMaps: false
  });
  // We browse the AST to optain the initial svg state
  replace(trans.ast.program, {
    enter(node, parent) {
      if (isReactCreateElement(node)) {
        if (i > 0) {
          initState[lastId] = tmp;
          tmp = {};
        }
        i++;
        this.inCreateElCall = true;
      }

      if (this.inCreateElCall && parent.type === 'ObjectExpression') {
        if (isPropertyIdentifierWithNames(node, ['id'])) {
          lastId = node.value.value;
        }
        if (isPropertyIdentifierWithNames(node, ['x'])) {
          tmp.x = node.value.value;
        }
        if (isPropertyIdentifierWithNames(node, ['y'])) {
          tmp.y = node.value.value;
        }
        if (isPropertyIdentifierWithNames(node, ['x1'])) {
          tmp.x1 = node.value.value;
        }
        if (isPropertyIdentifierWithNames(node, ['y1'])) {
          tmp.y1 = node.value.value;
        }
        if (isPropertyIdentifierWithNames(node, ['x2'])) {
          tmp.x2 = node.value.value;
        }
        if (isPropertyIdentifierWithNames(node, ['y2'])) {
          tmp.y2 = node.value.value;
        }
        if (isPropertyIdentifierWithNames(node, ['cx'])) {
          tmp.cx = node.value.value;
        }
        if (isPropertyIdentifierWithNames(node, ['cy'])) {
          tmp.cy = node.value.value;
        }
        if (isPropertyIdentifierWithNames(node, ['fill'])) {
          tmp.fill = node.value.value;
        }
        if (isPropertyIdentifierWithNames(node, ['color'])) {
          tmp.color = node.value.value;
        }
        if (isPropertyIdentifierWithNames(node, ['width'])) {
          tmp.width = node.value.value;
        }
        if (isPropertyIdentifierWithNames(node, ['height'])) {
          tmp.height = node.value.value;
        }

        if (isPropertyIdentifierWithNames(node, ['transform'])) {
          tmp.transform = node.value.value;
        }
      }
    },
    leave(node, parent) {
      if (isReactCreateElement(node)) {
        if (i > 0) {
          initState[lastId] = tmp;
        }
        i--;
        this.inCreateElCall = false;
      }
    }
  });
  // Getting initial state of text elements
  for (i = 0; i < textIds.length; i++) {
    tmp = {};
    const idtmp = textIds[i].id;

    // console.log(tmp);
    // console.log(idtmp);
    initState[idtmp].txt = textIds[i].innerHTML;
    // console.log(initState);
  }
  return initState;
}

export function parametrizeText(code) {
  console.log(initState);

  for (const key in initState) {
    // skip loop if the property is from prototype
    const obj = initState[key];

    if (obj.hasOwnProperty('txt')) {
      const name = "'" + obj.txt + "'";
      // console.log(obj);
      code = code.replace(new RegExp(name), 'params.' + key + '.txt');
    }
  }
  // console.log(code);
  return code;
}

// This function is suposed to transform svg syntax to make it compatible with our ReactJs generator
// TODO : Being able to load files from filesysytem because now we are doing it manualy
export function cleanSvg() {
   // filepath = PATH.resolve(__dirname, 'test.svg'),
  const svgo = new SVGO('config');
  FS.readFile('/home/dev/dev/src/LPISIS/GPCCHS/GPCCHS_E_CLT/src/impl/js/client/app/components/MimicComponent/randomShapes.svg', 'utf8', function (err, data) {
    if (err) {
      throw err;
    }

    svgo.optimize(data, function (result) {
    });
  });
}
// Convert() convert the svg string to React Code
export default function convert(svgString) {
  let idArray = [];

  svgStr = svgString;
  const idNames = svgString.match((/id=".+?"/g));
  // We have to delete the element's attributes that we will substitute with our state
  svgStr = svgStr.replace(/(transform=".+?")/g, '');
  svgStr = svgStr.replace(/(fill=".+?")/g, '');
  // We parametrize attributes
  addSvgParams(svgStr, idNames);

  let trans = babel.transform(svgStr, {
    code: true,
    sourceMaps: true

  });

  let ast = replace(trans.ast.program, {
    enter(node, parent) {
      if (isReactCreateElement(node)) this.inCreateElCall = true;
      // check if we are inside a react props object
      if (this.inCreateElCall && parent.type === 'ObjectExpression') {
        camelizeProps(node, parent, this);
        if (isPropertyIdentifierWithNames(node, ['id'])) {
          lastId = node.value.value;
          if (!idArray.includes(id)) idArray.push(node.value.value);
        }
      }
    },
    leave(node, parent) {
      if (isReactCreateElement(node)) this.inCreateElCall = false;
    }
  });

  ast = makeLastStatementReturn(ast);
  // Retruns a function that take as parameter a dictionary which represents the svg state

  return Array(idArray, Function('params', 'React', parametrizeText(generate(ast).replace(/('use strict';)\n/, ''))));
}

// makes svg's attributes a paramater of our object
function addSvgParams(svgS, ids) {
  for (id of ids) {
    let idString = id.match(/"(.+?)"/);
    idString = idString[0].replace(/"/g, '');
    const tmp1 = id;
    const tmp2 = id + ' {...params.' + idString + '}';
    svgStr = svgStr.replace(new RegExp(tmp1), tmp2);
  }
}

// make attributes first letter upper-casa
function camelizeProps(node, parent) {
  if (node.type === 'Property' && node.key.type === 'Literal') {
    node.key = {
      'type': 'Identifier',
      'name': camelize(node.key.value)
    };
    return node;
  }
}


function makeLastStatementReturn(ast) {
  var idx = ast.body.length - 1;
  var lastStatement = ast.body[idx];
  console.log(lastStatement);

  if (lastStatement && lastStatement.type !== 'ReturnStatement') {
    ast.body[idx] = {
      'type': 'ReturnStatement',
      'argument': lastStatement
    };
  }

  return ast;
}
// Upercase -composed attributes
function camelize(string) {
  return string.replace(/-(.)/g, function (_, letter) {
    return letter.toUpperCase();
  });
}

function isPropertyIdentifier(node) {
  return node.type === 'Property' && node.key.type === 'Identifier';
}

// Check if the idetifier is contained in names
function isPropertyIdentifierWithNames(node, names) {
  var itIs = false;
  if (!isPropertyIdentifier(node)) return false;

  for (var i = 0; i < names.length; i++) {
    if (names[i] === node.key.name) {
      itIs = true;
      break;
    }
  }

  return itIs;
}

function isReactCreateElement(node) {
  return (
    node.type === 'CallExpression'
    && (node.callee.object && node.callee.object.name === 'React')
    && (node.callee.property && node.callee.property.name === 'createElement')
  );
}
