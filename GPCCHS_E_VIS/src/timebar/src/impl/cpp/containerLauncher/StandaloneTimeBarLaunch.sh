#!/bin/bash

####################
##   Functions    ##
####################

function usage
{
  echo ""
  echo "usage ./StandaloneTimeBarLaunch.sh [options]"
  echo ""
  echo "Options:"
  echo " -h,--help            Display help information"
  echo " -d,--debug           Run the application in debug mode"
  echo " -n,--debugCont       Run the application with the
                      container in debug mode"
  echo " -c,--config <arg>    Use a configuration file"
  echo " --valgrind                   Launch with valgring memcheck.
                        Result available in /tmp/valgrind.txt WARNING once used GDB will not work, use mvnci before"
}

#############################
##   Options management    ##
#############################

CML_DEBUG=""
CONTAINER_TIMEOUT=30
USER_MONITOR_TIMEOUT=""
CONFIG=""
while [ "$1" != "" ]; do
  case $1 in
    -h | --help )
      usage
      exit
      ;;
    --valgrind )
      if [ "$CML_DEBUG" = "" ]
      then
        USER_MONITOR_TIMEOUT=3600
	CONTAINER_TIMEOUT=2000
        CML_DEBUG="-debug GUICPP:profile"
      fi
      ;;
    -d | --debug )
      if [ "$CML_DEBUG" = "" ]
      then
        USER_MONITOR_TIMEOUT=3600
	CONTAINER_TIMEOUT=100
        CML_DEBUG="-debug GUICPP:run"
      fi
      ;;
    -n | --debugCont )
      if [ "$CML_DEBUG" = "" ]
      then
        CML_DEBUG="-debug CONT:run"
      fi
      ;;
    -c | --config )
      shift
      if [ "$CONFIG" = "" ]
      then
        CONFIG="$1"
      fi
      ;;
    * )
      usage
      exit 1
  esac
  shift
done
export USER_MONITOR_TIMEOUT
export CONTAINER_TIMEOUT

##################################
##   Clean all before launch    ##
##################################

trap 'rm -rf /tmp/ipc* /tmp/Re* /tmp/ActorID* /tmp/OIDGenerat*; exit' 2
trap 'rm -rf /tmp/ipc* /tmp/Re* /tmp/ActorID* /tmp/OIDGenerat*; exit' 3
trap 'echo SIGSEGV received; exit' 11

# kill all processes in case it is usefull
pkill -9 gpcc & pkill -9 redis & pkill -9 dbus-launch

