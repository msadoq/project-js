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

  mkdir -p ${api.lib.dir}/js/${artifactId}

  rm -rf ${api.lib.dir}/js/${artifactId}/node_modules
  mkdir ${api.lib.dir}/js/${artifactId}/node_modules

  cp -R ${basedir}/src/impl/js/server/* ${api.lib.dir}/js/${artifactId}
  cp -R ${basedir}/src/impl/js/server/.* ${api.lib.dir}/js/${artifactId}
  cp -R ${api.target.dir}/dependencies/lib/js/**/node_modules/* ${api.lib.dir}/js/${artifactId}/node_modules
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

