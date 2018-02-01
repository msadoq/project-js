#!/bin/bash

# ====================================================================
# HISTORY
# VERSION : 1.1.2 : FA : #7750 : 08/09/2017 : Add install:devtools npm script .
# END-HISTORY
# ====================================================================

WGET=/usr/bin/wget

EXTENSIONS_FOLDER=$HOME/.config/Electron/extensions
REDUX_DEVTOOLS=lmhkpmbekcpmknklioeibfkpmmfibljd
REACT_DEVELOPER_TOOLS=fmkadmapgofadopljbjfkapdkoienihi

mkdir -p $EXTENSIONS_FOLDER
cd $EXTENSIONS_FOLDER

$WGET "https://clients2.google.com/service/update2/crx?response=redirect&x=id%3D$REDUX_DEVTOOLS%26uc&prodversion=32" -O $REDUX_DEVTOOLS.crx
$WGET "https://clients2.google.com/service/update2/crx?response=redirect&x=id%3D$REACT_DEVELOPER_TOOLS%26uc&prodversion=32" -O $REACT_DEVELOPER_TOOLS.crx

rm -rf $REDUX_DEVTOOLS
rm -rf $REACT_DEVELOPER_TOOLS

unzip $REDUX_DEVTOOLS.crx -d $REDUX_DEVTOOLS || true
unzip $REACT_DEVELOPER_TOOLS.crx -d $REACT_DEVELOPER_TOOLS || true
