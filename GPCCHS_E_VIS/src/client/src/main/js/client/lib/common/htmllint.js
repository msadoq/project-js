import { HTMLHint } from 'htmlhint';

export const defaultRules = {
  'tagname-lowercase': true,
  'attr-lowercase': true,
  'attr-value-double-quotes': false,
  'doctype-first': false,
  'tag-pair': true,
  'spec-char-escape': true,
  'id-unique': true,
  'src-not-empty': true,
  'attr-no-duplication': true,
};

export const lint = (html, rules = {}) =>
  HTMLHint.verify(html, { ...rules, ...defaultRules });

export default lint;
