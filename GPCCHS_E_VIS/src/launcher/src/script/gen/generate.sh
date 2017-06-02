#!/bin/bash -e

PRG="$0"
EXEC_DIR=`dirname ${PRG}`
export PRGDIR=`(cd ${EXEC_DIR} ; echo $PWD)`
export COMPDIR=`(cd ${PRGDIR}/..; echo $PWD)`

. ${EXEC_DIR}/lib/const.sh
. ${EXEC_DIR}/lib/logging.sh

deploy_cots() {
  Log "deploy_cots" "starting" ${INFO}

  Log "deploy_cots" "remove previous build (lib)" ${INFO}
  rm -rf ${api.lib.dir}
  mkdir -p ${api.lib.dir}/js/${project.artifactId}

  Log "deploy_cots" "remove previous build (work)" ${INFO}
  rm -rf ${api.work.dir}
  mkdir -p ${api.work.dir}/js/client

  Log "deploy_cots" "copy client code in work dir" ${INFO}
  cp -RT ${find.dependencies.dir}/lib/js/gpcchs_e_vis_client ${api.work.dir}/js/client
  cd ${api.work.dir}/js/client

  Log "deploy_cots" "specific COTS handling (e.g.: ZMQ)" ${INFO}
  export PKG_CONFIG_PATH=${find.dependencies.dir}/lib/pkgconfig
  sed -i "s@^prefix=.*\$@prefix=${find.dependencies.dir}@" ${PKG_CONFIG_PATH}/*.pc
  sed -i "s@^libdir=.*\$@libdir=\'${find.dependencies.dir}/lib\'@" ${find.dependencies.dir}/lib/*.la
  sed -i "s@ISIS_PREFIX_ROOT@${find.dependencies.dir}@g" ${find.dependencies.dir}/lib/*.la

  Log "deploy_cots" "configuring NPM" ${INFO}
  NPM_PROJECT_CONFIG=${api.work.dir}/.npmrc
  NPM_CACHE_DURATION=${NPM_CACHE_DURATION:-400000000}
  NPM_USER_CONFIG=${NPM_USER_CONFIG:-${NPM_PROJECT_CONFIG}}
  NPM_OPTS1="--userconfig=${NPM_PROJECT_CONFIG}"
  NPM_OPTS2="--userconfig=${NPM_USER_CONFIG}"
  PATH=${find.dependencies.dir}/bin:$PATH
  export npm_config_nodedir=${find.dependencies.dir}
  npm ${NPM_OPTS1} config set cache ${find.dependencies.dir}/npm_cache
  npm ${NPM_OPTS1} config set cache-min ${NPM_CACHE_DURATION}
  # workaround for electron downloads
  HOME=${find.dependencies.dir}

  MAVEN_BUILDING=1

  Log "deploy_cots" "installing NPM dependencies in client" ${INFO}
  npm ${NPM_OPTS2} install
  Log "deploy_cots" "installing common dependency in client" ${INFO}
  npm ${NPM_OPTS2} install ${find.dependencies.dir}/lib/js/common || true
  Log "deploy_cots" "installing rtd dependency in client" ${INFO}
  npm ${NPM_OPTS2} install ${find.dependencies.dir}/lib/js/rtd || true

  Log "deploy_cots" "building main process package" ${INFO}
  npm run build:main

  Log "deploy_cots" "building renderer process package" ${INFO}
  npm run build:renderer

  Log "deploy_cots" "building server process package" ${INFO}
  npm run build:server

  Log "deploy_cots" "packaging electron application" ${INFO}
  npm run package:electron -- --download.cache=${find.dependencies.dir}/.electron/
  mv ./dist/lpisis_gpcchs_e_clt-linux-x64 ${api.lib.dir}/js/${project.artifactId}/client
#  ${api.work.dir}/js/client/node_modules/.bin/electron-packager ./toPackage --no-prune --out=${api.lib.dir}/js/${project.artifactId} --overwrite --download.cache=${find.dependencies.dir}/.electron/
}

Log "generate" "generate all" ${INFO}
deploy_cots


