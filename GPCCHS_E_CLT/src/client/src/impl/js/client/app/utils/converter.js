
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\.\+\\\^\$\|]/g, '\\$&');
}
function dotRegExp(str) {
  return str.replace(/[\*\?]/g, '.$&');
}
export default function convertWildcard(str) {
  const start = '^';
  return start.concat(dotRegExp(escapeRegExp(str))).concat('$');
}
