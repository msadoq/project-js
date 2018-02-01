#!/bin/bash

### This scripts automatically clone GPDS repo in /data/work/gitRepositories/LPISIS

GPDS_FOLDER=GPDS

cd /data/work/gitRepositories/LPISIS
[ -d ./$GPDS_FOLDER ] && echo GPDS is already cloned. || git clone gitolite@isis.cnes-isis.toulouse.atos.net:gpds/LPISIS/GPDS.git ./$GPDS_FOLDER

cd $GPDS_FOLDER
git checkout R10-fwk
git pull origin R10-fwk
