const htmllint = require('htmllint');

export function lint(html, opts) {
  return htmllint(html, opts);
}

export default lint;
