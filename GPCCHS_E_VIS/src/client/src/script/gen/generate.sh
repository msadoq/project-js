#!/bin/bash -e

PRG="$0"
EXEC_DIR=`dirname ${PRG}`
export PRGDIR=`(cd ${EXEC_DIR} ; echo $PWD)`
export COMPDIR=`(cd ${PRGDIR}/..; echo $PWD)`

. ${EXEC_DIR}/lib/const.sh
. ${EXEC_DIR}/lib/logging.sh

deploy_cots() {
  Log "deploy_bundle" "deploy js bundle" ${INFO}
  rm -rf ${api.lib.dir}
  mkdir -p ${api.lib.dir}/js

  cp -RT ${basedir}/src/main/js/client ${api.lib.dir}/js/${project.artifactId}
  rm -rf ${api.lib.dir}/js/${project.artifactId}/node_modules

  cd ${api.lib.dir}/js/${project.artifactId}
}

Log "generate" "generate all" ${INFO}
deploy_cots
