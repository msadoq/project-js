// TODO memoize and save few CPU cycles
const detectPattern = /(\*|\?)/;
export function detect(string) {
  return detectPattern.test(string);
}

export function generate(string) {
  if (typeof string !== 'string') {
    return new RegExp();
  }

  let escaped = string;
  escaped = escaped.replace(/[\-\[\]\/\{\}\(\)\.\+\\\^\$\|]/g, '\\$&');
  escaped = escaped.replace(/[\*\?]/g, '.$&');
  return new RegExp(`^${escaped}$`);
}