#Remove the redis and rtd conf directories
rm -rf /tmp/redis/ /tmp/rtd/ /tmp/workingRedis.sock /tmp/redis.sock  /tmp/catalogs /tmp/*.pid /tmp/containerCfg_*.xml /tmp/GDB.*


#########################################
##   Build environment for execution   ##
#########################################

# Port number for timebar communication
export PORT_NUM_TIMEBAR_PULL=17501
export PORT_NUM_TIMEBAR_PUSH_TB1=17500
export PORT_NUM_TIMEBAR_PUSH_TB2=17502

# Location of test project
LOC=$(dirname $(which $0))
cd $LOC
# Local target directory
LOCAL_TARGET_DIR=$LOC/target

##### Build Run directory #####

# DONE AT COMPILE TIME
#Merge Local and dependencies resources into a unique directory tree
#${BUILD_RUNDIR}


##### Script variables #####

# Define localIP
LOCAL_IP=127.0.0.1

# Source ISIS environment
. ${LOCAL_TARGET_DIR}/dependencies/share/scripts/ISIS.env

RUNDIR=${LOCAL_TARGET_DIR}/run
BINDIR=${RUNDIR}/bin
CONTAINERUTILS_ENV=${BINDIR}/containerUtils.env
PROCCMD=${LOCAL_TARGET_DIR}/dependencies/bin/gpcctc_l_cnt_isisStartContainer_cmd${GPCCTC_VERSION}

export PATH=$PATH:$LOCAL_TARGET_DIR/run/bin/
export LD_LIBRARY_PATH=$LOCAL_TARGET_DIR/run/lib/so:$LOCAL_TARGET_DIR/run/lib:$LOCAL_TARGET_DIR/run:$LD_LIBRARY_PATH
export PYTHONPATH=$LOC/target/dependencies/lib/python3.4/site-packages:$PYTHONPATH

# Source Container utils environment
. ${CONTAINERUTILS_ENV}

# Set the deployment directory
export USER_TARGET_DIR=$RUNDIR

# ISIS resources directory
export ISIS_RESOURCES_DIR=$LOC/target/dependencies/share


##### Redis configuration #####

export USER_REDIS_RTD_CONFIG_FILE=$LOCAL_TARGET_DIR/dependencies/share/conf/RedisRTDConfig.xml
#export USER_REDIS_PROPERTIES=$LOCAL_TARGET_DIR/resource/properties/Redis-properties.xml
export REDIS_WORKING_DIR=/tmp


##### Session library Stub Environment #####

# Variable to be set for SessionLibrary_stub use
export STUB_SESSION_XML_PATH=$LOC/target/dependencies/share/config/sessionList.xml

# Use of session library stub instead of real library
cp $LOC/target/dependencies/lib/so/libgpin_sessionLibrary_stub.so.${GPCCTC_VERSION} \
  $LOC/target/dependencies/lib/so/libgpin_sessionLibrary.so.${GPCCTC_VERSION}


###### FMD Environment ##### -- useless here


##### Log API Variables ####
export USER_LOGGER_FACTORY_CPP_URL="fr.cnes.isis.gpcc.cpp/gpcctc_l_lof_logApi/gpcctc_l_lof_logApi-${GPCCTC_VERSION}"
export USER_LOGGER_FACTORY_PYTHON_URL="fr.cnes.isis.gpcc.python/gpcctc_l_lof_logApi/gpcctc_l_lof_logApi-${GPCCTC_VERSION}"


##### CML Variables ####

# Source Qt environment
. ${LOCAL_TARGET_DIR}/dependencies/share/cmake/FindQt.env

# Variable to be set for "QtQuick not installed" error
export QML2_IMPORT_PATH=$LOC/target/dependencies/qml
# Probably not required:
export QML_IMPORT_PATH=$LOC/target/dependencies/qml
# Qt plugin path
export QT_PLUGIN_PATH=$QT_PLUGIN_PATH:$LOCAL_TARGET_DIR/run/lib/so:$LOCAL_TARGET_DIR/plugins

export GPCCCM_XSD_DIR=$ISIS_RESOURCES_DIR/xsd/vi


##############################
##    Start REDIS server    ##
##############################
echo "*******************************************"
echo "Starting REDIS"
echo "*******************************************"
# Merge done by gpcccm_l_cml_testCatalogs
. startRedis --skip-merge


######################################
##    CONTAINER Directory server    ##
######################################
echo "*******************************************"
echo "Starting DIRECTORY SERVER and launch feature"
echo "*******************************************"
. startContainer -bootstrap -network ${LOCAL_IP} tcp://${LOCAL_IP}:10000 FeatureBootstrap.xml
DIRECTORY_PID=$CONTAINER_PID

sleep 3
checkProcess $DIRECTORY_PID


#########################
#    CONTAINER TEST     #
#########################

#Start a container for running test bundle
echo "*******************************************"
echo "Starting TEST Container"
echo "*******************************************"
. startContainer $CML_DEBUG -standalone -network ${LOCAL_IP} tcp://${LOCAL_IP}:10000
TEST_CONTAINER_PID=$CONTAINER_PID

sleep 3
checkProcess $TEST_CONTAINER_PID

########################################
#       Launch STANDALONE TIMEBAR      #
########################################

echo "### Create FEATURE STANDALONE TIMEBAR"
#Create the Feature
OUTPUT=$(${PROCCMD} -p $TEST_CONTAINER_PID -t 2000 -- ccreate featureStandaloneTimeBar.xml)
checkResult "$OUTPUT"
sleep 1
EID_TEST=$(readEid "$OUTPUT")

echo "### ACTIVATE STANDALONE TIMEBAR FEATURE"
#Start bundle on process (no configuration required)
OUTPUT=$($PROCCMD -p $TEST_CONTAINER_PID -t 2000 -- cactivate "$EID_TEST")
checkResult "$OUTPUT"
sleep 1

echo "### START STANDALONE TIMEBAR FEATURE"
OUTPUT=$($PROCCMD -p $TEST_CONTAINER_PID -t 2000 -- cstart "$EID_TEST")
checkResult "$OUTPUT"
sleep 1

echo "### STANDALONE TIMEBAR LAUNCHED"

################################################################
#################### Clean all after launch ####################
################################################################

# Wait a key to finish and kill container Process
read key

#Remove ipc
rm -rf /tmp/ipc* /tmp/ActorID* /tmp/OIDGenerat*

#Kill previous instance of REDIS_SERVER
killall -9 redis-server

#Remove the redis and rtd conf directories
rm -rf /tmp/redis/ /tmp/rtd/

# Remove core
rm -rf core.*

#Kill containers after test
pkill -9 gpcctc_l_cnt_is

#Remove plugins
rm -rf ${LOCAL_TARGET_DIR}/plugins
