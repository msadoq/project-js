#!/bin/sh

# ====================================================================
# HISTORY
# VERSION : 1.1.2 : FA : #6762 : 02/06/2017 : Add a starting script to test packaged vima
# VERSION : 1.1.2 : FA : #6670 : 13/06/2017 : Fix packaging stubProcess . .
# VERSION : 1.1.2 : FA : #6762 : 16/06/2017 : Fix stubProcess packaging in scripts/start.sh
# VERSION : 1.1.2 : FA : #6798 : 27/06/2017 : Fix dynamic require in packaging production mode
# VERSION : 1.1.2 : FA : #7355 : 28/07/2017 : Add darwin compat to scripts/start.sh
# VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
# END-HISTORY
# ====================================================================

APP_FOLDER=./dist/lpisis_gpcchs_e_clt-linux-x64/resources/app
VIMA=dist/lpisis_gpcchs_e_clt-linux-x64/lpisis_gpcchs_e_clt

if [ "`uname`" == "Darwin" ] ; then
  APP_FOLDER=./dist/lpisis_gpcchs_e_clt-darwin-x64/lpisis_gpcchs_e_clt.app/Contents/Resources/app
  VIMA=./dist/lpisis_gpcchs_e_clt-darwin-x64/lpisis_gpcchs_e_clt.app/Contents/MacOS/lpisis_gpcchs_e_clt
fi

# Make a build if vima is not packaged yet
[ -d $APP_FOLDER ] || npm run build

# Copy dev config
cp config.local.json $APP_FOLDER

# Bootstrap a stub
mkdir -p $APP_FOLDER/lib && cp -R ./lib/stubProcess $APP_FOLDER/lib

# Because stub need constants.js, copy it
cp ./lib/constants.js $APP_FOLDER/lib
mkdir -p $APP_FOLDER/lib/common && cp -R ./lib/common/logManager $APP_FOLDER/lib/common

cp -R ./lib/utils $APP_FOLDER/lib
cp -R ./lib/common/configurationManager $APP_FOLDER/lib/common

# Start packaged vima
$VIMA
