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
  mkdir -p ${api.lib.dir}/js/${artifactId}/client
  mkdir -p ${api.lib.dir}/js/${artifactId}/server

  cp -RT ${find.dependencies.dir}/lib/js/gpcchs_e_vis_client/lpisis_gpcchs_e_clt-linux-x64 ${api.lib.dir}/js/${artifactId}/client
  cp -RT ${find.dependencies.dir}/lib/js/gpcchs_e_vis_server ${api.lib.dir}/js/${artifactId}/server

}

Log "generate" "generate all" ${INFO}
deploy_cots


