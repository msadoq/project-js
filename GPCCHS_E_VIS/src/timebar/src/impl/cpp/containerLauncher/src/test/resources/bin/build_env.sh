#!/bin/bash -x

src/test/resources/bin/buildRunDir
. target/dependencies/bin/containerUtils.env

. target/dependencies/bin/mergeTestCatalogs.sh
