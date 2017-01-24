# PACKAGE

## Build and run a local bundle

Build and run a bundle in current dev folder and without the LPISIS launcher script.
Your node_modules should be up to date and npm links should be created (`npm run hello`).

Build both main and renderer process bundles:
> npm run build

Launch bundled client:
> npm start

## Build a RPM bundle

As prerequisites you need the COTS/npm_repository repository built on your desktopx instance:

> cd /data/work/gitRepositories/LPISIS
> mkdir -p COTS && cd COTS
> git clone gitolite@isis.cnes-isis.toulouse.atos.net:cots/LPISIS/COTS/npm_repository.git
> cd npm_repository
> git fetch
> git checkout R7S4
> git pull
> mvn install

To build the final RPM bundle, check that COTS repository is up to date and built (see above). Then:

> cd /data/work/gitRepositories/LPISIS/GPCCHS
> mvn lpisis:clean-all
> mvn install
> mvn antrun:run
> mvn lpisis:clean-all

Or quicker:

> cd /data/work/gitRepositories/LPISIS/GPCCHS
> mvn lpisis:clean-all install antrun:run lpisis:clean-all
