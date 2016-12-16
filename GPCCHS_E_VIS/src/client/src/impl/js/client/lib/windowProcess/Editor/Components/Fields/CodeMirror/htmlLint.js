import HTMLHint from 'htmlhint';

export const HtmlLint = (CodeMirror) => {
  const defaultRules = {
    'tagname-lowercase': true,
    'attr-lowercase': true,
    'attr-value-double-quotes': true,
    'doctype-first': false,
    'tag-pair': true,
    'spec-char-escape': true,
    'id-unique': true,
    'src-not-empty': true,
    'attr-no-duplication': true
  };

  console.log('registerHelper before');
  CodeMirror.registerHelper('lint', 'html', (text, options) => {
    console.log('registerHelper', text, options);
    const found = [];
    const messages = HTMLHint.verify(text, (options && options.rules) || defaultRules);
    for (let i = 0; i < messages.length; i += 1) {
      const message = messages[i];
      const startLine = message.line - 1;
      const endLine = message.line - 1;
      const startCol = message.col - 1;
      const endCol = message.col;
      found.push({
        from: CodeMirror.Pos(startLine, startCol),
        to: CodeMirror.Pos(endLine, endCol),
        message: message.message,
        severity: message.type
      });
    }
    return found;
  });
};

export default HtmlLint;
