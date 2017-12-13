// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #6129 : 03/05/2017 : first functionnal mimic with animations
// END-HISTORY
// ====================================================================

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
  HTMLHint.verify(html, Object.assign(defaultRules, rules));

export default lint;
