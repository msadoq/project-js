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
  mkdir -p ${api.work.dir}/js/${artifactId}
  mkdir -p ${api.work.dir}/js/${artifactId}/toPackage/node_modules

  rm -rf ${api.lib.dir}
  mkdir -p ${api.lib.dir}/js/${artifactId}	
  cp -R ${basedir}/src/impl/js/client/* ${api.work.dir}/js/${artifactId}
  cp -R ${basedir}/src/impl/js/client/.babelrc ${api.work.dir}/js/${artifactId}
  cp ${basedir}/src/impl/js/client/.env.example ${api.work.dir}/js/${artifactId}

  cd ${api.work.dir}/js/${artifactId}
  tar xzvf ${api.target.dir}/dependencies/lib/js/cots-client/node_modules.tgz 

  cp -R ../../../dependencies/lib/js/cots-common/node_modules ../../../dependencies/lib/js/common	
  cp -R ../../../dependencies/lib/js/common ./node_modules	
  cp -R ../../../dependencies/lib/js/common ./toPackage/node_modules/

  cp -R ./node_modules/source-map-support ./toPackage/node_modules/
  cp -R ./node_modules/source-map ./toPackage/node_modules/

  
  NODE_ENV=production node -r babel-register ${api.work.dir}/js/${artifactId}/node_modules/webpack/bin/webpack --config webpack.config.electron.js --progress --profile --colors

  NODE_ENV=production node -r babel-register ${api.work.dir}/js/${artifactId}/node_modules/webpack/bin/webpack --config webpack.config.production.js --progress --profile --colors

  cp -R ${api.work.dir}/js/${artifactId}/dist ${api.work.dir}/js/${artifactId}/toPackage/

  cp ${api.work.dir}/js/${artifactId}/main.js ${api.work.dir}/js/${artifactId}/toPackage/

  cp ${api.work.dir}/js/${artifactId}/lib/windowProcess/index.html ${api.work.dir}/js/${artifactId}/toPackage/

  cp ${api.work.dir}/js/${artifactId}/main.js.map ${api.work.dir}/js/${artifactId}/toPackage/

  cp ${api.work.dir}/js/${artifactId}/package.json ${api.work.dir}/js/${artifactId}/toPackage/

  ${api.work.dir}/js/${artifactId}/node_modules/.bin/electron-packager ./toPackage --out=${api.lib.dir}/js/${artifactId} --overwrite --download.cache=.electron/

  cp -R ./toPackage/node_modules/common ${api.lib.dir}/js/${artifactId}/lpisis_gpcchs_e_clt-linux-x64/resources/app/node_modules

}

Log "generate" "generate all" ${INFO}
deploy_cots


