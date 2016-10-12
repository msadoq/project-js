#!/bin/bash

PRG="$0"
EXEC_DIR=`dirname ${PRG}`
export PRGDIR=`(cd ${EXEC_DIR} ; echo $PWD)`
export COMPDIR=`(cd ${PRGDIR}/..; echo $PWD)`

. ${EXEC_DIR}/lib/const.sh
. ${EXEC_DIR}/lib/logging.sh

untar() {
	Log "untar" "untar sources" ${INFO}
	rm -rf ${api.work.dir}
	mkdir ${api.work.dir}
	cd ${api.work.dir}
	tar -xzf ${api.archive.file}
	unzip -u ${api.archive.build.file}
}

deploy_cots() {
  Log "deploy_bundle" "deploy js bundle" ${INFO}
  rm -rf ${api.lib.dir}
  mkdir -p ${api.lib.dir}/js/${artifactId}/node_modules
  mkdir -p ${api.lib.dir}/js/${artifactId}/client
  mkdir -p ${api.lib.dir}/js/${artifactId}/server
  mkdir -p ${api.lib.dir}/js/${artifactId}/common

  cd ${basedir}	

  cp -R ../client/target/lib/js/gpcchs_e_vis_client/* ${api.lib.dir}/js/${artifactId}/client
  cp -R ../server/target/lib/js/gpcchs_e_vis_server/* ${api.lib.dir}/js/${artifactId}/server
  cp -R ${api.target.dir}/dependencies/lib/js/**/node_modules/* ${api.lib.dir}/js/${artifactId}/node_modules
  cp -R ${api.target.dir}/dependencies/lib/js/**/node_modules/.bin ${api.lib.dir}/js/${artifactId}/node_modules
}

case "$1" in
	untar)
		untar
		;;
	deploy_cots)
		deploy_cots
		;;
	*)
		Log "generate" "generate all" ${INFO}
		deploy_cots
esac

