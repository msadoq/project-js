const detectPattern = /(\*|\?)/;
export function detect(string) {
  return detectPattern.test(string);
}

// TODO memoize with lodash (string), no expiration
export function generate(string) {
  if (typeof string !== 'string') {
    return new RegExp();
  }

  let escaped = string;
  escaped = escaped.replace(/[-[\]/{}().+\\^$|]/g, '\\$&');
  escaped = escaped.replace(/[*?]/g, '.$&');
  return new RegExp(`^${escaped}$`);
}
