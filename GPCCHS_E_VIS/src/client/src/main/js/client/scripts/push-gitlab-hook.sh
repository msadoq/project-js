#!/bin/bash

### This script will add remote url to Gitlab CI if required, then push current branch to it

if [ "`git remote -v | grep -c git@isisdev153.cnes-isis.toulouse.atos.net:root/vima.git`" -gt 0 ];
then
	echo "Gilab remote already added to your remote list"
else
	echo "Adding Gitlab remote to your remote list"
	git remote add gitlab git@isisdev153.cnes-isis.toulouse.atos.net:root/vima.git
fi

echo "Pushing current branch to Gitlab for CI purposes"
CURRENT_BRANCH=`git branch | grep \* | cut -d ' ' -f2`
git push gitlab ${CURRENT_BRANCH} --no-verify
