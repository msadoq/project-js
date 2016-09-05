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
  rm -rf ${api.work.dir}
	mkdir ${api.work.dir}
	cd ${api.work.dir}

	mkdir -p ${api.lib.dir}/js/server

  rm -rf ${api.lib.dir}/js/server/node_modules
  mkdir ${api.lib.dir}/js/server/node_modules

	cp -R ${basedir}/src/main/js/server ${api.lib.dir}/js
  cp -R ${api.target.dir}/dependencies/lib/js/**/node_modules/* ${api.lib.dir}/js/server/node_modules
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

