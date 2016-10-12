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
  mkdir -p ${api.work.dir}/js/${artifactId}/node_modules

  rm -rf ${api.lib.dir}
  mkdir -p ${api.lib.dir}/js/${artifactId}

  cp -R ${basedir}/src/impl/js/client/* ${api.work.dir}/js/${artifactId}
  cp -R ${basedir}/src/impl/js/client/.* ${api.work.dir}/js/${artifactId}
  cp -R ${api.target.dir}/dependencies/lib/js/**/node_modules/* ${api.work.dir}/js/${artifactId}/node_modules

  cd ${api.work.dir}/js/${artifactId}

  node -r babel-register ${api.lib.dir}/js/${artifactId}/node_modules/webpack/bin/webpack --config webpack.config.electron.js --progress --profile --colors

  node -r babel-register ${api.lib.dir}/js/${artifactId}/node_modules/webpack/bin/webpack --config webpack.config.production.js --progress --profile --colors

  cp -R ${api.work.dir}/js/${artifactId}/dist ${api.lib.dir}/js/${artifactId}/

  cp ${api.work.dir}/js/${artifactId}/main.js ${api.lib.dir}/js/${artifactId}

  cp ${api.work.dir}/js/${artifactId}/main.js.map ${api.lib.dir}/js/${artifactId}


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

