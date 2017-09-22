#!/bin/bash
git stash -u --keep-index 2> /dev/null

./node_modules/.bin/eslint --max-warnings 0 $@
EXIT_CODE=$?

git stash pop 2> /dev/null
exit $EXIT_CODE
