#!/bin/bash

PRG="$0"
EXEC_DIR=`dirname ${PRG}`
export PRGDIR=`(cd ${EXEC_DIR} ; echo $PWD)`
export COMPDIR=`(cd ${PRGDIR}/..; echo $PWD)`

. ${EXEC_DIR}/lib/const.sh
. ${EXEC_DIR}/lib/logging.sh

deploy_cots() {
  Log "deploy_bundle" "deploy js bundle" ${INFO}
  rm -rf ${api.work.dir}
  mkdir ${api.work.dir}
  cd ${api.work.dir}

  mkdir -p ${api.lib.dir}/js/${artifactId}

  rm -rf ${api.lib.dir}/js/${artifactId}/node_modules
  mkdir ${api.lib.dir}/js/${artifactId}/node_modules

  cp -R ${basedir}/src/impl/js/server/* ${api.lib.dir}/js/${artifactId}
  cp -R ${basedir}/src/impl/js/server/.* ${api.lib.dir}/js/${artifactId}
  cp -R ${api.target.dir}/dependencies/lib/js/cots-server/node_modules/* ${api.lib.dir}/js/${artifactId}/node_modules

  cd ${api.lib.dir}/js/${artifactId}

  cp -R ../../../dependencies/lib/js/cots-common/* ../../../dependencies/lib/js/common

  cp -R ../../../dependencies/lib/js/common ./node_modules

}

Log "generate" "generate all" ${INFO}
deploy_cots


