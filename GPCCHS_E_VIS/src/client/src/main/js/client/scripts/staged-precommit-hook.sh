#!/bin/bash
git stash -u --keep-index &> /dev/null

trap noop INT

function noop() {
  return
}

function exitSuccess() {
  git stash pop &> /dev/null
  exit 0
}

function exitError() {
  git stash pop &> /dev/null
  exit 1
}

# Do not lint adapters (workaround for https://stackoverflow.com/questions/37927772/how-to-silence-warnings-about-ignored-files-in-eslint)
./node_modules/.bin/eslint --max-warnings 0 `echo $@ | tr ' ' '\n' | grep -ve '^/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/main/js/client/benchmarks' | grep -ve '^/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/main/js/client/adapters' | xargs`
EXIT_CODE=$?
if [ $EXIT_CODE -gt 0 ]; then
  exitError
fi

NODE_ENV=test ./node_modules/.bin/jest --findRelatedTests $@
EXIT_CODE=$?
if [ $EXIT_CODE -gt 0 ]; then
  exitError
fi

exitSuccess
