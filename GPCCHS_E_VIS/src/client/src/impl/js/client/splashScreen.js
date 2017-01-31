// SplashScreen definition
const Splash = {
  version: '2.4.0',
  enable: (theme) => {
    loadBody(($body) => {
      addClass($body, 'splashing');
      const $splash = splashDiv();
      $body.appendChild($splash);
      if (!theme || !themes[theme]) {
        theme = 'tailing'; // eslint-disable-line no-param-reassign
      }
      themes[theme]($splash);
      addClass($splash, theme);
    });
  },
  isRunning: () => {
    if (!document || !document.body) {
      return;
    }
    return hasClass(document.body, 'splashing');
  },
  destroy: () => {
    loadBody(($body) => {
      removeClass($body, 'splashing');
      const $splash = getSplash($body);
      if ($splash) {
        $body.removeChild($splash);
      }
    });
  }
};

const elementClass = (tag, className) => {
  const ele = document.createElement(tag);
  ele.setAttribute('class', className);
  return ele;
};
const elementTxt = (tag, text) => {
  const ele = document.createElement(tag);
  ele.innerText = text;
  return ele;
};
const splashDiv = () => elementClass('div', 'splash');

const tailingHandler = ($splash) => {
  $splash.appendChild(elementTxt('span', 'Loading'));
};
const windcatcherHandler = ($splash) => {
  for (let i = 0; i < 8; i += 1) {
    $splash.appendChild(elementClass('div', 'blade'));
  }
};
const circularHandler = ($splash) => {
  const arr = [
    'spinner-blue',
    'spinner-red',
    'spinner-yellow',
    'spinner-green'
  ];
  for (let i = 0; i < arr.length; i += 1) {
    const layer = elementClass('div', 'spinner-layer '.concat(arr[i]));
    const circleLeft = elementClass('div', 'circle-clipper left');
    const circle01 = elementClass('div', 'circle');
    circleLeft.appendChild(circle01);
    layer.appendChild(circleLeft);
    const gapPatch = elementClass('div', 'gap-patch');
    const circle02 = elementClass('div', 'circle');
    gapPatch.appendChild(circle02);
    layer.appendChild(gapPatch);
    const circleRight = elementClass('div', 'circle-clipper right');
    const circle03 = elementClass('div', 'circle');
    circleRight.appendChild(circle03);
    layer.appendChild(circleRight);
    $splash.appendChild(layer);
  }
};
const emptyHandler = () => {};
const themes = {
  tailing: tailingHandler,
  windcatcher: windcatcherHandler,
  'audio-wave': emptyHandler,
  'spinner-section': emptyHandler,
  'spinner-section-far': emptyHandler,
  circular: circularHandler
};
const hasClass = (ele, cls) => ele.className.match(
  new RegExp('(\\s|^)'.concat(cls).concat('(\\s|$)')));

const addClass = (ele, cls) => {
  if (!hasClass(ele, cls)) {
    ele.className += ' '.concat(cls); // eslint-disable-line no-param-reassign
  }
};
const removeClass = (ele, cls) => {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)'.concat(cls).concat('(\\s|$)'));
    ele.className = ele.className.replace(reg, ' '); // eslint-disable-line no-param-reassign
  }
};
const loadBody = (callback) => {
  let $body = document.body;
  if ($body) {
    callback($body);
    return;
  }
  setTimeout(() => {
    $body = document.body;
    if (!$body) {
      loadBody(callback);
      return;
    }
    callback($body);
  }, 100);
};
const getSplash = ($body) => {
  const children = $body.children;
  for (let i = 0; i < children.length; i += 1) {
    if (hasClass(children[i], 'splash')) {
      return children[i];
    }
  }
};
module.exports = Splash;
