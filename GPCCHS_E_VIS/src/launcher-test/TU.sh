#!/bin/bash
PRG="$0"
EXEC_DIR=$(dirname $PRG)

export PRGDIR=$(cd $EXEC_DIR ; echo $PWD)
export COMPDIR=$(cd $PRGDIR/.. ; echo $PWD)

echo "EXEC_DIR:$PRGDIR"

export PATH=$PATH:$PRGDIR/target/dependencies/bin/
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$PRGDIR/target/dependencies/lib

BUILD_DIR=$(cd $EXEC_DIR/target/dependencies/lib/js/gpcchs_e_vis_client ; echo $PWD)
cd $BUILD_DIR

export dependencies_dir=$PRGDIR/target/dependencies

# Prepare/clean older to store test reports
if [ -d $PRGDIR/target/test-reports ] ; then
    rm $PRGDIR/target/test-reports/*.xml
else
    mkdir -p $PRGDIR/target/test-reports
fi

  export PKG_CONFIG_PATH=$PRGDIR/target/dependencies/lib/pkgconfig
  sed -i "s@^prefix=.*\$@prefix=$PRGDIR/target/dependencies@" ${PKG_CONFIG_PATH}/*.pc
  sed -i "s@^libdir=.*\$@libdir=\'$PRGDIR/target/dependencies/lib\'@" $PRGDIR/target/dependencies/lib/*.la
  sed -i "s@ISIS_PREFIX_ROOT@$PRGDIR/target/dependencies@g" $PRGDIR/target/dependencies/lib/*.la

  unset http_proxy
  unset https_proxy
  NPM_PROJECT_CONFIG=$PRGDIR/target/.npmrc
  NPM_CACHE_DURATION=${NPM_CACHE_DURATION:-400000000}
  NPM_USER_CONFIG=${NPM_USER_CONFIG:-${NPM_PROJECT_CONFIG}}
  NPM_OPTS1="--userconfig=${NPM_PROJECT_CONFIG}"
  NPM_OPTS2="--userconfig=${NPM_USER_CONFIG}"
  PATH=$PRGDIR/target/dependencies/bin:$PATH
  export npm_config_nodedir=$PRGDIR/target/dependencies

  npm ${NPM_OPTS1} config set cache $PRGDIR/target/dependencies/npm_cache
  npm ${NPM_OPTS1} config set cache-min ${NPM_CACHE_DURATION}
  # workaround for electron downloads
  HOME=$PRGDIR/target/dependencies

  export dependencies_dir=$PRGDIR/target/dependencies

  npm run prepare:maven:build

  npm ${NPM_OPTS2} install


$PWD
TEST_REPORT_PATH=$PRGDIR/target/test-reports npm run test:pic
