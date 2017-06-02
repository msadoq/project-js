#!/bin/sh
APP_FOLDER=./dist/lpisis_gpcchs_e_clt-linux-x64/resources/app

# Make a build if vima is not packaged yet
[ -d $APP_FOLDER ] || npm run build

# Copy dev config
cp config.local.json $APP_FOLDER

# Bootstrap a stub
mkdir $APP_FOLDER/lib && cp -R ./lib/stubProcess $APP_FOLDER/lib

# Start packaged vima
./dist/lpisis_gpcchs_e_clt-linux-x64/lpisis_gpcchs_e_clt
