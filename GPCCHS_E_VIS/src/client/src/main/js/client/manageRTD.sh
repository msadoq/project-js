#!/bin/bash

LOC=`dirname $0`
SCRIPT_DIR=`(cd $LOC ; echo $PWD)`

RTD_BRANCH="R8-fwk"

RTD_REPO="gitolite@isis.cnes-isis.toulouse.atos.net:gpds/LPISIS/GPDS.git"


LPISIS_DIR="${SCRIPT_DIR}/../../../../../../../.."
GPDS_DIR="${LPISIS_DIR}/GPDS"
RTD_DIR="${GPDS_DIR}/src/api/js/rtd/src/main/js/rtd"

NODE_MODULES="${SCRIPT_DIR}/node_modules"
RTD_MODULE="${NODE_MODULES}/rtd"

goToClient() {
  cd ${SCRIPT_DIR} && return 0
}

goToGPDS() {
  cd ${GPDS_DIR} && return 0
}

onRightBranch() {
  if [[ $(git symbolic-ref --short HEAD) == "$RTD_BRANCH" ]]
  then
    return 0
  else
    return 1
  fi
}

noNeedToFetch() {
  if [[ $(git rev-parse @{0}) == $(git rev-parse @{u}) ]]
  then
    return 0
  else
    return 1
  fi
}

cloneGPDS() {
  echo "[RTD] cloning GPDS repository to ${GPDS_DIR}"
  git clone ${RTD_REPO} ${GPDS_DIR} && return 0
}

fetchGPDS() {
  echo "[RTD] fetching new commits"
  git fetch && return 0
}

pullGPDS() {
  echo "[RTD] updating ${RTD_BRANCH}"
  git pull --rebase && return 0
}

checkoutGPDS() {
  echo "[RTD] checking on ${RTD_BRANCH}"
  git checkout $RTD_BRANCH && return 0
}

copyRTD() {
  echo "[RTD] copying to ${NODE_MODULES}"
  rm -rf ${RTD_MODULE} && mkdir -p ${NODE_MODULES} && cp -r ${RTD_DIR} ${NODE_MODULES} && return 0
}

installRTD() {
  if [ -d ${GPDS_DIR} ]
  then
    goToGPDS && fetchGPDS
    if onRightBranch && noNeedToFetch
    then
      goToClient && copyRTD && exit 0
    else
      echo "[RTD] NOT UP TO DATE. SHOULD RUN 'npm run update-rtd' before reinstalling."
      exit 1
    fi
  else
    cloneGPDS && goToGPDS && checkoutGPDS && goToClient && copyRTD && exit 0
  fi
}

usage() {
  echo "Usage: $0 --install|--update|--copy"
}

if [ "$#" -eq 1 ]; then
  case "$1" in
    --install)
      installRTD
      shift
      ;;
    --update)
      goToGPDS && checkoutGPDS && pullGPDS
      shift
      ;;
    --copy)
      copyRTD
      shift
      ;;
    *)
      usage
      shift
      ;;
  esac
else
  usage
fi
