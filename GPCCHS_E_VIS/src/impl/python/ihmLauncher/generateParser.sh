#/bin/bash

DEV_HOME="/data/work/gitRepositories/LPISIS"
if [ ! -d $DEV_HOME ] || [ ${#DEV_HOME} -eq 0 ] ; then
    echo "DEV_HOME not configured" ;
    exit 1
fi

[ -d $DEV_HOME/GPCCTC/GPCCTC_A_XML ] || ( echo "$DEV_HOME/GPCCTC/GPCCTC_A_XML not found" ; exit 1 )
XML_PRJ="$DEV_HOME/GPCCTC/GPCCTC_A_XML"
cd ${DEV_HOME}/GPCCHS/GPCCHS_E_VIS/src/impl/python/ihmLauncher/src/main/
$XML_PRJ/bin/xmlGenerator.sh -f -python ${DEV_HOME}/GPCCHS/GPCCHS_E_VIS/src/impl/python/ihmLauncher/src/main/resources/share/other/xsd/IhmLauncherConfig.xsd ${DEV_HOME}/GPCCHS/GPCCHS_E_VIS/src/impl/python/ihmLauncher/src/main/ GPCCHS_E_VIS.ihmLauncher
