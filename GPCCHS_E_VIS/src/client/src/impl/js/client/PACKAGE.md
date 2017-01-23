# PACKAGE

## Build and run a local bundle

Build and run a bundle in current dev folder and without the LPISIS launcher script.
Your node_modules should be up to date and npm links should be created (`npm run hello`).

Build both main and renderer process bundles:
> npm run build

Launch bundled client:
> npm start

## Build a RPM bundle

To build the final RPM bundle:

> cd /data/work/gitRepositories/LPISIS/GPCCHS
> mvn lpisis:clean-all
> mvn install
> mvn antrun:run
> mvn lpisis:clean-all

Or quicker:

> cd /data/work/gitRepositories/LPISIS/GPCCHS
> mvn lpisis:clean-all install antrun:run lpisis:clean-all
