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
  mkdir -p ${api.work.dir}/js/${artifactId}/node_modules
  mkdir -p ${api.work.dir}/js/${artifactId}/toPackage/node_modules

  rm -rf ${api.lib.dir}
  mkdir -p ${api.lib.dir}/js/${artifactId}

  cp -R ${basedir}/src/impl/js/client/* ${api.work.dir}/js/${artifactId}
  cp -R ${basedir}/src/impl/js/client/.* ${api.work.dir}/js/${artifactId}
  cp -R ${api.target.dir}/dependencies/lib/js/cots-client/node_modules/* ${api.work.dir}/js/${artifactId}/node_modules

  cd ${api.work.dir}/js/${artifactId}

  cp -R ../../../dependencies/lib/js/cots-common/node_modules ../../../dependencies/lib/js/common	
  cp -R ../../../dependencies/lib/js/common ./node_modules

  cp -R cp -R ./node_modules/source-map-support ./toPackage/node_modules/
  cp -R cp -R ./node_modules/source-map ./toPackage/node_modules/

  
  node -r babel-register ${api.work.dir}/js/${artifactId}/node_modules/webpack/bin/webpack --config webpack.config.electron.js --progress --profile --colors

  node -r babel-register ${api.work.dir}/js/${artifactId}/node_modules/webpack/bin/webpack --config webpack.config.production.js --progress --profile --colors

  cp -R ${api.work.dir}/js/${artifactId}/dist ${api.work.dir}/js/${artifactId}/toPackage/

  cp ${api.work.dir}/js/${artifactId}/main.js ${api.work.dir}/js/${artifactId}/toPackage

  cp ${api.work.dir}/js/${artifactId}/main.js.map ${api.work.dir}/js/${artifactId}/toPackage

  cp ${api.work.dir}/js/${artifactId}/package.json ${api.work.dir}/js/${artifactId}/toPackage

  electron-packager ./toPackage --out=${api.lib.dir}/js/${artifactId}

}

Log "generate" "generate all" ${INFO}
deploy_cots


