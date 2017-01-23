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
  mkdir -p ${api.lib.dir}/js

  cp -RT ${basedir}/src/impl/js/client ${api.lib.dir}/js/${artifactId}
  rm -rf ${api.lib.dir}/js/${artifactId}/node_modules

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

}

Log "generate" "generate all" ${INFO}
deploy_cots
