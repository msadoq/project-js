#!/bin/bash
git stash -u --keep-index &> /dev/null

# Do not lint adapters (workaround for https://stackoverflow.com/questions/37927772/how-to-silence-warnings-about-ignored-files-in-eslint)
./node_modules/.bin/eslint --max-warnings 0 `echo $@ | tr ' ' '\n' | grep -ve '^/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/main/js/client/adapters' | xargs`
EXIT_CODE=$?

git stash pop &> /dev/null
exit $EXIT_CODE
