#!/bin/bash
PRG="$0"
EXEC_DIR=$(dirname $PRG)

export PRGDIR=$(cd $EXEC_DIR ; echo $PWD)
export COMPDIR=$(cd $PRGDIR/.. ; echo $PWD)

export PATH=$PATH:$PRGDIR/target/dependencies/bin/
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$PRGDIR/target/dependencies/lib

BUILD_DIR=$(cd $EXEC_DIR/src/launcher/target/work/js/client ; echo $PWD)

# Prepare/clean older to store test reports
if [ -d $PRGDIR/target/test-reports ] ; then
    rm $PRGDIR/target/test-reports/*.xml
else
    mkdir -p $PRGDIR/target/test-reports
fi

cd $BUILD_DIR
TEST_REPORT_PATH=$PRGDIR/target/test-reports npm run test:pic
