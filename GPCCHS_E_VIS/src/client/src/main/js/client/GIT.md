# Git hooks

## Git prepare-commit-msg hook

It's may be useful to have some additional git local hooks.

here is a little script to add automatically prefix in the commit message :

```js
#!/usr/bin/env node
const fs = require('fs');

const fileName = process.argv[2];
const [firstLine, ...content] = fs.readFileSync(fileName).toString().split('\n');
const writeMsg = (content) => fs.writeFileSync(fileName, content.join('\n'));

const hasBracketPrefix = () => /^\[.*\]/.test(firstLine.trim());
const isHL = () => !!process.env['HL'];

if (process.env['BYPASS_HOOKS']) {
  return;
}

if (hasBracketPrefix()) {
  return;
}

if (!isHL() && !process.env['TICKET']) {
  console.error('Unable to commit, please set the TICKET environment variable');
  process.exit(1);
}

const prefix = process.env['HL'] ? '[HL] ' : `[FT:#${process.env['TICKET']}] `;

writeMsg([prefix + firstLine, ...content])

```

#### Installation
copy this script in `/data/work/gitRepositories/LPISIS/GPCCHS/.git/hooks/prepare-commit-msg`

#### Usage
```bash
# [FT:#xxxx] <msg>
export TICKET=3622 # to set the task number.
git c -m 'Your message'

# [HL] <msg>
HL=1 git c -m 'Hors Livraison'
```

if you want to bypass `prepare-commit-msg` hook, you can set the `BYPASS_HOOKS` environment variable to 1.
example:
```bash
BYPASS_HOOKS=1 git commit
```

## Git pre-commit hook

```bash
#!/bin/sh
HAS_DESCRIBE_ONLY=$(git grep --cached "describe\.only" -- '*.spec.js' | wc -l)
HAS_DESCRIBE_SKIP=$(git grep --cached "describe\.skip" -- '*.spec.js' | wc -l)
HAS_IT_ONLY=$(git grep --cached "it\.only" -- '*.spec.js' | wc -l)
HAS_IT_SKIP=$(git grep --cached "it\.skip" -- '*.spec.js' | wc -l)

function error() {
	echo ====== ERROR ======
	echo "Do not commit '$1'"
	exit 1
}

if [[ "$BYPASS_HOOKS" -eq "1" ]]; then
  exit 0
fi

if [[ "$HAS_DESCRIBE_ONLY" -ne "0" ]]; then
	error describe.only
fi

if [[ "$HAS_DESCRIBE_SKIP" -ne "0" ]]; then
	error describe.skip
fi

if [[ "$HAS_IT_ONLY" -ne "0" ]]; then
	error it.only
fi

if [[ "$HAS_IT_SKIP" -ne "0" ]]; then
	error it.skip
fi

```

#### Installation
copy this script in `/data/work/gitRepositories/LPISIS/GPCCHS/.git/hooks/pre-commit`

#### Usage
just make a normal commit, it will be rejected when you forget a `describe.only`, `describe.skip`, `it.only` or `it.skip`

if you want to bypass `pre-commit` hook, you can set the `BYPASS_HOOKS` environment variable to 1.
example:
```bash
BYPASS_HOOKS=1 git commit
```
