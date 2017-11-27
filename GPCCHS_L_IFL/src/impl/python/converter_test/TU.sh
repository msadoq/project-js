#!/bin/bash
PRG="$0"

EXEC_DIR=`dirname ${PRG}`
export PRGDIR=`(cd ${EXEC_DIR} ; echo $PWD)`
export COMPDIR=`(cd ${PRGDIR}/..; echo $PWD)`

# go to TU.sh directory, needed by buildRunDir script
cd $PRGDIR

#Load ISIS environment
. $PRGDIR/target/dependencies/share/scripts/ISIS.env

export PATH=$PRGDIR/target/dependencies/bin/:$PATH
export LD_LIBRARY_PATH=$PRGDIR/target/dependencies/lib:$PRGDIR/target/dependencies/lib/so:$LD_LIBRARY_PATH

#################################
# Clean environment
#################################
function cleanUp()
{
    echo "Cleaning..."

    cleanPid --all

}

# trap Ctrl+C or exit signals
trap cleanUp TERM STOP EXIT INT SEGV


##################################
#Build environment for execution
##################################
RUNDIR=target/run
buildRunDir $RUNDIR

# Source container utlis functions : checkProcess, checkResult, replace_ISIS_WORK_DIR
. containerUtils.env

# Prepare/clean older to store test reports
if [ -d $PRGDIR/target/test-reports ] ; then
    rm $PRGDIR/target/test-reports/*.xml
else
    mkdir -p $PRGDIR/target/test-reports
fi

#################################
# Run test bundle
#################################

# Define localIP
LOCAL_IP=127.0.0.1

#Set the deployment directory
export USER_TARGET_DIR="$PRGDIR/$RUNDIR"

#Start REDIS server
echo "************************************"
echo "********** Starting REDIS **********"
echo "************************************"
startRedis
export REDIS_SOCKET_PATH=${ISIS_WORK_DIR}"/redis.sock"

#Start a container for GPCCHS_L_IFL-Converter
echo "*****************************************************************************************"
echo "********** Launching feature bootstrap : Directory Client, Slot server, LibCom **********"
echo "*****************************************************************************************"
. startContainer -standalone -network ${LOCAL_IP} tcp://${LOCAL_IP}:10000 -name "FeatureBootstrap" -bootstrap FeatureBootstrap.xml

# Wait for the end of the init
gpcctc_l_cnt_isisStartContainer_cmd${GPCCTC_VERSION} -p $CONTAINER_PID -t 3 -- waitInitEnd

PID=$CONTAINER_PID
# check process is running
checkProcess $PID

#Load the test bundle
echo "***************************************************************"
echo "********* Loading GPCCHS_L_IFL-Converter-test bundle **********"
echo "***************************************************************"
OUTPUT=$(gpcctc_l_cnt_isisStartContainer_cmd${GPCCTC_VERSION} -p $PID -t 10 -- ccreate FeatureTest.xml )
# analayse the OUTPUT
checkResult "${OUTPUT}"

#checkResult "${OUTPUT}"
EID=$(readEid "${OUTPUT}")
echo "TEST created; EID=$EID"

#Activate it
echo "****************************************************************"
echo "********** Starting GPCCHS_L_IFL-Converter-test bundle *********"
echo "****************************************************************"
OUTPUT=$(gpcctc_l_cnt_isisStartContainer_cmd${GPCCTC_VERSION} -p $PID -t 10 -- cactivate "$EID" )
# analyse the OUTPUT
checkResult "${OUTPUT}"

#Finally, start test
echo "************************************************"
echo "**************** Starting TEST *****************"
echo "************************************************"
OUTPUT=$(gpcctc_l_cnt_isisStartContainer_cmd${GPCCTC_VERSION} -p $PID -t 10 -- cstart "$EID")
checkResult "${OUTPUT}"

# exit in error if the test report does not exist
if [ ! -f $PRGDIR/target/test-reports/GPCCHS_L_IFL-Converter-report*.xml ] ; then  exitWithErrorReport "Test report not found"; fi

cleanUp

echo "-----------------------------------------------------------------------------------"
echo "---------------- Test Finished see reports on target/test-reports------------------"
echo "-----------------------------------------------------------------------------------"

egrep -ri "error|failure"  target/test-reports/
echo ""

#Signal correct end of script if not exited before
exit 0