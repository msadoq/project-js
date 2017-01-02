#!/bin/bash -e

PRG="$0"
EXEC_DIR=`dirname ${PRG}`
export PRGDIR=`(cd ${EXEC_DIR} ; echo $PWD)`
export COMPDIR=`(cd ${PRGDIR}/..; echo $PWD)`

. ${EXEC_DIR}/lib/const.sh
. ${EXEC_DIR}/lib/logging.sh

deploy_cots() {
  Log "deploy_bundle" "deploy js bundle" ${INFO}
  rm -rf ${api.work.dir}
  mkdir -p ${api.work.dir}

  rm -rf ${api.lib.dir}
  mkdir -p ${api.lib.dir}/js

  cp -RT ${basedir}/src/impl/js/server ${api.lib.dir}/js/${artifactId}

  cd ${api.lib.dir}/js/${artifactId}

  python3 << EOF
import json
import collections

with open("package.json") as package_file:
    package_json=json.load(package_file, object_pairs_hook=collections.OrderedDict)
    if "peerDependencies" in package_json:
         if "common" in package_json["peerDependencies"]:
             del package_json["peerDependencies"]["common"]

with open("package.json", "w") as package_file:
    package_file.write(json.dumps(package_json, indent=2))

EOF

  # Handling of COTS such as zmq
  export PKG_CONFIG_PATH=${find.dependencies.dir}/lib/pkgconfig
  sed -i "s@^prefix=.*\$@prefix=${find.dependencies.dir}@" ${PKG_CONFIG_PATH}/*.pc
  sed -i "s@^libdir=.*\$@libdir=\'${find.dependencies.dir}/lib\'@" ${find.dependencies.dir}/lib/*.la
  sed -i "s@ISIS_PREFIX_ROOT@${find.dependencies.dir}@g" ${find.dependencies.dir}/lib/*.la

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

  npm ${NPM_OPTS2} install .
  npm ${NPM_OPTS2} install ${find.dependencies.dir}/lib/js/common -S
}

Log "generate" "generate all" ${INFO}
deploy_cots

