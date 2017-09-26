#!/bin/bash -e

# ====================================================================
# HISTORY
# VERSION : 1.1.0 : : : 28/02/2017 : Initial version
# VERSION : 1.1.2 : FA : #6762 : 02/06/2017 : Update poms due to removing server package
# END-HISTORY
# ====================================================================

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
